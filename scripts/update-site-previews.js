/* eslint-env node */

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchOgPreview } from '../lib/og-preview.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sitesFilePath = path.resolve(__dirname, '../src/data/sites.js')

function formatSitesFile(sites) {
  return `export const sites = ${JSON.stringify(sites, null, 2)}\n`
}

async function loadSites() {
  const module = await import(`${sitesFilePath}?t=${Date.now()}`)
  return module.sites
}

async function updateSitePreviews() {
  const sites = await loadSites()
  const updatedSites = []

  for (const site of sites) {
    try {
      const preview = await fetchOgPreview(site.url)

      updatedSites.push({
        ...site,
        ogTitle: preview.title,
        ogImage: preview.image,
      })

      console.log(`Updated preview for ${site.name}`)
    } catch (error) {
      updatedSites.push({
        ...site,
        ogTitle: site.ogTitle ?? null,
        ogImage: site.ogImage ?? null,
      })

      console.warn(
        `Failed to update preview for ${site.name}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  await writeFile(sitesFilePath, formatSitesFile(updatedSites), 'utf8')
}

updateSitePreviews().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
