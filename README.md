# Google Forms Lite Clone

A simplified clone of Google Forms with form creation, filling, and response viewing.

## Tech stack

**Client**

- React 19 + TypeScript
- Vite
- Redux Toolkit + RTK Query
- GraphQL Code Generator (typed hooks from `.graphql` files)
- React Router v7
- Tailwind CSS v4

**Server**

- Node.js + TypeScript
- Apollo Server v5 (GraphQL)
- In-memory data store (no database)

**Project structure**

- npm workspaces monorepo
- `client/` — React app
- `server/` — GraphQL API

## Prerequisites

- **Node.js 20+** (built and tested with v22)
- **npm 10+**

## Install

From the repo root:

```bash
npm install
```

This installs dependencies for both `client` and `server` workspaces in one go.

## Run in development

Start both client and server together:

```bash
npm run dev
```

- Client: <http://localhost:5173>
- Server (GraphQL Sandbox): <http://localhost:4000>

Run them separately if you prefer:

```bash
npm run dev:client    # only client
npm run dev:server    # only server
npm start             # alias for dev:client
```

## Regenerating GraphQL types and hooks

Whenever the schema or any `.graphql` operation file changes, regenerate the typed RTK Query hooks. The server must be running.

```bash
npm run dev:server          # in one terminal
npm run codegen -w client   # in another terminal
```

The output is written to `client/src/api/generated.ts`.

## Project structure

```
forms/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── baseApi.ts          # RTK Query base API (custom GraphQL transport)
│   │   │   ├── generated.ts        # Auto-generated typed hooks (codegen output)
│   │   │   └── operations/         # GraphQL queries and mutations
│   │   ├── components/             # Presentational components
│   │   ├── hooks/                  # Custom hooks (business logic lives here)
│   │   ├── pages/                  # Route components
│   │   ├── store/                  # Redux store config
│   │   ├── utils/                  # Pure helper functions
│   │   ├── App.tsx                 # Router setup
│   │   └── main.tsx                # Entry point
│   ├── codegen.ts                  # GraphQL Code Generator config
│   └── vite.config.ts
└── server/
    └── src/
        ├── schema.ts               # GraphQL type definitions
        ├── store.ts                # In-memory data store
        ├── resolvers.ts            # Query and mutation resolvers
        └── index.ts                # Apollo Server entry point
```

## Features

- **Homepage** (`/`) — list all forms with links to fill or view responses
- **Form Builder** (`/forms/new`) — create a form with TEXT, MULTIPLE_CHOICE, CHECKBOX, and DATE questions
- **Form Filler** (`/forms/:id/fill`) — fill out a form and submit a response
- **Form Responses** (`/forms/:id/responses`) — view all submitted responses with question text labels

## Architecture notes

- **Business logic in custom hooks**. Page components (`pages/*.tsx`) are lean orchestrators that call a hook and render the UI. State management, validation, and submit logic live in `hooks/*.ts`.
- **Presentational components** (`components/*.tsx`) receive props and render markup — no data fetching, no business logic.
- **RTK Query handles all data fetching**, with caching and tag-based invalidation. Hooks are auto-generated from `.graphql` operation files via codegen for full type safety.
- **In-memory store** in the server resets on restart. Suitable for evaluation, not production.

## Notes

- Data does not persist across server restarts (in-memory only)
- No authentication
- Client-side validation on the form builder (title, question text, options for choice-type questions)
