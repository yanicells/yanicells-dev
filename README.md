# yanicells.dev

Personal website built with Next.js. Inspired by the ChatGPT UI.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Vercel Analytics
- Google Gemini API (chat feature)

## APIs used

- Google Gemini API (`@google/generative-ai`) for chat
- Spotify Web API for now playing and top music data
- Jikan API (MyAnimeList) for anime metadata and posters

## Pages and features

- `/` Home: chat-style landing page and quick navigation.
- `/about`: short personal introduction.
- `/my-story`: longer personal background.
- `/experience`: timeline of work and project experience.
- `/projects`: project list with detail pages at `/projects/[slug]`.
- `/tech-stack`: skills page with category tabs (languages, certificates, frontend, backend, database, tools).
- `/anime`: personal anime list with ratings, search, tabs, and MAL poster data from cache.
- `/music`: Spotify-powered page with now playing, top tracks, top artists, and top genres.
- `/photography`: photo gallery and gear section.
- `/discovery`: curated findings and personal discoveries.
- `/contact`: contact information and links.
- `/chats`: saved chats list with dynamic pages at `/chats/[slug]`.

## How to add anime

1. Open [lib/data/anime.ts](lib/data/anime.ts).
2. Add a new item in `animeList` with at least:
   - `malId`
   - `title`
   - `rating`
   - `watchedDate`
3. Refresh the local anime cache:

   `npx tsx scripts/fetch-anime-cache.ts`

4. Confirm the new MAL ID exists in [lib/data/anime-cache.json](lib/data/anime-cache.json).

The anime page reads from the cache file, not live Jikan requests.

## Local development

Install and run:

`pnpm install`

`pnpm dev`

Open `http://localhost:3000`.
