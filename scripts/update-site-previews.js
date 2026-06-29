/* eslint-env node */

import { access, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { platform } from 'node:os'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { fetchOgPreview } from '../lib/og-preview.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sitesFilePath = path.resolve(__dirname, '../src/data/sites.js')
const previewOutputDir = path.resolve(__dirname, '../public/site-previews')
const publicPreviewPath = '/site-previews'
const execFileAsync = promisify(execFile)

const CHROME_CANDIDATE_PATHS = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
  linux: [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ],
}

function formatSitesFile(sites) {
  return `export const sites = ${JSON.stringify(sites, null, 2)}\n`
}

async function loadSites() {
  const module = await import(`${sitesFilePath}?t=${Date.now()}`)
  return module.sites
}

function slugifySiteName(name) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function findChromeExecutable() {
  const candidates = CHROME_CANDIDATE_PATHS[platform()] ?? []

  for (const candidate of candidates) {
    if (await fileExists(candidate)) {
      return candidate
    }
  }

  throw new Error('Chrome, Chromium, Brave, or Edge is required to generate fallback screenshots.')
}

function isLocalPreviewPath(image) {
  return typeof image === 'string' && image.startsWith(`${publicPreviewPath}/`)
}

async function generateScreenshotPreview(site, chromeExecutable) {
  await mkdir(previewOutputDir, { recursive: true })

  const slug = slugifySiteName(site.name)
  const screenshotPath = path.join(previewOutputDir, `${slug}.png`)
  const userDataDir = path.join(previewOutputDir, `.chrome-${slug}`)

  await rm(userDataDir, { recursive: true, force: true })

  await execFileAsync(
    chromeExecutable,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${userDataDir}`,
      '--window-size=1440,900',
      `--screenshot=${screenshotPath}`,
      site.url,
    ],
    { timeout: 30000 }
  )

  await rm(userDataDir, { recursive: true, force: true })

  return `${publicPreviewPath}/${slug}.png`
}

async function updateSitePreviews() {
  const sites = await loadSites()
  const updatedSites = []
  let chromeExecutable = null

  for (const site of sites) {
    let preview = {
      title: site.ogTitle ?? null,
      image: site.ogImage ?? null,
    }

    try {
      const fetchedPreview = await fetchOgPreview(site.url)
      preview = {
        title: preview.title ?? fetchedPreview.title ?? site.name,
        image: isLocalPreviewPath(preview.image)
          ? preview.image
          : fetchedPreview.image ?? preview.image,
      }
    } catch (error) {
      console.warn(
        `Failed to fetch preview metadata for ${site.name}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }

    if (!preview.image) {
      try {
        chromeExecutable ??= await findChromeExecutable()
        preview.image = await generateScreenshotPreview(site, chromeExecutable)
        console.log(`Generated fallback screenshot for ${site.name}`)
      } catch (error) {
        console.warn(
          `Failed to generate fallback screenshot for ${site.name}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    } else {
      console.log(`Updated preview for ${site.name}`)
    }

    updatedSites.push({
      ...site,
      ogTitle: preview.title ?? site.name,
      ogImage: preview.image,
    })
  }

  await writeFile(sitesFilePath, formatSitesFile(updatedSites), 'utf8')
}

updateSitePreviews().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
