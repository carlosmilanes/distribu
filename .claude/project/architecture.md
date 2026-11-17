# Technical Architecture

## Frontend Stack

- **Framework**: React Router 7 in SPA mode (`ssr: false`)
- **Language**: TypeScript
- **Styling**: StyleX
- **Compiler**: React Compiler (`babel-plugin-react-compiler` via `vite-plugin-babel`, enforced by ESLint)
- **UI Components**: React Aria Components
- **Animations**: Motion library
- **Build Tool**: Vite

## Backend Stack

- **Runtime**: Node.js (development), Cloudflare Workers (production)
- **Data Store**: PGlite (in-browser Postgres) with Drizzle ORM (`data/database/schema.ts`, `drizzle.config.ts`)
- **Authentication**: Custom session-based auth with Cloudflare integration
- **Deployment**: Cloudflare (Durable Objects + Workers)