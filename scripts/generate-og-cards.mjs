// Generate branded 1200x630 OG cards for posts that have no cover image.
// Usage: node scripts/generate-og-cards.mjs   (run from repo root; requires `sharp`)
//
// Cards are written to public/og/, mirroring the content/posts/ structure,
// and picked up by the post page's og:image fallback. Rerun after adding a
// post without a cover_image or body image.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(process.env.SHARP_PATH || 'sharp')

const ROOT = process.cwd()
const POSTS = path.join(ROOT, 'content/posts')
const OUT = path.join(ROOT, 'public/og')

const BG = '#0f1115' // Soft Black
const ACCENT = '#f4b609' // Main Orange
const INK = '#f6f7f9' // Soft White

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    e.isDirectory() ? walk(p, out) : e.name.endsWith('.md') && out.push(p)
  }
  return out
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const wrap = (text, maxChars) => {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = (line + ' ' + word).trim()
    }
  }
  if (line) lines.push(line)
  return lines
}

const card = (title, tag) => {
  let fs_ = 68
  let lines = wrap(title, Math.floor(1080 / (fs_ * 0.56)))
  if (lines.length > 3) {
    fs_ = 54
    lines = wrap(title, Math.floor(1080 / (fs_ * 0.56)))
  }
  if (lines.length > 4) {
    lines = lines.slice(0, 4)
    lines[3] = lines[3].replace(/\s+\S*$/, '') + '…'
  }
  const lineHeight = Math.round(fs_ * 1.24)
  const startY = 315 - Math.round(((lines.length - 1) * lineHeight) / 2)
  const titleText = lines
    .map((l, i) => `<text x="60" y="${startY + i * lineHeight}" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="${fs_}" fill="${INK}">${esc(l)}</text>`)
    .join('\n  ')
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="8" fill="${ACCENT}"/>
  <text x="60" y="120" font-family="DejaVu Sans, Arial, sans-serif" font-weight="bold" font-size="24" letter-spacing="4" fill="${ACCENT}">ADEWALEABATI.COM</text>
  ${titleText}
  <text x="60" y="560" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" fill="${INK}" fill-opacity="0.6">Adewale "Ace" Abati${tag ? esc('  ·  ' + tag) : ''}</text>
</svg>`
}

const files = walk(POSTS)
let made = 0
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8')
  const fmMatch = src.match(/^---([\s\S]*?)---/)
  const fm = fmMatch ? fmMatch[1] : ''
  const body = src.replace(/^---[\s\S]*?---/, '')
  if (/cover_image:/.test(fm)) continue // has its own social image
  if (/external_url:/.test(fm)) continue // stub, redirects off-site
  if (/!\[[^\]]*\]\(/.test(body) || /<img/.test(body)) continue // body image is used
  const title = (fm.match(/^title:\s*["']?(.+?)["']?\s*$/m) || [])[1]
  if (!title) continue
  const tag = (fm.match(/^tags:\s*\[\s*["']?([^,"'\]]+)/m) || [])[1]
  const rel = path.relative(POSTS, f).replace(/\.md$/, '.png')
  const dest = path.join(OUT, rel)
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  await sharp(Buffer.from(card(title, tag))).png({ palette: true }).toFile(dest)
  console.log('generated', path.join('public/og', rel))
  made++
}
console.log(`\n${made} card(s) generated.`)
