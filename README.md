# rplopes.com

Personal blog built with [Astro](https://astro.build). Posts are markdown files in `content/blog/`, images in `content/blog/{slug}/`. Site settings live in `site.config.ts`.

## Setup

Requires Node 22.12+ and pnpm.

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

## Build

```bash
pnpm run build
pnpm run preview   # preview the built site
```

## Adding a Post

Create `content/blog/{slug}.md` with frontmatter:

```markdown
---
title: "Post Title"
publishedAt: "2026-01-15" # optional — defaults to git first-commit date
description: "Post description shown in listings and meta tags"
---

Post content in markdown.
```

For images, add them to `content/blog/{slug}/` and reference them with a relative path from markdown. Astro optimizes local markdown images during the build.

## Code Quality

```bash
pnpm run fmt         # format with oxfmt
pnpm run fmt:check   # check formatting
pnpm run lint        # lint with oxlint
pnpm run lint:fix    # lint and auto-fix
pnpm run check       # all checks (fmt + lint + astro check)
```

## Deployment

The build outputs a static site to `dist/`. Deploy to any static hosting (Cloudflare Pages, Netlify, Vercel, etc.).
