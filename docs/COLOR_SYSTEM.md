# Pachiku Color System Documentation

This document describes all colors and design tokens used in the Pachiku application.

## Color Space: OKLCH

All colors use the OKLCH color space for better perceptual uniformity:

- **L** = Lightness (0 = black, 1 = white)
- **C** = Chroma (saturation, 0 = gray)
- **H** = Hue (angle in degrees)

---

## Light Theme Colors

### Brand Colors (Sky Blue - Hue 230)

| Variable                   | Value                                                                 | Description                   |
| -------------------------- | --------------------------------------------------------------------- | ----------------------------- |
| `--primary-sky-blue`       | `linear-gradient(180deg, oklch(0.68 0.15 230), oklch(0.62 0.14 230))` | Main brand gradient           |
| `--primary-sky-blue-color` | `oklch(0.68 0.15 230)`                                                | Solid brand blue              |
| `--secondary-sky-blue`     | `oklch(0.35 0.1 230)`                                                 | Darker blue for buttons/icons |
| `--light-sky-blue`         | `oklch(0.97 0.02 230)`                                                | Very light blue tint          |
| `--dark-sky-blue`          | `oklch(0.2 0.04 230)`                                                 | Very dark blue                |

### Layered Background System

| Variable     | Value               | Usage                           |
| ------------ | ------------------- | ------------------------------- |
| `--bg-dark`  | `oklch(0.92 0 264)` | Page background (deepest layer) |
| `--bg`       | `oklch(0.96 0 264)` | Container surfaces              |
| `--bg-light` | `oklch(1 0 264)`    | Elevated/highlighted elements   |

### Text Colors

| Variable       | Value               | Usage                |
| -------------- | ------------------- | -------------------- |
| `--text`       | `oklch(0.15 0 264)` | Primary text         |
| `--text-muted` | `oklch(0.4 0 264)`  | Secondary/muted text |

### Legacy Colors

| Variable                | Value                 |
| ----------------------- | --------------------- |
| `--primary-black`       | `oklch(0.15 0 264)`   |
| `--secondary-black`     | `oklch(0.17 0 264)`   |
| `--primary-white`       | `oklch(1 0 264)`      |
| `--slightly-dark-white` | `oklch(0.97 0 264)`   |
| `--secondary-white`     | `oklch(0.94 0 264)`   |
| `--primary-grey`        | `oklch(0.4 0 264)`    |
| `--secondary-grey`      | `oklch(0.75 0 264)`   |
| `--primary-red`         | `oklch(0.55 0.22 25)` |
| `--secondary-red`       | `oklch(0.45 0.2 25)`  |

---

## Dark Theme Colors

### Brand Colors (Darker for white text contrast)

| Variable                   | Value                                                                 | Description             |
| -------------------------- | --------------------------------------------------------------------- | ----------------------- |
| `--primary-sky-blue`       | `linear-gradient(180deg, oklch(0.45 0.14 230), oklch(0.38 0.12 230))` | Darker brand gradient   |
| `--primary-sky-blue-color` | `oklch(0.45 0.14 230)`                                                | Darker solid brand blue |
| `--secondary-sky-blue`     | `oklch(0.28 0.1 230)`                                                 | Even darker for buttons |
| `--light-sky-blue`         | `oklch(0.18 0.02 230)`                                                | Dark blue tint          |
| `--dark-sky-blue`          | `oklch(0.15 0.04 230)`                                                | Darkest blue            |

### Layered Background System (Inverted)

| Variable     | Value               | Usage              |
| ------------ | ------------------- | ------------------ |
| `--bg-dark`  | `oklch(0.12 0 264)` | Page background    |
| `--bg`       | `oklch(0.18 0 264)` | Container surfaces |
| `--bg-light` | `oklch(0.25 0 264)` | Elevated elements  |

### Text Colors (Inverted)

| Variable       | Value               | Usage                       |
| -------------- | ------------------- | --------------------------- |
| `--text`       | `oklch(0.96 0 264)` | Primary text (white)        |
| `--text-muted` | `oklch(0.7 0 264)`  | Secondary text (light gray) |

### Legacy Colors (Dark Mode Adjustments)

| Variable                | Value               | Notes                        |
| ----------------------- | ------------------- | ---------------------------- |
| `--primary-black`       | `oklch(0.15 0 264)` | Stays dark for button hovers |
| `--secondary-black`     | `oklch(0.1 0 264)`  | Stays dark for button hovers |
| `--primary-white`       | `oklch(0.12 0 264)` | Inverted                     |
| `--slightly-dark-white` | `oklch(0.18 0 264)` | Inverted                     |
| `--secondary-white`     | `oklch(0.22 0 264)` | Inverted                     |
| `--primary-grey`        | `oklch(0.7 0 264)`  | Inverted                     |
| `--secondary-grey`      | `oklch(0.5 0 264)`  | Inverted                     |

---

## Shadow System

### Light Theme Shadows

| Variable         | Description                         |
| ---------------- | ----------------------------------- |
| `--shadow-s`     | Small - subtle elevation for cards  |
| `--shadow-m`     | Medium - standard containers        |
| `--shadow-l`     | Large - prominent/floating elements |
| `--shadow-inset` | Recessed/pressed elements           |
| `--shadow-brand` | Blue brand elements                 |

### Dark Theme Shadows

- Same structure but with:
  - Reduced white inset highlights (0.08-0.12 opacity)
  - Increased black shadow opacity (0.2-0.4)

---

## Transitions

| Variable              | Value               | Usage                |
| --------------------- | ------------------- | -------------------- |
| `--transition-fast`   | `150ms ease-in-out` | Micro-interactions   |
| `--transition-normal` | `200ms ease-in-out` | Standard transitions |
| `--transition-theme`  | `300ms ease-in-out` | Theme switching      |

---

## Current Implementation Issues

1. **Theme switching uses `body.dark` class** - requires JavaScript to toggle
2. **No `color-scheme` property** - scrollbars and form controls don't adapt
3. **Glitchy transitions** - no view transitions for smooth theme changes
4. **No system preference following** - doesn't respect `prefers-color-scheme`

## Planned Improvements

1. Use `color-scheme: light dark` on `:root`
2. Use `:has()` selector for CSS-only theme switching
3. Add view transitions for smooth theme changes
4. Support System/Light/Dark options
