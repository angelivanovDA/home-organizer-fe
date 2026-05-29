# Home Organizer — Frontend

Web client for **Home Organizer**, a household app for sharing updates, coordinating day-to-day tasks, and staying in sync. Guests can browse a public landing page and sign up or log in; authenticated users get a dashboard to post updates, set a status, and view individual posts in real time.

## Features

- Public home page with product overview
- User authentication (login and registration)
- Dashboard feed with create, edit, and delete posts
- User status updates
- Single-post detail view
- Live feed updates via WebSocket (`socket.io-client`)
- Responsive layout for desktop, tablet, and mobile

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 6
- [React Router](https://reactrouter.com/) 7
- [Ant Design](https://ant.design/) 6
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Vitest](https://vitest.dev/) + Testing Library

## Prerequisites

- Node.js 20+ (LTS recommended)
- Yarn or npm
- Backend API running only when mocks are disabled (see `VITE_ENABLE_MOCK_API` below)

## Getting started

1. Install dependencies:

   ```bash
   yarn
   # or: npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.development
   ```

3. Start the dev server (default port `4000`):

   ```bash
   yarn dev
   ```

   With `VITE_ENABLE_MOCK_API=true` (default in `.env.development`), no backend is required. Log in with **`demo@example.com`** / **`password123`**.

## Mock API (MSW)

The app uses [Mock Service Worker](https://mswjs.io/) to intercept real `fetch` calls at the network layer. Your UI code stays unchanged; handlers in `src/mocks/handlers/` define the API contract while you build the frontend.

| Path                       | Purpose                                      |
| -------------------------- | -------------------------------------------- |
| `src/mocks/handlers/`      | Request handlers (auth, feed, user, uploads) |
| `src/mocks/data/seed.ts`   | Demo users and posts                         |
| `src/mocks/db.ts`          | In-memory store (resets between tests)       |
| `src/mocks/postsSocket.ts` | Real-time post events when mocks are on      |

To use a real backend instead, set `VITE_ENABLE_MOCK_API=false` in `.env.development` and start your API (`API_PROXY_TARGET`, default `http://localhost:3000`).

After upgrading MSW, regenerate the worker: `npx msw init public/ --save`.

## Environment variables

| Variable               | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `VITE_API_URL`         | API base URL for the browser. Empty in dev (same-origin + proxy). Set in production. |
| `VITE_ENABLE_MOCK_API` | When `true`, MSW serves `/api/*` and mock WebSocket post events.                     |
| `VITE_DEV_PORT`        | Dev server port (default `4000`).                                                    |
| `API_PROXY_TARGET`     | Backend URL for the Vite dev proxy (when mocks are off).                             |

## Scripts

| Command                             | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `yarn dev`                          | Start development server                   |
| `yarn build`                        | Production typecheck + build               |
| `yarn preview`                      | Preview production build                   |
| `yarn typecheck`                    | TypeScript check                           |
| `yarn lint` / `yarn lint:fix`       | ESLint                                     |
| `yarn format` / `yarn format:check` | Prettier                                   |
| `yarn test`                         | Vitest (watch)                             |
| `yarn test:run`                     | Vitest (single run)                        |
| `yarn validate`                     | Full check: typecheck, lint, format, tests |

Git hooks (Husky): **pre-commit** runs `lint-staged` on staged files; **pre-push** runs `typecheck` and `test:run`.

## Project structure

```
src/
  components/   # Shared UI (layout, forms, navigation, etc.)
  constants/    # Routes and navigation config
  mocks/        # MSW handlers, seed data, mock socket events
  pages/        # Route-level screens (Home, Login, Dashboard, …)
  router/       # Route definitions
  types/        # Shared TypeScript types
  utils/        # API URL, sockets, navigation helpers, …
```

## Production build

```bash
yarn build
```

Output is written to `dist/`. Serve with any static host and set `VITE_API_URL` to your API origin at build time.
