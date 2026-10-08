# Serein

> *Your emotional weather, beautifully mapped.*

Serein (French: fine rain from a clear sky) is a mood-tracking brand whose UI behaves like weather.

## Monorepo Structure

```
serein/
  landing/   → serain.app      (plain HTML/CSS/JS, static)
  app/       → app.serain.app  (Astro + TypeScript + Tailwind v4)
  tokens/    → shared design tokens (JSON → CSS)
```

## Getting Started

```bash
pnpm install
pnpm tokens        # Generate CSS variables from tokens.json
pnpm dev:landing    # Serve landing at :4321
pnpm dev:app        # Astro dev at :3000
pnpm test           # Run Vitest tests
pnpm build          # Build both projects
```

## Five Moods

| Mood       | Primary   | Secondary |
|------------|-----------|-----------|
| Clear      | Amber     | Cloud     |
| Misty      | Lavender  | Mist      |
| Rainy      | Blue      | Slate     |
| Stormy     | Deep Navy | Night     |
| Sunshower  | Amber     | Lavender  |

## Fonts

- **Fraunces** — Display / headings
- **Inter** — Body text
- **JetBrains Mono** — Data / monospace

## License

Private — All rights reserved.
