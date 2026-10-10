# Interactive Background & Theme Fix Implementation Plan

This plan addresses the two issues raised: the light mode appearance and the lack of an interactive, cursor-reactive particle background similar to `antigravity.google`.

## Proposed Architecture & Design

### 1. Light Mode Fix
The reason light mode appeared "just white" was because the CSS `mix-blend-multiply` effect with very faint pastel colors completely washed out against a pure white `#ffffff` background.
- **Fix**: We will adjust the base colors and remove the aggressive mix-blend modes that wash out in light themes. The new canvas background will handle the visuals instead of static CSS shapes.

### 2. Interactive Canvas Background
We will build a custom, performant HTML5 `<canvas>` component (`src/components/layout/InteractiveBackground.tsx`) to replace the current `Background.tsx`.
- **Particle System**: The canvas will render hundreds of floating particles.
- **Cursor Halo/Interactivity**: We will track the user's mouse position. Particles within a certain radius of the cursor will be drawn towards it or connected to it via lines, creating that "halo" and interactive web effect.
- **Theme Awareness**: The canvas will listen to the `next-themes` current theme and dynamically redraw the particles (e.g., glowing white/blue for dark mode, dark slate for light mode) without needing a page reload.

## Proposed Changes

#### [DELETE] `src/components/layout/Background.tsx`
We will remove the old CSS-animated background.

#### [NEW] `src/components/layout/InteractiveBackground.tsx`
A new Client Component containing a `canvas` element and a `requestAnimationFrame` loop to handle the particle physics and mouse interactivity.

#### [MODIFY] `src/app/layout.tsx`
Swap out the old `Background` component for the new `InteractiveBackground` component.
