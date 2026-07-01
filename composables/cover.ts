// Resolve a post's display image: explicit `cover_image` frontmatter first,
// then the first image found in the post body, else nothing.

function firstBodyImage(body: any): string | undefined {
  if (!body) return undefined
  let found: string | undefined
  const walk = (node: any) => {
    if (found || !node) return
    if ((node.tag === 'img' || node.type === 'image') && (node.props?.src || node.attributes?.src || node.url)) {
      found = node.props?.src || node.attributes?.src || node.url
      return
    }
    const kids = node.children
    if (Array.isArray(kids)) for (const c of kids) { walk(c); if (found) return }
  }
  walk(body)
  return found
}

export function normalizeCover(src?: string): string | undefined {
  if (!src) return undefined
  const s = src.trim()
  if (/^https?:\/\//.test(s) || s.startsWith('data:')) return s
  // Local asset living in /public/images/… — markdown uses ./ or ../ prefixes.
  const i = s.indexOf('images/')
  if (i !== -1) return '/' + s.slice(i)
  return '/' + s.replace(/^(\.\.?\/)+/, '')
}

export function resolveCover(doc: any): string | undefined {
  if (!doc) return undefined
  return normalizeCover(doc.cover_image) || normalizeCover(firstBodyImage(doc.body))
}
