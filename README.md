# ABZAN — Business Analyst 3D Portfolio

Premium black/white portfolio built with Next.js, React Three Fiber, Three.js, Framer Motion and GSAP-ready architecture.

## GitHub Pages

This project is configured for the repository:

`MohdAbzan/port`

The static export uses:

- `output: "export"`
- `basePath: "/port"`
- `assetPrefix: "/port/"`
- GitHub Actions deployment

In GitHub:

1. Open **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main`
4. Open `https://mohdabzan.github.io/port/`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/port/`.

## Build

```bash
npm run build
```

The static website is generated in `out/`.

## Files to customize

- `app/page.tsx` — page content and 3D scene
- `app/globals.css` — visual design
- `public/profile.jpg` — profile photo
- `public/cv/Abzan-CV.pdf` — CV
- `next.config.ts` — GitHub Pages path

The 3D layer is deliberately monochrome and performance-conscious, with reduced-motion support.
