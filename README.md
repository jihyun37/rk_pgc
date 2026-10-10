# Pangyo Global Campus

English-only website for Pangyo Global Campus (PGC), built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The original premium business-hospitality design, page structure, imagery, and interactions are retained.

## Run locally

```powershell
npm ci
npm run dev -- --webpack
```

Open `http://localhost:3000`.

## Contact form delivery

The contact form uses Formspree because GitHub Pages does not provide server-side email delivery.

1. Create a Formspree form for `rondakorea@rondakorea.com` and verify that recipient address with Formspree.
2. Copy the form endpoint in the format `https://formspree.io/f/your_form_id`.
3. For local testing, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to that endpoint. Restart the development server.
4. Add the same endpoint as the GitHub Actions repository secret named `FORMSPREE_ENDPOINT` under **Settings → Secrets and variables → Actions**.
5. Submit a test inquiry and confirm receipt in the verified inbox. Formspree may require enabling the form and confirming its activation email before delivery.

The website validates required fields and email format, requires privacy consent, and includes Formspree's `_gotcha` honeypot field. Do not commit real endpoint IDs or credentials. The form explicitly reports when delivery is not configured; it never displays a false success state. Review Formspree's processing and retention terms for your privacy policy before production use.

## Deploy to GitHub Pages

The `Deploy GitHub Pages` workflow builds the static export at `/rk_pgc/` and publishes it when commits are pushed to `main`.

1. In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
2. Configure the `FORMSPREE_ENDPOINT` Actions secret as described above.
3. Push or merge changes to `main`; check **Actions → Deploy GitHub Pages** for build and deployment status.

The public project URL is `https://jihyun37.github.io/rk_pgc/`. The standard site pages are statically exported; Formspree handles submissions independently of the Pages host.

## Project structure

| Path | Purpose |
|---|---|
| `src/app/` | Home, about, rooms, guide, location, contact, and privacy routes |
| `src/components/` | Header, footer, room galleries, forms, and shared UI |
| `src/content/` | English site, room, visitor-guide, and contact content |
| `public/images/` | Original PGC image assets |
| `.github/workflows/pages.yml` | Lint, static build, and GitHub Pages deployment |
| `docs/` | Source comparison and improvement-deck implementation notes |

## Validate

```powershell
npm run lint
npx tsc --noEmit
GITHUB_PAGES=1 PAGES_BASE_PATH=/rk_pgc npm run build -- --webpack
```
