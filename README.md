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

The original dark portfolio layout uses Manrope, a muted green accent, rounded navigation,
and large research demos. The hero features an articulated Franka Panda picking up and
placing Go stones. Click or tap a board intersection to take over as black; the local
opponent replies as white, and the arm lifts captured stones into a tray. Drag to rotate,
or use arrow keys and Enter to place a stone. Two arms play automatically until the
visitor takes over whichever color is currently moving. The visitor keeps that color
and the other arm remains the opponent. Each click queues a physical placement by the
visitor's arm before the opponent replies. Captured stones remain stacked in the trays.
Black uses Panda geometry with a FANUC-inspired yellow finish. Score finishes the current move, highlights territory, and
shows the winner using stones plus enclosed empty points, with zero komi and all
remaining stones treated as alive. Keep playing resumes; Reset returns to the demo.
Reduced motion, offscreen pausing, and a static Panda preview are supported.

The Panda geometry comes from [MuJoCo Menagerie](https://github.com/google-deepmind/mujoco_menagerie/tree/main/franka_emika_panda),
converted to glTF, simplified, and compressed for the browser. The original license and
pinned source attribution are included in `site/public/models/panda/`. The visual joint
solver and stone sequence are illustrative, not a research policy or real robot controller.

Current research uses short simulation previews and submission/WIP labels, with
"Details / Paper Coming Soon" on every card. Only reviewed clips with neutral filenames
and no research metadata live in `site/public/research/previews/`. Unpublished methods,
evaluation results, comparisons, source archives, and original camera overlays must stay
outside the public directory. Public assets ship even when no page links to them.

The separate `/research/overview` page opens the comprehensive research overview and
videos after entering a password. It does not offer an archive download. The original
archive stays outside the repository; only an AES-256-GCM encrypted payload is published.
Decrypted media and content exist in browser memory until the page is locked or closed.
The page is excluded from the sitemap and marked noindex. This static-site approach
cannot rate-limit offline password guesses: use a strong password for confidential work.
An authorized viewer can still save or share what they can see.

To replace the overview or change its password, run the following from `site/` and enter
the password at the hidden prompt. Never put the original archive in `public/`.

```powershell
node scripts/protect-research.mjs --archive "D:\Downloads2.0\Alan Chen Robot Learning.zip"
```

Shared colors live in `site/src/styles/global.css`. The hero is in
`site/src/components/RobotBoard.astro`, `site/src/lib/robotBoard.ts`, and
`site/src/lib/pandaKinematics.ts`. Current project labels live in
`site/src/data/currentResearch.ts`.

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
| interactive robot and Go board | `site/src/components/RobotBoard.astro` |
