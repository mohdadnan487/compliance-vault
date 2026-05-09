# Enhance Product UI

A SaaS compliance records app exported from Figma Make.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind v4 · Material UI v7 · shadcn/ui (Radix) · Framer Motion · Recharts

---

## Quick start

```bash
# 1. Install pnpm if you don't have it (one time)
npm install -g pnpm

# 2. Install dependencies
pnpm install

# 3. Run the dev server
pnpm dev
```

Open http://localhost:5173

You can also use `npm install && npm run dev` if you prefer npm — the project doesn't depend on pnpm features.

## Scripts

| Command           | What it does                                            |
| ----------------- | ------------------------------------------------------- |
| `pnpm dev`        | Start Vite dev server with hot reload at `:5173`        |
| `pnpm build`      | Type-check & bundle for production into `dist/`         |
| `pnpm preview`    | Serve the built `dist/` locally to verify the build     |
| `pnpm typecheck`  | Run TypeScript without emitting (catches type errors)   |

## Project structure

```
.
├── index.html                  # Vite entry HTML
├── src/
│   ├── main.tsx                # React mount point
│   ├── app/
│   │   ├── App.tsx             # Main app (~3.2k lines, all the screens)
│   │   └── components/
│   │       ├── ui/             # shadcn/ui components (50+, Radix-based)
│   │       └── figma/          # Figma helpers (ImageWithFallback)
│   ├── imports/                # Imported Figma JSX
│   └── styles/
│       ├── index.css           # Loads fonts + tailwind + theme
│       ├── tailwind.css        # Tailwind v4 entry
│       ├── theme.css           # Design tokens (CSS vars)
│       ├── globals.css         # Global resets
│       └── fonts.css           # Font faces
├── vite.config.ts              # Vite config + figma:asset/ resolver
├── tsconfig.json               # TS config with @/* alias
├── vercel.json                 # Vercel deploy config
└── netlify.toml                # Netlify deploy config
```

The `@/` path alias points to `src/`, so you can write `import x from '@/app/components/ui/button'`.

## Deployment

The app is a static SPA — any static host works. Two zero-config options:

### Vercel (recommended)
1. Push this repo to GitHub
2. Go to https://vercel.com/new, import the repo
3. Vercel auto-detects Vite — click Deploy. The included `vercel.json` handles SPA routing.

### Netlify
1. Push this repo to GitHub
2. Go to https://app.netlify.com/start, pick the repo
3. Build settings auto-load from `netlify.toml`

### Cloudflare Pages
- Build command: `pnpm build`
- Build output: `dist`
- Add an SPA fallback rule (`/*` → `/index.html`, 200) under Settings → Redirects.

## Live editing workflow

The fastest loop is:

1. Run `pnpm dev` locally — Vite gives you instant hot reload in the browser
2. Make edits in `src/app/App.tsx` (or split it into smaller files as it grows)
3. Save — the browser updates without losing state

The main app is currently one file (`src/app/App.tsx`). When you're ready, you can break it apart into per-screen files under `src/app/screens/` or similar.

## Notes / gotchas

- **Tailwind v4** is configured via the Vite plugin (`@tailwindcss/vite`), not a `tailwind.config.js`. Tokens live in `src/styles/theme.css` as CSS custom properties.
- **MUI + Tailwind together** — MUI uses Emotion, Tailwind uses utility classes. They coexist fine, but if a class doesn't apply, check whether MUI's style injection is overriding it (MUI sx prop and styled() take precedence over Tailwind classes by default).
- **`figma:asset/`** — the Vite config has a custom resolver for these. None are currently used, but if you add Figma-imported images they'll resolve from `src/assets/`.
- **No environment variables yet.** When you add a backend, put public vars in `.env.local` prefixed with `VITE_` (e.g. `VITE_API_URL`). Never commit `.env*` files.
