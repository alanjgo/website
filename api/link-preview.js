import { fetchOgPreview } from '../lib/og-preview.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const rawUrl = req.query?.url

  if (typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
    return res.status(400).json({ error: 'Missing url query parameter.' })
  }

  try {
    const preview = await fetchOgPreview(rawUrl)

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json(preview)
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unable to fetch preview.',
    })
  }
}
