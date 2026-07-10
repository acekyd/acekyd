// Estimate reading time from a parsed @nuxt/content document body.
// Walks the AST counting words in text nodes — ~200 wpm, minimum 1 minute.
export const readingMinutes = (doc: any): number => {
  let words = 0
  const walk = (node: any) => {
    if (!node) return
    if (typeof node.value === 'string') {
      words += node.value.trim().split(/\s+/).filter(Boolean).length
    }
    if (Array.isArray(node.children)) node.children.forEach(walk)
  }
  walk(doc?.body)
  return Math.max(1, Math.round(words / 200))
}
