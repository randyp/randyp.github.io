Personal website for me, Randy Pensinger, built with [Astro](https://astro.build/) and MDX.

## Project Structure

```
├── src/
│   ├── pages/           # MDX content files (each becomes a route)
│   ├── layouts/         # Astro layout components
│   └── components/      # Reusable Astro components (D3 visualizations)
├── public/assets/       # Static assets (css, js, img)
└── docs/                # Generated site output (GitHub Pages)
```

## Prerequisites

- Node.js >= 22.12.0
- pnpm

## Build

Install dependencies:
```sh
pnpm install
```

Generate `docs/` from `src/pages/`:
```sh
pnpm build
```

For development with live reload:
```sh
pnpm dev
```

Preview the production build:
```sh
pnpm preview
```

## How It Works

Astro with MDX transforms `src/pages/*.mdx` into static HTML in `docs/`:

1. Each `.mdx` file in `src/pages/` becomes a route
2. MDX files use the layout defined in frontmatter (`src/layouts/BaseLayout.astro`)
3. Interactive D3 visualizations are Astro components in `src/components/`
4. Output goes to `docs/` for GitHub Pages hosting

## Deployment

Push to `master` - GitHub Pages serves from the `docs/` folder.
