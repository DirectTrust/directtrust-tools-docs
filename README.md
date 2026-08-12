# directtrust-tools.github.io

Documentation site for the [DirectTrust Accreditation Testing Toolset](https://github.com/DirectTrust/accreditation-tools) (the `accreditation-testing-backend`, `accreditation-backend-gateway`, and `accreditation-testing-frontend` services) — the guides that explain what each tool does and how to use it: certificate discovery, Direct message send/receive, and XDR/SMTP/POP3/IMAP edge protocol testing.

This content used to live as static, self-contained HTML files baked into the backend service and served through a REST endpoint (`/api/documentation/{section}`), rendered inside the web app via an iframe. It's now a standalone [VitePress](https://vitepress.dev) site, written in Markdown, and published to `https://directtrust-tools.github.io/` via GitHub Pages. Moving it here means docs can be edited without touching application code or cutting a backend release, get proper version-controlled diffs on every change, and gain built-in navigation and full-text search. The web app's documentation nav will link out to this site in a new tab rather than rendering the content in-app.

This README is for anyone writing or editing documentation content, not just developers — the day-to-day workflow only requires editing Markdown files and running two npm commands.

## Where the files live

```
directtrust-tools.github.io/
├── docs/                          ← everything you'll actually edit
│   ├── .vitepress/
│   │   ├── config.mts             ← site title, nav, sidebar structure, search
│   │   └── theme/
│   │       ├── index.ts           ← extends VitePress's default theme
│   │       └── custom.css         ← color palette (#004f93 blue, #5CB172 green, etc.)
│   ├── public/images/<doc-slug>/  ← screenshots, one folder per doc page
│   ├── index.md                   ← home page (hero + feature cards)
│   ├── overview.md
│   ├── getting-started.md
│   ├── pop3-edge.md
│   └── ... (one .md file per doc page)
├── scripts/convert-docs.mjs       ← one-time HTML→Markdown migration script (kept for reference only)
├── .github/workflows/deploy.yml   ← builds + publishes on every push to main
├── package.json / package-lock.json
└── .gitignore
```

## How Markdown becomes HTML

`vitepress build docs` (wired up as `npm run docs:build`) reads every `.md` file under `docs/`, runs it through VitePress's Markdown pipeline, wraps it in the Vue-based theme (nav, sidebar, search, the custom CSS), and outputs static HTML/CSS/JS to `docs/.vitepress/dist/`. That output directory is what actually gets hosted — nobody writes or edits raw HTML.

## How it gets hosted

GitHub Pages is configured to deploy from GitHub Actions (repo **Settings → Pages → Build and deployment → Source → GitHub Actions**), not from a branch. `.github/workflows/deploy.yml` runs on every push to `main`: checks out the repo, installs dependencies, runs `docs:build`, and hands the `dist/` folder to GitHub's official Pages deploy action. No separate server, no Jekyll — the workflow *is* the deploy pipeline. A push to `main` is live at `https://directtrust-tools.github.io/` about a minute later.

## Workflow for writing or editing content

### 1. One-time setup

```bash
git clone https://github.com/DirectTrust/directtrust-tools.github.io.git
cd directtrust-tools.github.io
npm install
```

Requires Node.js (18+) and npm. No Ruby, Jekyll, or other toolchain needed.

### 2. Editing an existing page

Open the relevant `docs/<slug>.md` file and edit it directly — it's plain Markdown:
- `#`, `##`, `###` for headings
- `-` for bullet lists, `1.` for numbered lists
- `**bold**`, `*italic*`
- `| col | col |` tables (standard GitHub-flavored Markdown)
- `::: tip\nSome note here.\n:::` for the green callout boxes used throughout (e.g. "Note: you must first create a configuration profile...")

### 3. Adding a new page

1. Create `docs/<new-slug>.md` with a frontmatter title:
   ```markdown
   ---
   title: My New Page
   ---

   # My New Page

   Content goes here...
   ```
2. Add an entry for it to the `sidebar` array in `docs/.vitepress/config.mts`, nested under the appropriate parent section. The sidebar is hand-maintained in this config file — it is **not** auto-generated from the files in `docs/`, so a page that exists but isn't listed here won't show up in navigation (though it's still reachable by direct URL).

### 4. Adding or updating screenshots

Save the image file directly into `docs/public/images/<slug>/` (create the folder if it doesn't exist) and reference it in the Markdown with an absolute path plus an italic caption line underneath:

```markdown
![Description of the screenshot](/images/<slug>/4.png)

*Description of the screenshot*
```

Never paste a screenshot in as a base64 data URI — always save it as a real image file and reference it by path. This keeps `.md` files small and diffable in pull requests, unlike the original HTML docs where every screenshot bloated the page source.

### 5. Test your changes locally

```bash
npm run docs:dev
```

Starts a local dev server (default `http://localhost:5173`) with hot reload — edits to any `.md` file appear in the browser immediately without a manual rebuild. Use this to check that your content, links, images, and nav placement look right before publishing.

To double check exactly what will ship (the real production build, not the dev server), you can also run:

```bash
npm run docs:build      # builds docs/.vitepress/dist, same as CI does
npm run docs:preview    # serves that built output locally so you can verify it
```

### 6. Publish

Commit your change and push (or open a PR and merge) to `main`:

```bash
git add docs/
git commit -m "Update POP3 edge documentation"
git push
```

That's it — no manual build or deploy step. The GitHub Actions workflow builds the site and publishes it to `https://directtrust-tools.github.io/` automatically. You can watch progress under the repo's **Actions** tab.

## Known quirks

- `docs/pop3-edge.md` has `title: POP3` (used in the nav) but an `<h1>POP3 Edge</h1>` in the body — a pre-existing inconsistency carried over from the original HTML, not a conversion bug.
- The original `xdr-edge-deliviery-notification.html` filename typo was corrected to `docs/xdr-edge-delivery-notification.md` (URL/slug only, not the visible content).
