# yanicells.dev

A minimal portfolio for Yani Capistrano, built with Next.js 16, React 19,
TypeScript, and Tailwind CSS v4.

The home page contains selected projects, experience, a short introduction, and
contact information. Four project pages give more detail about the work and
Yani's contribution. Light and dark themes follow the system appearance until
a preference is saved with the theme toggle.

## Development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Content

- `lib/data/projects.ts`: selected work and project write-ups
- `lib/data/experience.ts`: professional experience
- `lib/data/contact.ts`: contact and profile links
- `public/projects/`: existing project screenshots

Experience entries use recorded start dates instead of assuming that every
role is still current. Project metrics describe the documented launch period.

Core links from the previous portfolio redirect to the corresponding home-page
sections. The sitemap includes the home page and the four selected projects.
