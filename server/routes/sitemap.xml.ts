import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const siteUrl = 'https://adewaleabati.com'
  const currentDate = new Date().toISOString()

  type SitemapEntry = {
    url: string
    priority: string
    changefreq: string
    lastmod?: string
  }
  
  // Static pages
  const staticPages: SitemapEntry[] = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/posts', priority: '0.8', changefreq: 'weekly' },
    { url: '/talks', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' }
    // Temporarily removed uses and now pages
    // { url: '/uses', priority: '0.6', changefreq: 'monthly' },
    // { url: '/now', priority: '0.7', changefreq: 'weekly' }
  ]
  
  // Get blog posts using serverQueryContent
  let posts: any[] = []
  try {
    posts = await serverQueryContent(event, 'posts').where({ published: true }).find()
  } catch (error) {
    console.warn('Could not fetch posts for sitemap:', error)
  }
  
  const postPages: SitemapEntry[] = posts.map((post: any) => ({
    url: `/posts/${post._path.replace('/posts/', '')}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: post.date || currentDate
  }))
  
  const allPages: SitemapEntry[] = [...staticPages, ...postPages]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
