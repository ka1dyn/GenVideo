# test-project Project AI Guidelines

## 1. Component Rules

- ❌ DO NOT place components in a global `components/` folder.
- ✅ ALWAYS place components in the specific section's folder (e.g., `src/projects/test-project/{section}/components/`).
- ❌ DO NOT fix `shared-components`. it is project shared resource.
- ✅ USE `shared-components` for globally shared generic components (like `CaptionOverlay`, `Wobble`, etc).

## 2. Design Tokens (`theme.ts`)

- ❌ NEVER modify `src/constants/theme.ts`. It is READ-ONLY.
- ✅ STRICTLY use the design tokens exported from `theme.ts` (COLORS, EFFECTS, FONTS, SPACING, ANIMATION, Z).
- ❌ DO NOT use hardcoded colors (e.g., `#FFFFFF`, `rgba(0,0,0,0.5)`).
- ❌ DO NOT mix tokens (e.g., using `SPACING.PX_16` for font sizes). Use `FONTS.SIZE_*` for font sizes.
