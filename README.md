# Next.js 15 Project Template

A Next.js 15 template with React 19, Tailwind v4, Prisma, and shadcn/ui so you can build full-stack features fast, complete with an example users flow that shares Zod validators across server and client API layers.

- TypeScript-first Next.js 15 / React 19 setup with Turbopack builds.
- Prisma-backed data layer with a reusable server API (src/lib/api/server) that hides ORM details and an axios-powered client wrapper (src/lib/api/client) for browser calls - both share Zod validators so data stays in sync.
- An example Users feature showing how both a client and server component work and use their appropriate API.
- Tailwind CSS v4 with shadcn/ui primitives to compose UI fast.
- ESLint, Prettier, lint-staged, and simple-git-hooks preconfigured to maintain consistent commits.

## Getting Started
Follow these steps to set up the project:

### Prerequisites

- Node.js 20+ (LTS recommended)
- [pnpm](https://pnpm.io/) 10+
- Access to a PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/Coookei/nextjs-template
cd nextjs-template
```

### 2. Install dependencies

If you do not have pnpm installed yet, follow the [pnpm installation guide](https://pnpm.io/installation).

```bash
pnpm install
```

> This also sets up the Git pre-commit hook and generates Prisma files.


### 3. Configure secrets and environment

Copy the example `.env` file and configure the variables:
```bash
cp .env.example .env
```

Or manually create the `.env` file in the project root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/public"
NEXT_PUBLIC_API_BASE_URL="/api"
```

### 4. Apply database migrations

For local development (creates the database and tables if needed):

```bash
prisma migrate dev
```

For production deployments, apply existing migrations without creating new ones:

```bash
prisma migrate deploy
```

### 5. Start the development server

```bash
pnpm dev
```

Visit `http://localhost:3000` to view the app.


### Useful scripts

#### Development

- `pnpm dev` - start the Next.js development server with Turbopack.
- `pnpm build` - create an optimized production build using Turbopack.
- `pnpm start` - serve the production build locally.

#### Quality

- `pnpm lint` - run ESLint across the repo.
- `pnpm lint:fix` - attempt to automatically fix lint issues.
- `pnpm format` - check Prettier formatting without writing changes.
- `pnpm format:fix` - apply Prettier formatting across the codebase.
- `pnpm check` - convenience script that runs linting and formatting checks together.

#### Database

- `prisma generate` - generate the Prisma Client based on the current schema.
- `prisma db push` - sync the schema to the database without creating a migration (handy for local prototyping).
- `prisma migrate dev` - create a new migration from your schema changes and apply it in development.
- `prisma migrate deploy` - apply any existing migrations in production.
- `prisma studio` - open Prisma Studio to browse and edit data.

#### Tooling

- `pnpm prepare` - install or refresh Git hooks via `simple-git-hooks` (runs automatically after installs).

## Pre-commit hooks

- The project uses `simple-git-hooks` to register a `pre-commit` hook that runs `pnpm lint-staged`.
- `lint-staged` limits work to staged files: TypeScript/JavaScript go through `eslint --fix` and then `prettier --write`, while staged CSS, Markdown, MDX, and JSON files are just formatted with Prettier.
- If the hook fails, the commit is aborted. Click view command output to see which file caused the issue, then manually apply the required formatting changes before committing again.

## Data Layer (Prisma)

- Prisma reads its datasource from `prisma/schema.prisma`.
- `src/lib/prisma.ts` exposes a singleton `PrismaClient`, so routes, server actions, and scripts all reuse the same instance.
- After schema changes run `prisma generate` to refresh the client, and run `prisma migrate dev` to create/apply the migration in development.
- Samples are built around the `User` model in `prisma/schema.prisma` - remove or modify this to suit your own project.

## API Layers

- Server API (`src/lib/api/server`) - `usersApi` wraps Prisma queries/mutations so server components and actions stay decoupled from the ORM.
- Client API (`src/lib/api/client`) - `usersClientApi` is usable in client components which makes requests to `/api/users` using the axios instance in `httpClient`.
- Shared validation (`src/lib/validators`) - Zod keeps validation schemas consistent across the server and client components, and API routes.
- Example usage - `UserListServer` directly uses the server API, while `UserListClient` uses the client API layer.

## Styling and UI components

- Tailwind CSS v4 is loaded via `src/app/globals.css`.
- Fonts are managed with the Next.js `next/font` API in `src/app/layout.tsx`, which exposes CSS custom properties used by Tailwind.
- The shadcn/ui generator is configured via `components.json`. Generated components are located in `src/components/ui` so they can be customised.

### Adding a new shadcn/ui component

1. Find the component name in the [shadcn/ui docs](https://ui.shadcn.com/docs/components).
2. Generate it with pnpm:
   ```bash
   pnpm dlx shadcn@latest add <component-name>
   ```
   - You can add multiple components at once, e.g. `pnpm dlx shadcn@latest add card badge`.
   - The generator respects `components.json`, so files will land in `src/components/ui`, using the existing aliases.
3. Tailor the generated component as needed. Because components are copied into the repo, edits are safe and local.

If you ever need to inspect available components or their status, run:

```bash
pnpm dlx shadcn@latest list
```