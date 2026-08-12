# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A [VitePress](https://vitepress.dev) documentation site for the DirectTrust Accreditation Testing Toolset (`accreditation-testing-backend`, `accreditation-backend-gateway`, `accreditation-testing-frontend` — a separate repo). Content used to live as static HTML baked into the backend service and served through a REST endpoint; it's now standalone Markdown published to GitHub Pages at `https://directtrust.github.io/directtrust-tools-docs/`.

This is a docs-only repo — there is no application code to build or test, just Markdown content and VitePress config.

## Commands

```bash
npm install        # one-time setup
npm run docs:dev      # local dev server with hot reload — http://localhost:5173/directtrust-tools-docs/
npm run docs:build    # production build to docs/.vitepress/dist (same as CI)
npm run docs:preview  # serve the built dist/ output locally
```

There is no lint or test suite. `npm run docs:build` is the closest thing to a validation step — it fails on broken Markdown/config and (with default VitePress settings) on dead internal links.

Note: because of the `base: '/directtrust-tools-docs/'` config, visiting `http://localhost:5173/` alone redirects to the `/directtrust-tools-docs/` path — don't mistake that for a broken dev server.

## Architecture

- `docs/*.md` — one file per doc page. Each needs YAML frontmatter with a `title:`.
- `docs/.vitepress/config.mts` — site title, `base` path, top nav, and the **hand-maintained sidebar tree** (nested, mirrors the original app's Documentation nav order). A page not listed in `sidebar` is unreachable via navigation even though it still builds and is reachable by direct URL.
- `docs/.vitepress/theme/` — thin extension of the default VitePress theme (`index.ts`) plus `custom.css` for the DirectTrust color palette (`#004f93` blue, `#5CB172` green).
- `docs/public/images/<slug>/` — one folder per doc page for screenshots, referenced from Markdown with absolute paths (`/images/<slug>/1.png`) plus an italic caption line beneath. Never inline images as base64 — always a real file referenced by path, so `.md` diffs stay small.
- `scripts/convert-docs.mjs` — one-time HTML→Markdown migration script from the original backend-hosted docs. Kept for reference only; not part of the normal editing workflow, don't run it against current content.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages via GitHub Actions on every push to `main`. GitHub Pages is configured to deploy from Actions, not from a branch — there's no separate server or Jekyll step.

## Working on this repo

- Adding a page: create `docs/<slug>.md` with frontmatter, then add it to the `sidebar` array in `config.mts` under the correct nested section — these two steps are both required.
- `::: tip ... :::` containers render the green callout boxes used throughout for notes.
- Because this is a GitHub Pages *project* site (not the org's root `DirectTrust.github.io` repo), the `base` path in `config.mts` must always match the repo name exactly. If the repo is ever renamed, update `base` or every internal asset/image link 404s on the live site even though the build succeeds silently.
- Known pre-existing inconsistency: `docs/pop3-edge.md` has `title: POP3` in frontmatter (used in nav) but an `<h1>POP3 Edge</h1>` in the body — not a bug, leave as-is unless asked to fix it.
