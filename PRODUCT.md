# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Hiring managers, recruiters and engineering leads evaluating Hugo Ouwerkerk for jobs or internships. They arrive from a CV or LinkedIn link, skim for what he has actually shipped and what he is like to work with, and decide whether to get in touch.

## Product Purpose
Personal portfolio of Hugo Ouwerkerk, a software developer based in Uelsen, Germany (Associate Degree in Software Development at Saxion, in progress). It exists to turn a visit into an interview or an email. Success is a hiring manager contacting him.

## Positioning
A full-stack developer who also runs a restaurant kitchen, builds and hosts the restaurant's website, and runs his own one-person software business (Puntcode) shipping real products such as KraftLab. A typical developer portfolio can't truthfully claim this mix.

## Operating Context
Single-page portfolio (hero, projects, experience and education, about and skills, contact). The travel gallery (`/personal`) was removed. Deployed with Docker via GitHub Actions; a screenshots workflow exists.

## Capabilities and Constraints
- Existing codebase: Next.js 16, React 19, Tailwind 4, framer-motion, lucide-react.
- Content lives inline in `app/page.tsx`. The site is one page.
- Primary contact is email: one prominent "Email me" button in the hero and the contact section. GitHub and LinkedIn stay public. The phone number is removed from the site and must not be added back (not on the page, not in the CV).
- Hiring ask, as shown on the site: "Open to full-stack and backend roles." Remote or on-site, open to relocating. No dates, no mention of internships in the ask.
- A one-page English CV (`public/Hugo-Ouwerkerk-CV.pdf`, source `scripts/cv.html`) is linked from the hero and contact section. It uses only facts already on the site: no home address, date of birth or phone number.
- Copy style: short, plain sentences. No buzzwords. Cut anything a recruiter wouldn't miss.
- Each project carries an AI-involvement label ("Hand-crafted with a sprinkle of AI" through "Prompt-engineered to perfection"); this is deliberate and stays.
- The travel page and its photos were removed on request. Do not add them back. The About text still mentions travelling, as plain text with no link.
- Not confirmed as fixed: the current stack (no decision recorded either way).

## Brand Commitments
Name: Hugo Ouwerkerk. Honest, lightly self-deprecating voice about AI use ("a full-stack developer who occasionally lets AI handle the pixels"). No other visual or identity commitments were made binding.

## Evidence on Hand
Live projects with screenshots in `public/`: KraftLab, Landgasthof Koninghoek, Puntcode, ProjectBoard (retired), Platzpionier (shelved). Work history: Emmedy Learning Solutions, Coddin, Landgasthof Koninghoek, Beim Schweinswirt (closed). No testimonials, metrics or client quotes exist; do not invent them.

## Product Principles
- Show what is real and shipped; every claim points to a live site or repository.
- Be candid about AI use, project status (retired, shelved) and role; honesty is the differentiator.
- Make it fast for a skimming reader to see the dev-plus-kitchen-plus-founder story and reach the contact details.
- Keep the page about the professional case. Personal details stay to one short line in About.
