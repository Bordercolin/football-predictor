# Design System Strategy: The High-Performance Editorial

## 1. Overview & Creative North Star: "The Kinetic Gallery"
This design system moves away from the aggressive, neon-drenched aesthetics of traditional sports betting and toward a "Kinetic Gallery" experience. It treats sports data with the reverence of an editorial magazine and the precision of a high-frequency trading platform.

The North Star is **High-Performance Clarity**. We achieve a premium feel through intentional asymmetry—using large `display-lg` typography to anchor layouts—and "breathing room" (negative space) that allows complex odds and statistics to feel approachable. By layering light surfaces instead of using rigid borders, we create a fluid, airy interface that feels like high-end athletic apparel: lightweight, technical, and sophisticated.

---

## 2. Color & Surface Architecture
We abandon the "boxed-in" look of legacy apps. The interface is defined by light and depth, not lines.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning content. Boundaries must be defined solely through background color shifts.
- Use `surface-container-low` (#f3f4f5) to define a secondary content area sitting on a `surface` (#f8f9fa) background.
- To separate a "Match Card" from a background, use a tonal shift to `surface-container-lowest` (#ffffff) to create a natural, borderless lift.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the tier system to create "nested" importance:
1. **Base Layer:** `surface` (#f8f9fa) – The canvas.
2. **Sectioning:** `surface-container-low` (#f3f4f5) – Use for sidebars or grouping related modules.
3. **Interactive Elements:** `surface-container-lowest` (#ffffff) – Reserved for the most important cards and input fields to make them "pop" against the gray base.

### Signature Textures & Gradients
To provide "visual soul," use subtle gradients for primary actions and hero moments:
- **Primary CTA:** A linear gradient from `primary` (#001b44) to `primary_container` (#002f6c) at a 135-degree angle.
- **Data Accents:** Use `secondary` (#00658d) with a `surface_variant` overlay at 10% opacity to create a technical "glow" that isn't neon.

---

## 3. Typography: The Editorial Edge
We use a dual-typeface system to balance "Sporty Edge" with "Technical Precision."

* **Display & Headline (Plus Jakarta Sans):** These are your "Athletic" voices. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for big score reveals or hero headlines. The geometric nature of Plus Jakarta Sans provides the "High-Performance" feel.
* **Body & Labels (Inter):** These are your "Technical" voices. Inter is used for odds, player stats, and micro-copy. Its high x-height ensures readability even at `label-sm` (0.6875rem) when viewing dense match spreadsheets.
* **Hierarchy Note:** Always pair a `headline-sm` in `primary` with `body-md` in `on_surface_variant` (#434750) to ensure the data feels secondary to the narrative.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders create "visual noise." We use ambient light.

* **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-highest` (#e1e3e4) element should be used for persistent navigation (like a bottom bar), creating a solid anchor against the lighter `surface` background.
* **Ambient Shadows:** For floating elements (Modals/Poppers), use an extra-diffused shadow: `0px 24px 48px rgba(25, 28, 29, 0.06)`. The tint is derived from `on_surface` to keep it natural.
* **The "Ghost Border" Fallback:** If a divider is mandatory for accessibility, use the `outline_variant` (#c4c6d2) at **15% opacity**. It should be felt, not seen.
* **Glassmorphism:** For top navigation bars, use `surface` (#f8f9fa) at 80% opacity with a `backdrop-blur` of 12px. This allows the vibrant team colors and scrolling content to bleed through, softening the layout.

---

## 5. Components & Primitives

### Buttons (The Kinetic Triggers)
- **Primary:** Gradient (`primary` to `primary_container`), `DEFAULT` (12px) rounding, white text.
- **Action (Coral):** Use `on_tertiary_container` (#fb6c5e) for "Place Bet" or "Live Now" buttons. This warm coral acts as the emotional trigger against the cool navy/blue palette.
- **Secondary:** `surface-container-high` (#e7e8e9) with `primary` text. No border.

### Cards (Match & Stat Modules)
- **Rule:** Forbid divider lines within cards.
- **Implementation:** Use `Spacing 4` (1.4rem) to separate a team logo from the odds. If multiple matches are listed, alternate background colors between `surface-container-lowest` and `surface-container-low` instead of using lines.

### Chips (Market Filters)
- **Default:** `surface-container-high` background, `on_surface_variant` text.
- **Selected:** `secondary` (#00658d) background, `on_secondary` (white) text.

### High-Performance Inputs
- Input fields use `surface-container-lowest` (#ffffff) with a `3.5` (1.2rem) padding.
- Error states: Use `error` (#ba1a1a) text but a `error_container` (#ffdad6) soft background glow rather than a thick red border.

### Specialized Component: The "Momentum Gauge"
For a sports app, create a custom "Momentum" component using a `secondary_container` (#2dbcfe) to `secondary` gradient bar to show which team is dominating, housed in a `surface-dim` (#d9dadb) track.

---

## 6. Do's and Don'ts

### Do
- **Do** use `Spacing 8` (2.75rem) for page margins to emphasize the "Airy" feel.
- **Do** use `tertiary_container` (#6b0004) sparingly for "Hot Bets" or "High Risk" indicators.
- **Do** align data points (odds) to the right and labels to the left to create a clean vertical "gutter" of white space.

### Don't
- **Don't** use pure black (#000000). Always use `on_background` (#191c1d) for text to maintain the premium, soft-gray look.
- **Don't** use the `DEFAULT` (12px) rounding on every single element. Use `full` (9999px) for chips and `sm` (0.25rem) for very small indicators to create visual variety.
- **Don't** use standard "drop shadows" on cards. Stick to tonal background shifts.