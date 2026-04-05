# Personal portfolio

A production-style personal portfolio built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server with HMR |
| `npm run build`| Typecheck + production build |
| `npm run preview` | Serve the `dist` folder |
| `npm run lint` | Run ESLint               |

## Customize

- **Profile, nav, skills, experience:** `src/data/site.ts`
- **Projects:** `src/data/projects.ts`
- **SEO / title:** `index.html` meta tags and `<title>`