# CLAUDE.md — portfolio

Hugo Ouwerkerk's personal portfolio (self.hah-ouw.dev) for recruiters and engineering leads. One page. Success = a hiring manager emails him. Public repo, so never commit secrets, private details or anything you wouldn't put on a CV.

Read before changing content or design:
- `PRODUCT.md` — audience, positioning, and the binding rules below in full.
- `DESIGN.md` — the visual system. Follow it. `.impeccable/critique/` holds earlier design critiques.

## Commands
```bash
npm install
npm run dev              # http://localhost:3000
npm run build && npm start
npm run lint             # eslint
```
Run `npm run lint` and `npm run build` before pushing. No tests.

## Deploy — merging to `main` ships to production
`.github/workflows/deploy.yml` runs on every push to `main`: SSH to the VPS, pull, rebuild Docker image (node:20-alpine, port 3005, Traefik host `self.hah-ouw.dev`). No CI gate. Use a branch and a PR; don't push to `main` unless asked.
`.github/workflows/screenshots.yml` is manual: it runs `scripts/screenshots.mjs` (Playwright, screenshots of koninghoek.de/de, puntcode.de, kraftlab.app) and commits fresh images into `public/`.

## Stack
Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, framer-motion, lucide-react, clsx + tailwind-merge. No API routes, no database, no env variables.

## Layout
- `app/page.tsx` — the whole page (~430 lines): hero, `#projects`, `#experience`, `#about`, `#contact`. All content (projects, experience, skills) is inline data in this file. There is no CMS.
- `app/layout.tsx`, `app/globals.css`.
- `public/` — project screenshots (16:9), favicon, `Hugo-Ouwerkerk-CV.pdf`.
- `scripts/cv.html` — source of the CV PDF. A content change on the page usually needs the same change in the CV, and the PDF regenerated.

## Binding content rules (from PRODUCT.md)
- Phone number, home address and date of birth never go on the site or in the CV. Primary contact is one "Email me" button (hero and contact section). GitHub and LinkedIn stay public.
- Hiring ask is exactly "Open to full-stack and backend roles." Remote or on-site, open to relocating. No dates, no mention of internships in the ask.
- Don't re-add the `/personal` travel gallery. The About text may mention travelling as plain text, no link.
- Don't invent testimonials, metrics, client quotes or project claims. Every claim must point to something live or to a repo.
- Each project has a deliberate AI-involvement caption ("Hand-crafted with a sprinkle of AI" … "Prompt-engineered to perfection"). Keep them, and be candid about project status (retired, shelved).
- Copy style: short, plain sentences, dry voice, no buzzwords. Cut anything a recruiter wouldn't miss.

## Keeping it true
The project list must match reality. When a project's status changes (KraftLab, Koninghoek site, Puntcode, ProjectBoard retired, Platzpionier shelved) update `app/page.tsx`, the screenshots (run the screenshots workflow) and the CV. The Saxion degree dates in the experience section also live in both places.
