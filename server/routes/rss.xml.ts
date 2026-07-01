import { serverQueryContent } from '#content/server'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: 'Adewale Abati',
        site_url: 'https://adewaleabati.com',
        feed_url: `https://adewaleabati.com/rss.xml`,
    })
      
    const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
    const blogPosts = docs.filter((doc) => doc?._path?.includes('/posts') && doc?.published !== false)

    for (const doc of blogPosts) {
        // Externally-hosted posts point straight at their original URL.
        const url = (doc as any).external_url || `https://adewaleabati.com${doc._path}`
        feed.item({
          title: doc.title ?? '-',
          url,
          date: doc.date,
          description: doc.description,
        })
    }
    
    const feedString = feed.xml({ indent: true })
    event.node.res.setHeader('content-type', 'text/xml')
    event.node.res.end(feedString)
})



