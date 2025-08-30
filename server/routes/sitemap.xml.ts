export default defineEventHandler(async (event) => {
  const siteUrl = 'https://adewaleabati.com'
  const currentDate = new Date().toISOString()
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/posts', priority: '0.8', changefreq: 'weekly' },
    { url: '/talks', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' },
    { url: '/uses', priority: '0.6', changefreq: 'monthly' },
    { url: '/now', priority: '0.7', changefreq: 'weekly' }
  ]
  
  // Get blog posts
  const { $content } = useNuxtApp()
  let posts = []
  try {
    posts = await $content('posts').where({ published: true }).find()
  } catch (error) {
    console.warn('Could not fetch posts for sitemap:', error)
  }
  
  const postPages = posts.map(post => ({
    url: `/posts/${post._path.replace('/posts/', '')}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: post.date || currentDate
  }))
  
  const allPages = [...staticPages, ...postPages]
  
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
