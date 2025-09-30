# EventSphere

EventSphere is a Next.js 15 application for discovering and exploring local events. It uses pnpm for package management, Tailwind CSS v4 for styling, and shadcn/ui components for a consistent, composable UI.

## Requirements

- Node.js 18.18 or newer
- pnpm 10.17.1

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
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

#### Tooling

- `pnpm prepare` - install or refresh Git hooks via `simple-git-hooks` (runs automatically after installs).

## Pre-commit hooks

- The project uses `simple-git-hooks` to register a `pre-commit` hook that runs `pnpm lint-staged`.
- `lint-staged` limits work to staged files: TypeScript/JavaScript go through `next lint --fix --file …` and then `prettier --write`, while staged CSS, Markdown, MDX, and JSON files are just formatted with Prettier.
- If the hook fails, the commit is aborted. Click view command output to see which file caused the issue, then manually apply the required formatting changes before committing again.

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
