# Tasks

Open tasks, highest priority first. Delete a task when it's done.

- [ ] **Fix the issues in the empty-state view** ("No Distribus Here" / "Create Distribu"): Carlos to list what's wrong. Pressing Enter in the name field doesn't submit the form (only the "Let's go!" button does); check whether that's one of them. To see this view again after creating a distribu, use an empty browser profile or clear the site's data.
  - [ ] **Finish and adopt `useMorph`** (`app/motion/use-morph.ts`, branch `container-morph`): hook returning `{ layoutId, transition }` (generated id, preset from `app/motion/presets.ts`), spread onto both components' Motion elements. `StartButton` already uses it. The `ComponentMorpher` idea is archived (`archive/component-morpher`, see `archive.md`). The unfinished version on the local-only `reserve-morph` branch (WIP commit `ac08770`, never pushed) is the second use case: the reserve card expand in `reserves-list.tsx` (press/long-press/drag). That WIP still builds on the archived `ComponentMorpher`, not `useMorph` — needs porting, not just adopting. Once salvaged, delete `reserve-morph`. 
  - [ ] **Review the button-to-form morph in `start-button.tsx`**: make the transformation more subtle (now via `useMorph` with `layoutTransitions.springy`).
  - [ ] **Overhaul the whole `distribus` UI**: open the last opened distribu directly, skipping the distribu manager. No manager view; the open distribu gets a dropdown to switch to another one when the user has more than one.

- [ ] **Add a real migration strategy for the in-browser database**: `data/database/entry.ts` creates the tables only if `distribus` is missing, and only from migration `0000_rich_vision.sql`. Future schema changes won't be applied to existing browsers. Replace with versioned migrations that run on startup.

- [ ] **Recheck the remaining security advisory**: `pnpm audit` still shows 1 moderate `minimatch` finding via `@react-router/fs-routes` (build-time only). Forcing `minimatch` 11 breaks `fs-routes` (`makeRe` is gone), so wait for a React Router release that fixes it. The fix needs `minimatch` 11 or later; `@react-router/fs-routes` 8.5.1 (the latest, React Router 8) depends on `minimatch ^10.2.5`, so upgrading to React Router 8 alone does NOT clear GitHub alert #118. Wait for an `fs-routes` release that depends on `minimatch` 11 or later. Practical risk is very low (build-time only, on your own route file names); dismissing the alert on GitHub as "tolerable risk" is also an option.

- [ ] **Remove the `esbuild` override when upgrading to `drizzle-kit` 1.0**: `package.json` has `pnpm.overrides` forcing `@esbuild-kit/core-utils>esbuild` to `^0.25.0` (clears an `esbuild` advisory that `drizzle-kit` 0.31.x pulls in through the deprecated `@esbuild-kit/esm-loader`). When `drizzle-kit` 1.0 is stable, upgrade `drizzle-orm` and `drizzle-kit` together, delete the override, and test `drizzle-kit generate`, `push` and `studio` once. Until then, only `drizzle-kit --version` has been checked with the override in place.

- [ ] **Optional: upgrade to React Router 8**: the dev server prints future-flag warnings for v8 (middleware, route module splitting, Vite environment API, request handling, data request URLs). Not needed for security; 7.18 has the fixes.

- [ ] **Replace mock data on the distribu page**: `app/routes/distribus_.$distribuName/route.tsx` imports `data/mockData.ts`, so a new distribu shows made-up reserves and funds. Confirm and wire it to the database queries.

- [ ] **Deprecate Tailwind 4**: `tailwindcss` and `@tailwindcss/vite` are only used for base styles in `app/app.css` (`@theme` font, `@apply` on `html`/`body`) and utility classes in the error boundary in `app/root.tsx`. Migrate those to StyleX, then remove both packages and the vite plugin.
