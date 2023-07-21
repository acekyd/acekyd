import { serverQueryContent } from '#content/server'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
    const feed = new RSS({
        title: 'Adewale Abati',
        site_url: 'https://adewaleabati.com',
        feed_url: `https://adewaleabati.com/rss.xml`,
    })
      
    const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
    const blogPosts = docs.filter((doc) => doc?._path?.includes('/posts'))

    for (const doc of blogPosts) {
        feed.item({
          title: doc.title ?? '-',
          url: `https://adewaleabati${doc._path}`,
          date: doc.date,
          description: doc.description,
        })
    }
    
    const feedString = feed.xml({ indent: true })
    event.node.res.setHeader('content-type', 'text/xml')
    event.node.res.end(feedString)
})



