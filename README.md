# alanchen.me

Personal site of Alan Chen, built with [Astro](https://astro.build). Static, fast, markdown-native.

```
site/                     ← the live site (everything else in this repo is legacy)
  src/content/blog/       ← ✍️  DROP MARKDOWN FILES HERE TO PUBLISH
  src/data/               ← publications, experience, profile links (edit these as life happens)
  src/pages/              ← home / research / about / blog / 404
  src/components/         ← nav, footer, goban hero, publication cards
  src/styles/global.css   ← design tokens: both themes live here
  public/                 ← images, research figures, CNAME, favicons
personal-website/         ← old React site (safe to delete whenever)
build/                    ← even older static site (safe to delete whenever)
```

## Writing a post (the 10-second loop)

1. Write a note in Obsidian (or anywhere).
2. Drop the `.md` file into `site/src/content/blog/`.
3. `git add · commit · push`. GitHub Actions builds and deploys automatically.

**No frontmatter is required.** Missing fields are inferred:

| field | fallback |
|---|---|
| `title` | first `# Heading` in the note, else the filename |
| `date` | the file's first git commit date |
| `description` | the first paragraph |

Optional frontmatter (see `src/content/blog/_template.md` for a copy-paste starter):

```yaml
---
title: My post
date: 2026-08-01
description: Card / SEO blurb
tags: [research, notes]
draft: true        # excluded from the built site
---
```

Obsidian syntax that works out of the box: `[[wikilinks]]`, `![[image.png]]` embeds
(put the image next to the note), `==highlights==`, `%% comments %%`, `> [!note]` callouts,
LaTeX math (`$...$` / `$$...$$`), code fences, footnotes, tables.
Files starting with `_` are ignored.

## Running locally

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # output in site/dist
```

## The design

One theme: warm paper, Newsreader serif headings, deep teal ink. The hero replays Lee Sedol's
Move 78 (Game 4 vs. AlphaGo, real SGF coordinates); the about page replays one of Alan's own
KGS games with full capture logic. All colors and fonts live as CSS variables at the top of
`site/src/styles/global.css`.

## Deploying (one-time setup)

The DNS for alanchen.me already points at GitHub Pages, and `site/public/CNAME` is in place.
The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to
`master`. To cut over:

1. In `Jiaqi07/Jiaqi07.github.io` (the private repo that currently serves alanchen.me), remove
   the custom domain (Settings → Pages → Custom domain → remove).
2. In **this** repo: Settings → Pages → Source: **GitHub Actions**.
3. Same page: Custom domain → `alanchen.me` → Save (and keep "Enforce HTTPS" on).
4. Push any commit touching `site/` and the workflow does the rest.

No Vercel/Netlify needed; if you ever prefer manual deploys, `npm run build` and publish
`site/dist/` anywhere static.

## Maintenance map

| want to change | edit |
|---|---|
| publications / figures | `site/src/data/publications.ts` (figures in `site/public/research/`) |
| current roles ("now" cards) | `site/src/data/profile.ts` |
| experience / startups / honors | `site/src/data/experience.ts` |
| bio story | `site/src/pages/about.astro` |
| colors & fonts | `site/src/styles/global.css` |
| hero Go animation | `site/src/components/Goban.astro` |
