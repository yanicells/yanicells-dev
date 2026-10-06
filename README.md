# yanicells.dev

A minimal portfolio for Yani Capistrano, built with Next.js 16, React 19,
TypeScript, and Tailwind CSS v4.

The home page is a short overview. Projects, Experience, About, and Contact have
separate pages, with a filterable gallery, five write-ups, and a few personal favourites. The site
starts in dark mode and saves a visitor's light/dark choice in localStorage.

## Development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm lint
pnpm exec tsc --noEmit
node scripts/check-theme.mjs
pnpm build
```

## Content

- `lib/data/projects.ts`: selected work and project write-ups
- `lib/data/experience.ts`: professional experience
- `lib/data/contact.ts`: contact and profile links
- `public/projects/`: existing project screenshots

Experience entries use recorded start dates instead of assuming that every
role is still current. Project metrics describe the documented launch period.

Older hobby links redirect to the relevant sections of About. The sitemap
includes the home page, the four overview pages, and the five selected projects.
