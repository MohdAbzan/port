# ABZAN — Mono / Depth

A modern monochrome portfolio concept combining glassmorphism, 3D motion, scroll storytelling and editorial typography.

## Stack
- Next.js
- React
- Three.js / React Three Fiber
- Drei
- Framer Motion
- CSS

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Customize
- Edit personal/project content in `app/page.tsx`.
- Replace `hello@example.com` with your real email.
- Adjust visual tokens in `app/globals.css`.
- Replace the procedural 3D orb in `GlassOrb()` with a GLB model when ready.

## GitHub

```bash
git init
git add .
git commit -m "Create Mono Depth 3D portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Design notes
The experience intentionally keeps the UI monochrome and lets depth, transparency, lighting and motion provide the visual character. It includes a reduced-motion mode and a responsive layout so the 3D effect is not the only way to understand the content.
