# Asset pipeline (stock-first)

v1 ships with **SVG game props** in `src/components/landing/Props.tsx` so the site works offline and stays light on Nigerian mobile networks.

## Swap in real 3D later

Drop transparent WebP/PNG renders into `public/props/` and point components at them:

| File | Suggested source |
|---|---|
| `character.webp` | Spline community character / Sketchfab CC0 stylized kid |
| `coin.webp` | Spline coin or Quaternius prop render |
| `shield.webp` | CGTrader / self-render in Blender with brand greens |
| `book.webp` | Poly Pizza / Quaternius |
| `phone.webp` | Spline phone mock + Civic Play UI screenshot |
| `flame.webp` / `timer.webp` / `star.webp` | LottieFiles → still frame or Rive |

## Recommended sources

1. [spline.design](https://spline.design) — build or remix a scene; export stills or React embed
2. [sketchfab.com](https://sketchfab.com) — filter Downloadable + CC0/CC-BY
3. [poly.pizza](https://poly.pizza) — free low-poly
4. [quaternius.com](https://quaternius.com) — free game packs
5. [lottiefiles.com](https://lottiefiles.com) / [rive.app/marketplace](https://rive.app/marketplace) — 2D interactive icons

## Brand paint

Before export, recolor materials to:

- Navy `#0B1F3A`
- Green `#2EE59D`
- Gold `#F5C542`
- Cream `#F7F1E4`

Keep a license log for any CC-BY attribution in the site footer.
