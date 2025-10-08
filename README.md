# Next.js Project Template

A Next.js 15 template that bundles the tooling you need to ship full-stack features fast. It uses pnpm for dependency management and comes with defaults for both the frontend and backend layers.

- TypeScript-first Next.js 15 / React 19 setup with Turbopack dev builds.
- Prisma (PostgreSQL) data access with generated clients and layered server utilities alongside an axios-based HTTP client.
- An example Users API with client/server component examples.
- Tailwind CSS v4 paired with shadcn/ui Radix primitives for cohesive UI building blocks.
- React Hook Form wired up with Zod validators to keep forms type-safe.
- ESLint, Prettier, lint-staged, and simple-git-hooks preconfigured to keep every commit clean.

## Requirements

- Node.js 18.18 or newer
- pnpm 10.17.1

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
   This also sets up the Git pre-commit hook and generates Prisma files.
2. Start the development server:

   ```bash
   pnpm dev
   ```

   Open http://localhost:3000 to view the app.

3. Create a production build:
   ```bash
   pnpm build
   ```
4. Preview the production build locally:
   ```bash
   pnpm start
   ```

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

- `pnpm prisma:generate` - generate the Prisma Client based on the current schema.
- `pnpm prisma:db:push` - sync the schema to the database without creating a migration.
- `pnpm prisma:migrate` - create and apply a migration in development.
- `pnpm prisma:studio` - open Prisma Studio to browse and edit data.

#### Tooling

- `pnpm prepare` - install or refresh Git hooks via `simple-git-hooks` (runs automatically after installs).

## Pre-commit hooks

- The project uses `simple-git-hooks` to register a `pre-commit` hook that runs `pnpm lint-staged`.
- `lint-staged` limits work to staged files: TypeScript/JavaScript go through `eslint --fix` and then `prettier --write`, while staged CSS, Markdown, MDX, and JSON files are just formatted with Prettier.
- If the hook fails, the commit is aborted. Click view command output to see which file caused the issue, then manually apply the required formatting changes before committing again.

## Database (Prisma) & API Layers

- Prisma reads its PostgreSQL datasource from `prisma/schema.prisma`; copy `.env.example` to `.env` and set `DATABASE_URL` (and, for the browser client, `NEXT_PUBLIC_API_BASE_URL`) before running any commands.
- `src/lib/prisma.ts` keeps a shared `PrismaClient` so API routes, server actions, and scripts all reuse the same instance.
- Server-facing logic lives in `src/lib/api/server`, while browser code talks to axios helpers under `src/lib/api/client`, keeping Prisma on the server side only.
- Validation helpers live in `src/lib/validators`; compose them with the server utilities and HTTP helpers to match your rendering mode.
- After schema changes, run `pnpm prisma:generate`; use `pnpm prisma:migrate` for dev migrations, `pnpm prisma:db:push` for quick syncs, and `pnpm prisma:studio` for a GUI.

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

## Recommended workflow

- During development, keep `pnpm dev` running for hot reload and type checking.
- Run `pnpm lint` and `pnpm format` before committing to ensure consistent quality.
- When introducing new UI patterns, prefer composing existing shadcn/ui primitives before creating bespoke components.
