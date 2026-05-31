<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this React + Vite portfolio site. PostHog was initialized in `src/main.jsx` with the `PostHogProvider` and `PostHogErrorBoundary` wrapping the entire app, enabling automatic session replay, error tracking, and autocapture alongside the custom events below. Environment variables (`VITE_POSTHOG_TOKEN`, `VITE_POSTHOG_HOST`) were added to `.env` and the `posthog-js` and `@posthog/react` packages were installed.

| Event | Description | File |
|---|---|---|
| `linkedin_clicked` | User clicked the LinkedIn link in the contact section | `src/components/Contact.jsx` |
| `business_card_revealed` | User hovered or clicked to reveal the animated business card (includes `trigger: hover\|click` property) | `src/components/Home.jsx` |
| `project_screenshot_opened` | User opened a project screenshot in the lightbox (includes `project_name`, `screenshot_index`) | `src/components/Portfolio.jsx` |
| `project_link_clicked` | User clicked an external project link (includes `project_name`, `project_url`) | `src/components/Portfolio.jsx` |
| `reading_list_tab_switched` | User switched between Books and Graphic Novel tabs (includes `tab` property) | `src/components/ReadingList.jsx` |
| `reading_list_favorites_toggled` | User toggled the favorites filter (includes `enabled: true\|false`) | `src/components/ReadingList.jsx` |
| `cool_site_clicked` | User clicked on a site in the cool sites list (includes `site_name`, `site_url`) | `src/components/Site.jsx` |
| `company_link_clicked` | User clicked a company logo in the experience section (includes `company_name`, `company_url`) | `src/components/Experience.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/715258)
- [Outbound link clicks](/insights/ddP4s11v) — LinkedIn, cool site, and project link clicks over time
- [Portfolio project engagement](/insights/7W3aV4El) — Screenshots opened vs project links clicked
- [Reading list interactions](/insights/sJDfOGRm) — Tab switches and favorites filter usage
- [Business card reveals](/insights/W09Bufqx) — How often visitors reveal the business card
- [Total engagement events](/insights/EDSHtgd6) — All interactions stacked by week

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
