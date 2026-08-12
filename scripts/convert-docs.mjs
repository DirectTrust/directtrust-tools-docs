// One-time migration script: converts the legacy self-contained HTML docs from
// accreditation-testing-backend into VitePress Markdown pages, extracting embedded
// base64 images into real files under docs/public/images/<slug>/.
//
// Usage: node scripts/convert-docs.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const SRC_DIR =
  '/Users/gm2552/git/accreditation-tools/accreditation-testing-backend/src/main/resources/content/documentation'
const DOCS_DIR = path.join(REPO_ROOT, 'docs')
const IMAGES_ROOT = path.join(DOCS_DIR, 'public', 'images')

// slug: output filename + image folder name. title: page <h1>/frontmatter title.
// Order here matches the app's Documentation nav order (AppSidebar.vue).
const DOCS = [
  { file: 'overview.html', slug: 'overview', title: 'Overview' },
  { file: 'getting-started.html', slug: 'getting-started', title: 'Getting Started' },
  { file: 'hisp-tools.html', slug: 'hisp-tools', title: 'HISP Tools' },
  { file: 'certificate-hosting.html', slug: 'certificate-hosting', title: 'Certificate Hosting' },
  { file: 'certificate-discovery.html', slug: 'certificate-discovery', title: 'Certificate Discovery' },
  { file: 'direct-receive-message.html', slug: 'direct-receive-message', title: 'Direct Receive Messages' },
  { file: 'direct-send-message.html', slug: 'direct-send-message', title: 'Direct Send Messages' },
  { file: 'edge-protocols.html', slug: 'edge-protocols', title: 'Edge Protocols' },
  { file: 'xdr-edge.html', slug: 'xdr-edge', title: 'XDR' },
  { file: 'xdr-hisp-to-edge.html', slug: 'xdr-hisp-to-edge', title: 'HISP To Edge' },
  { file: 'xdr-edge-to-hisp.html', slug: 'xdr-edge-to-hisp', title: 'Edge to HISP' },
  { file: 'xdr-to-xdm-conversion.html', slug: 'xdr-to-xdm-conversion', title: 'XDR To XDM Conversion' },
  {
    file: 'xdr-edge-deliviery-notification.html',
    slug: 'xdr-edge-delivery-notification',
    title: 'XDR Delivery Notification'
  },
  { file: 'smtp-edge.html', slug: 'smtp-edge', title: 'SMTP' },
  { file: 'smtp-edge-transport.html', slug: 'smtp-edge-transport', title: 'SMTP Transport' },
  {
    file: 'smtp-edge-delivery-notification.html',
    slug: 'smtp-edge-delivery-notification',
    title: 'SMTP Delivery Notification'
  },
  { file: 'pop3-edge.html', slug: 'pop3-edge', title: 'POP3' },
  { file: 'imap-edge.html', slug: 'imap-edge', title: 'IMAP' }
]

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  emDelimiter: '_'
})
turndown.use(gfm)

// figure > img + figcaption -> markdown image followed by an italic caption line
turndown.addRule('figure', {
  filter: 'figure',
  replacement: (_content, node) => {
    const img = node.querySelector('img')
    const caption = node.querySelector('figcaption')
    if (!img) return ''
    const alt = (caption?.textContent || img.getAttribute('alt') || '').trim()
    const src = img.getAttribute('src') || ''
    let md = `![${alt}](${src})`
    if (caption?.textContent?.trim()) {
      md += `\n\n*${caption.textContent.trim()}*`
    }
    return `\n\n${md}\n\n`
  }
})

// .callout div -> VitePress tip container (matches the green #5CB172 accent used today)
turndown.addRule('callout', {
  filter: (node) => node.nodeName === 'DIV' && node.getAttribute('class') === 'callout',
  replacement: (content) => `\n\n::: tip\n${content.trim()}\n:::\n\n`
})

function extractImages(html, slug) {
  const imageDir = path.join(IMAGES_ROOT, slug)
  let index = 0
  // Attributes (e.g. alt="...") may appear before or after src, so match the whole
  // <img ...> tag and pull src out of it rather than assuming src is the only attribute.
  return html.replace(
    /<img\b[^>]*?\bsrc="data:image\/(png|jpe?g|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)"[^>]*>/g,
    (_match, ext, base64) => {
      index += 1
      const normalizedExt = ext === 'jpeg' ? 'jpg' : ext === 'svg+xml' ? 'svg' : ext
      const fileName = `${index}.${normalizedExt}`
      fs.mkdirSync(imageDir, { recursive: true })
      fs.writeFileSync(path.join(imageDir, fileName), Buffer.from(base64, 'base64'))
      return `<img src="/images/${slug}/${fileName}">`
    }
  )
}

function extractDocBody(html) {
  const match = html.match(/<div class="doc">([\s\S]*)<\/div>\s*<\/body>/)
  if (!match) {
    throw new Error('Could not locate <div class="doc"> content block')
  }
  return match[1]
}

fs.mkdirSync(DOCS_DIR, { recursive: true })

for (const { file, slug, title } of DOCS) {
  const srcPath = path.join(SRC_DIR, file)
  const raw = fs.readFileSync(srcPath, 'utf8')
  const withRealImages = extractImages(raw, slug)
  const bodyHtml = extractDocBody(withRealImages)

  let markdown = turndown.turndown(bodyHtml).trim()
  // The <h1> at the top of the body duplicates the frontmatter title VitePress
  // renders from `title:` in the sidebar/head, but VitePress does NOT auto-render
  // an <h1> from frontmatter, so keep the in-body one.

  const frontmatter = `---\ntitle: ${title}\n---\n\n`
  const outPath = path.join(DOCS_DIR, `${slug}.md`)
  fs.writeFileSync(outPath, frontmatter + markdown + '\n')
  console.log(`wrote ${path.relative(REPO_ROOT, outPath)}`)
}

console.log('\nDone.')
