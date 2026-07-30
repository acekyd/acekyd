# AGENTS.md

Guidance for coding agents working in this repository.

## Project Overview

This is a Nuxt 3 personal site using Vue, Nuxt Content, Tailwind CSS, Font Awesome, Disqus, RSS generation, sitemap generation, and static prerendering.

Primary areas:

- `pages/` contains route views.
- `components/` contains reusable Vue components.
- `components/content/` contains custom Nuxt Content renderers.
- `content/posts/` contains Markdown posts.
- `assets/data/` contains JSON-backed content for projects, talks, and videos.
- `server/routes/` contains generated endpoints such as RSS, sitemap, and `llms.txt`.
- `scripts/` contains project utility scripts.

## Local Commands

Use npm scripts from `package.json`:

- `npm run dev` starts the Nuxt dev server.
- `npm run build` builds the Nuxt app.
- `npm run generate` generates the static site.
- `npm run preview` previews the built site.
- `npm run og:cards` generates Open Graph cards.

There is no dedicated test or lint script currently defined. For behavioral changes, at minimum run the most relevant build or generation command before finishing.

## Implementation Notes

- Follow the existing Nuxt 3 Composition API style in Vue files.
- Keep shared UI in `components/`; keep page-specific logic in `pages/` unless it is clearly reusable.
- Prefer existing composables in `composables/` before adding new helpers.
- Keep content edits in Markdown frontmatter and body structure consistent with nearby posts.
- Keep data files in `assets/data/` valid JSON and preserve the existing field naming conventions.
- Use Tailwind utility classes and the existing global CSS in `assets/css/main.css`; avoid introducing a separate styling system.
- Use Font Awesome through the existing `plugins/fontawesome.js` setup when adding supported icons.

## Content And SEO

- Preserve public URL stability for posts and pages unless the task explicitly requires a route change.
- When changing metadata, sitemap, RSS, or content discovery behavior, check the matching files under `server/routes/` and `nuxt.config.ts`.
- Static prerendered routes currently include `/rss.xml`, `/sitemap.xml`, and `/llms.txt`.

## Runtime Config And Secrets

- Do not hard-code secrets or private tokens.
- For Notion integration, follow the existing runtime config comments in `nuxt.config.ts`.
- Use environment variables such as `NUXT_NOTION__TOKEN`, `NUXT_NOTION__LINKS_DATABASE_ID`, and `NUXT_PUBLIC_SITE_URL` where appropriate.
- Do not replace runtime secret access with `process.env.*` in a way that could inline secrets into the built server bundle.

## Dependency And Generated File Policy

- Do not modify `package-lock.json` unless `package.json` dependencies are intentionally changed or npm has been run for a dependency-related task.
- Do not commit generated assets or generated Open Graph cards unless the task specifically asks for them.
- Avoid unrelated formatting churn in Markdown content and Vue files.

## Verification

Choose the narrowest meaningful verification for the change:

- UI/component changes: run `npm run build` when feasible.
- Static/content routing changes: run `npm run generate` when feasible.
- RSS/sitemap/`llms.txt` changes: inspect the route implementation and run a build or generation command.
- OG card changes: run `npm run og:cards` only when the task involves generated cards.

If verification cannot be run, state the reason clearly in the final response.
