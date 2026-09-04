import { serverQueryContent } from '#content/server'

// Serves /llms.txt — a structured, machine-friendly overview for LLM/agentic crawlers.
// Spec: https://llmstxt.org
export default defineEventHandler(async (event) => {
  const siteUrl = 'https://adewaleabati.com'

  let posts: any[] = []
  try {
    posts = await serverQueryContent(event, 'posts')
      .where({ published: { $ne: false } })
      .only(['title', 'description', '_path', 'date'])
      .sort({ date: -1 })
      .find()
  } catch (e) {
    posts = []
  }

  const recent = posts.slice(0, 15)

  const lines: string[] = []
  lines.push('# Adewale "Ace" Abati')
  lines.push('')
  lines.push(
    '> Web Engineer and Staff Developer Advocate at Block. Writing, talks, and open-source projects on agentic AI, developer experience, and community building.',
  )
  lines.push('')
  lines.push(
    'This site is the personal home of Adewale Abati (known online as "Ace" / @ace_kyd). It hosts long-form articles, a catalogue of conference talks, and a portfolio of open-source projects.',
  )
  lines.push('')
  lines.push('## Key pages')
  lines.push('')
  lines.push(`- [Home](${siteUrl}/): Introduction, highlights, and links.`)
  lines.push(`- [Blog](${siteUrl}/posts): Articles on AI, open source, careers, and the web.`)
  lines.push(`- [Talks](${siteUrl}/talks): Conference and community speaking engagements.`)
  lines.push(`- [Projects](${siteUrl}/projects): Open-source projects and experiments.`)
  lines.push('')
  lines.push('## Recent writing')
  lines.push('')
  for (const p of recent) {
    const desc = (p.description || '').replace(/\s+/g, ' ').trim()
    lines.push(`- [${p.title}](${siteUrl}${p._path})${desc ? `: ${desc}` : ''}`)
  }
  lines.push('')
  lines.push('## Feeds')
  lines.push('')
  lines.push(`- [RSS feed](${siteUrl}/rss.xml)`)
  lines.push(`- [Sitemap](${siteUrl}/sitemap.xml)`)
  lines.push('')
  lines.push('## Contact & profiles')
  lines.push('')
  lines.push('- GitHub: https://github.com/acekyd')
  lines.push('- YouTube: https://youtube.com/@acekydtv')
  lines.push('- LinkedIn: https://linkedin.com/in/acekyd')
  lines.push('- Twitter/X: https://twitter.com/ace_kyd')
  lines.push('- Email: ace@adewaleabati.com')
  lines.push('')

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n')
})
