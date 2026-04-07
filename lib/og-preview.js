const META_TAG_REGEX = /<meta\b[^>]*>/gi
const ATTRIBUTE_REGEX = /([^\s=]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi

function decodeHtmlEntities(value) {
  if (!value) {
    return value
  }

  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
}

function parseAttributes(tag) {
  const attributes = {}

  for (const match of tag.matchAll(ATTRIBUTE_REGEX)) {
    const name = match[1]?.toLowerCase()
    const value = match[3] ?? match[4] ?? match[5] ?? ''

    if (name) {
      attributes[name] = decodeHtmlEntities(value.trim())
    }
  }

  return attributes
}

function extractHead(html) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)

  if (!headMatch) {
    return html
  }

  return headMatch[1]
}

function extractOpenGraphValue(head, key) {
  const metaTags = head.match(META_TAG_REGEX) ?? []

  for (const tag of metaTags) {
    const attributes = parseAttributes(tag)
    const property = attributes.property ?? attributes.name

    if (property?.toLowerCase() === key.toLowerCase()) {
      return attributes.content ?? null
    }
  }

  return null
}

function normalizeRequestUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new Error('A valid URL is required.')
  }

  const normalized = new URL(rawUrl)

  if (!['http:', 'https:'].includes(normalized.protocol)) {
    throw new Error('Only http and https URLs are supported.')
  }

  return normalized
}

export async function fetchOgPreview(rawUrl) {
  const targetUrl = normalizeRequestUrl(rawUrl)
  const response = await fetch(targetUrl, {
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
    headers: {
      'user-agent':
        'Mozilla/5.0 (compatible; AlanJegoPreviewBot/1.0; +https://alanjego.com)',
      accept: 'text/html,application/xhtml+xml',
    },
  })

  if (!response.ok) {
    throw new Error(`Unable to fetch URL: ${response.status}`)
  }

  const html = await response.text()
  const head = extractHead(html)
  const title = extractOpenGraphValue(head, 'og:title')
  const rawImage = extractOpenGraphValue(head, 'og:image')
  const responseUrl = new URL(response.url)
  const image = rawImage ? new URL(rawImage, responseUrl).toString() : null

  return {
    title,
    image,
  }
}
