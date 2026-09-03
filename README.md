# ABZAN — Mono / Depth

A monochrome 3D portfolio built with Next.js, React Three Fiber, Drei and Framer Motion.

## GitHub Pages deployment

This repository is configured for a GitHub Pages project site at:

`https://mohdabzan.github.io/port/`

The included GitHub Actions workflow builds the Next.js app as a static export and deploys the `out` folder to GitHub Pages.

### Important GitHub setting

In your GitHub repository:

1. Open **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Push this project to the `main` branch.
4. Open **Actions** and wait for **Deploy portfolio to GitHub Pages** to finish.
5. Visit the Pages URL.

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/port/`.

### Production build

```bash
npm run build
```

The static website is generated in `out/`.

## Customize

Edit `app/page.tsx` for your name, projects, links and content.

Replace the placeholder email:

`hello@example.com`

with your real email.

The main 3D object is procedural, so no external model file is required.
