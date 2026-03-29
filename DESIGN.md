# App design reference (LLM / implementer guide)

Short intent: **editorial, calm sports product**—navy as authority, cool greys for surfaces, coral/red for emphasis—not neon “betting app” chrome. Prefer **tonal surfaces** over heavy borders; **clear type hierarchy** (display vs data).

---

## 1. Source of truth (files)

| What | Where |
|------|--------|
| Color values (hex) | `src/utils/colors.js` |
| Tailwind tokens (NativeWind) | `tailwind.config.js` → `theme.extend.colors` imports that file |
| Body / labels text | `@/components/typography/Text` — props: `family`, `weight` |
| Headlines | `@/components/typography/Heading` — `level` 1–4, always `family="jakarta"` internally |
| Icon set | `@expo/vector-icons` — `Ionicons` |

**Rule:** When adding UI, prefer **Tailwind classes** (`text-primary-navy-dark`) or **`colors` from `@/utils/colors`** in `style`—do not invent new hex values unless extending `colors.js`.

---

## 2. Color tokens → Tailwind classes

Tailwind flattens nested keys: `primary.navy.dark` → utility segment `primary-navy-dark` → class `text-primary-navy-dark`, `bg-primary-navy-dark`, etc.

### 2.1 Primary navy (brand / headlines)

| Role | Hex | Example classes |
|------|-----|-----------------|
| Navy default | `#002F6C` | `text-primary-navy`, `bg-primary-navy` |
| Navy light | `#7090D3` | `text-primary-navy-light` |
| Navy dark | `#001A42` | `text-primary-navy-dark` (strong headlines) |

### 2.2 Primary blue (accents, links, “live” energy)

| Role | Hex | Example classes |
|------|-----|-----------------|
| Blue default | `#00AEEF` | `text-primary-blue`, `bg-primary-blue` |
| Blue light | `#C6E7FF` | `bg-primary-blue-light` |
| Blue dark | `#004C6B` | `text-primary-blue-dark` |

### 2.3 Primary red / coral (warnings, CTAs, emotional emphasis)

| Role | Hex | Example classes |
|------|-----|-----------------|
| Red default | `#FF6F61` | `text-primary-red`, `bg-primary-red` |
| Red light | `#FFB4AA` | `bg-primary-red-light` |
| Red dark | `#8B1A16` | `text-primary-red-dark` |

### 2.4 Greys (UI chrome, secondary text, cards)

| Role | Hex | Example classes |
|------|-----|-----------------|
| Grey default | `#5C5F60` | `text-primary-grey` (muted labels) |
| Grey light | `#f2f4f5` | `bg-primary-grey-light` (soft panels / cards) |
| Grey dark | `#2E3132` | `text-primary-grey-dark` |

### 2.5 Global

| Token | Hex | Example classes |
|-------|-----|-----------------|
| `white` | `#F8F9FA` | `bg-white`, `text-white` |
| `black` | `#191C1D` | `text-black` (prefer over pure `#000`) |
| `success` | `#008000` | `text-success`, `bg-success` |

### 2.6 Semantic usage (quick rules)

- **Page / canvas:** often `bg-white` or light grey surfaces (`bg-primary-grey-light`).
- **Primary titles / league names:** `text-primary-navy-dark` + Jakarta, heavy weight.
- **Secondary / meta labels:** `text-primary-grey`, Inter, smaller size + tracking if uppercase.
- **Destructive / “hot” actions:** `primary-red` family, not random reds.
- **Avoid:** pure `#000`; use `black` token or navy/grey scale.

---

## 3. Typography

### 3.1 Families (loaded in `src/app/_layout.tsx`)

| Role | `Text` / `Heading` `family` | Actual font files (static weights) |
|------|-----------------------------|-----------------------------------|
| Headings | `Heading` → always Jakarta | `PlusJakartaSans-*` |
| UI body, labels, data | `inter` (default on `Text`) | `Inter_18pt-*` |

### 3.2 Weights (only these are wired)

`weight` prop: **`400` | `600` | `700` | `800`** — maps to specific font files (do not rely on synthetic `fontWeight` for custom families).

| Weight | Typical use |
|--------|----------------|
| 400 | Body, captions |
| 600 | Semibold labels |
| 700 | Strong labels |
| 800 | Display / hero titles |

### 3.3 Heading levels → Tailwind size (in `Heading.tsx`)

| `level` | `className` size token |
|---------|-------------------------|
| 1 | `text-2xl` |
| 2 | `text-xl` |
| 3 | `text-lg` |
| 4 | `text-base` |

### 3.4 Tailwind font utilities

- `font-inter` → `Inter-Regular` (default face only; use `Text` `weight` for other Inter weights).
- `font-jakarta` → `PlusJakartaSans-Regular` (same caveat).

**Prefer** the `Text` / `Heading` components so **family + weight stay consistent**.

### 3.5 Default text styling

`Text` adds `leading-tight` and `text-on_surface` by default — if `text-on_surface` is not defined in theme, replace with an explicit token (e.g. `text-black` or `text-primary-navy-dark`) when building new screens.

---

## 4. Layout & shape

- **Cards:** e.g. `rounded-2xl`, generous padding (`p-6`), `bg-primary-grey-light` for lifted modules (see `LeagueStatusCard`).
- **Bottom navigation:** `@/components/core/Navigation` — grey bar from `colors.primary.grey`, active state `navy.dark`, inactive `grey.DEFAULT`.
- **Spacing:** use Tailwind spacing scale; editorial layouts favor **more horizontal padding** on narrow screens (`px-6` pattern).

---

## 5. Borders, shadows, depth

**Direction (align new work here):**

- **SHOULD:** separate regions with **background color** (white vs `primary-grey-light` vs slightly darker grey), not 1px boxes everywhere.
- **SHOULD:** use **hairline** borders only when needed (e.g. nav top edge); subtle grey from the same palette.
- **AVOID:** heavy drop shadows on every card; if using shadow, keep it soft and rare (modals, floating elements).
- **AVOID:** neon gradients unless for a deliberate hero/CTA moment.

*(Older drafts mentioned Material-style names like `surface-container-low`—those are **not** in `colors.js`. Map ideas to the table in §2.)*

---

## 6. Icons

- Use **`Ionicons`** from `@expo/vector-icons`: `import { Ionicons } from "@expo/vector-icons"`.
- Match icon stroke/fill weight to state (outline vs filled) similar to `Navigation.tsx`.
- Tint with semantic colors from §2 (not arbitrary hex).

---

## 7. Checklist before shipping UI

1. Colors taken from **`src/utils/colors.js`** (or matching `text-primary-*` / `bg-primary-*` classes).
2. Type set via **`Text` / `Heading`** with valid `weight` and appropriate `family`.
3. Surfaces differentiated by **tone**, not only borders.
4. New routes/screens still respect **safe area** and **bottom nav** layout in `src/app/_layout.tsx` if applicable.

---

## 8. Glossary (one line each)

| Term | Meaning in this app |
|------|---------------------|
| **Editorial** | Magazine-like hierarchy: strong title, subdued supporting data. |
| **Tonal layering** | Different background greys/whites to show depth instead of outlines. |
| **Primary navy** | Brand and primary reading emphasis for headlines. |
| **Primary grey** | Muted text and soft panels. |
