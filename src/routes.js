export const SITE_NAME = 'Alan Jego'

export const pageLinks = [
  { to: '/', label: 'About' },
  { to: '/reading-list', label: 'Readings' },
  { to: '/cool-sites', label: 'Sites' },
  { to: '/skills', label: 'Skills' },
]

export function getPageTitle(pathname) {
  const page = pageLinks.find((link) => link.to === pathname) ?? pageLinks[0]

  return `${page.label} | ${SITE_NAME}`
}
