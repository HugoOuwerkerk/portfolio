---
name: Hugo Ouwerkerk Portfolio
description: A near-black, monospace developer portfolio with a single ruby signal color and dry, terminal-flavored copy.
colors:
  ruby: "#E0115F"
  ruby-deep: "#c20e52"
  void: "#050505"
  ink-white: "#ffffff"
  text-body: "#e2e8f0"
  text-muted: "#94a3b8"
  text-quiet: "#64748b"
  text-ghost: "#475569"
  hairline: "#1e293b"
  surface-slate: "#0f172a"
  ruby-text: "#FF3D7F"
  glitch-cyan: "#00BCF2"
typography:
  display:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "6rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
  body:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
  section: "128px"
components:
  link-cta:
    textColor: "{colors.ink-white}"
    typography: "{typography.body}"
  link-cta-hover:
    textColor: "{colors.ruby}"
  tech-chip:
    backgroundColor: "{colors.surface-slate}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  badge-intern:
    backgroundColor: "{colors.ruby}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: Hugo Ouwerkerk Portfolio

## Overview

**Creative North Star: "The Ruby Terminal"**

A dark console with one gemstone-red signal. The page sits on near-black (`#050505`), headings are pure white, body copy is cool slate, and a single ruby accent (`#E0115F`) marks everything that is live, selected or clickable. Type is monospace throughout, which gives the site its engineered character without any ornament beyond a few terminal-style cues (a blinking `_` cursor, uppercase labels, `///` separators, a glitch-effect name in the hero).

The voice is dry and a little witty, in the same register as the AI-tier labels on projects ("Hand-crafted with a sprinkle of AI"). The look stays restrained and tidy: generous space between sections, simple two-column layouts, hairline borders instead of shadows. Confidence comes from contrast and a single hot color, not from decoration.

**Key Characteristics:**
- Near-black ground, white headlines, slate body text, one ruby accent.
- Monospace everywhere; uppercase tracked labels for system-style metadata.
- Flat and border-defined: depth through slate hairlines and tonal panels.
- Terminal vocabulary used as seasoning (cursor, `///`, glitch), never as the whole layout.
- Motion is scroll-driven reveal, plus one signature glitch in the hero.

## Colors

A near-monochrome dark palette carrying one saturated accent.

### Primary
- **Ruby Signal** (#E0115F): The only accent. Used for the scroll-progress bar, hero underline and role line, text selection, date stamps, link hover, the INTERN badge, project AI-tier captions, the project title underline, the scrollbar thumb and the blinking cursor. On hover the scrollbar thumb deepens to **Deep Ruby** (#c20e52).

- **Ruby Text** (#FF3D7F): A lighter ruby for small text on Void Black (AI-tier captions, inline links, link hover), where Ruby Signal falls under 4.5:1 contrast. Ruby Signal stays for fills, bars, large type and the hero role line.

### Secondary
- **Glitch Cyan** (#00BCF2): Appears only as the offset cyan fringe of the hero glitch effect. It is not a UI color.

### Neutral
- **Void Black** (#050505): The page and section ground.
- **Ink White** (#ffffff): Headlines, titles, link text and emphasized values.
- **Console Text** (#e2e8f0): Default body text on the page.
- **Muted Slate** (#94a3b8): Descriptions, roles and secondary paragraphs.
- **Quiet Slate** (#64748b): Rarely used; kept for the quietest decorative text only.
- **Ghost Slate** (#475569): Unused at present.
- **Hairline Slate** (#1e293b): Borders, the timeline spine, card outlines.
- **Slate Panel** (#0f172a): Timeline tech chip backgrounds.

### Named Rules
**The One Signal Rule.** Ruby is the only chromatic color in the interface. Anything else that needs emphasis uses white or a slate step.

## Typography

**Display Font:** JetBrains Mono (loaded via `next/font`, falling back to `ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas`, `monospace`)
**Body Font:** the same
**Label/Mono Font:** the same

**Character:** One monospace voice for everything, giving the page the feel of a terminal session. Hierarchy comes from weight, size, case and color rather than from a second family. The font is wired through the `--font-jetbrains-mono` variable on `<html>` and the `--font-mono` theme token.

### Hierarchy
- **Display** (900, clamp from 1.875rem to 6rem, line-height 1, tracking -0.025em): The hero name in solid white, with the glitch effect.
- **Headline** (700, 2.25rem to 3rem): Section titles such as "Experience & Education" and "My Projects", as a single `h2` with no label above it.
- **Title** (700, 1.5rem to 2.25rem): Timeline entry names and project titles.
- **Body** (400, 1.125rem, line-height 1.625): Project and about copy in Muted Slate; timeline descriptions at 1rem.
- **Label** (400, 0.625rem to 0.875rem, tracked 0.1em, often uppercase): Dates, roles, stack lists, AI-tier captions, INTERN badge.

### Named Rules
**The Uppercase-For-System Rule.** Uppercase and wide tracking are reserved for system-style metadata and the hero role line. Prose is always sentence case.

## Layout

A single centered column, `max-w-6xl` (1152px) with 24px side gutters. Sections are stacked with large vertical rhythm: 40px padding on mobile growing to 128px (`py-32`) on desktop, and 80px to 128px between projects. The hero fills the viewport height. The experience section uses a left-ruled timeline; About is a one-third image / two-thirds text row; skills are a short label and value list; each project is a 60/40 image-and-text split that alternates sides. Everything collapses to a single column on mobile, with image above text.

## Elevation & Depth

Flat by default. Depth is built from tonal steps (Void Black, Slate Panel) and 1px Hairline Slate borders. There are no card shadows. There are no shadows or blur anywhere. The hero uses a vertical fade from transparent to Void Black so it merges into the next section.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. There are no shadows.

## Shapes

Mostly gently rounded, with sharp structural elements. Photos and cards use soft corners (12px on project images, 16px on the About portrait); chips use 4px; icon buttons and the INTERN badge are fully round. Structural lines are square: the hero underline and the project title underline are 4px-high flat bars; the timeline spine is a 2px left border. The About portrait carries a 2px ruby border, the only ruby-outlined image.

## Components

### Buttons and Links
- **Primary button ("Email me"):** The one filled button. Ruby Signal fill, white 18px bold label, 56px minimum height, 6px radius; hover deepens to Deep Ruby. Appears once in the hero and once in the contact section. There is no sticky copy; it covered content on phones.
- **Secondary button ("Download CV"):** 1px slate border, white bold label, same height, border turns ruby on hover.
- **Quiet link:** Slate-300 text with a slate underline, at least 44px tall.
- **CTA link:** Ink White bold text with a trailing external-link icon (16px). On hover the text turns Ruby over 300ms and the icon shifts up and right by 4px.

### Chips
- **Tech chip (timeline):** Slate Panel fill, Hairline Slate border, 4px radius, Console Text label in 12px mono.
- **Stack list (projects):** unboxed Quiet Slate mono text, no chip.
- **INTERN badge:** Ruby pill, white 10px text.

### Cards / Containers
- **Project image:** 16:9, 12px radius, top-aligned crop, no border or shadow.
- **Archived project card:** 16:9 image at 80% opacity, bold white title, AI-tier caption, then a bold status line followed by a plain description.

### Navigation
There is no persistent navigation. A 4px Ruby scroll-progress bar is fixed to the top edge and eased with a spring. Wayfinding is a "See projects" jump link in the hero. The site is one page.

### Timeline Entry
A signature pattern: a 40px circular icon node sits on a 2px Hairline Slate spine. Highlighted (internship) nodes fill Ruby with a white icon; others use a slate fill. The date is a Ruby mono label, the title is bold white (linked entries show an external-link icon at 50% opacity), and the role is Muted Slate mono. Entries fade and slide in from the left once as they enter the viewport.

### Hero Glitch Name
The signature moment. The name is solid white 900-weight display type with an overlaid pseudo-element pair that animates `clip` and `skew`, with a ruby fringe on one copy and a cyan fringe on the other. It plays once about 0.6s after load and again while the name is hovered. It is off under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** keep Ruby (#E0115F) as the only accent and use it on short, meaningful signals: dates, hover states, badges, cursors.
- **Do** use Void Black (#050505) for the page and Hairline Slate (#1e293b) for every border.
- **Do** keep copy dry and plain, with one small joke at a time (AI-tier captions, the "LOOKS_LIKE_I_WAS_OFFLINE" empty state).
- **Do** use uppercase tracked mono only for system-style labels and keep prose in sentence case.
- **Do** respect the 6xl (1152px) container and the large section rhythm when adding sections.

### Don't:
- **Don't** add drop shadows to cards.
- **Don't** introduce a second accent color or any gradient fills.
- **Don't** put a phone number on the site.
- **Don't** pile on terminal gimmicks; the cursor, `///` and glitch are seasoning, and the layout stays simple and tidy.
- **Don't** introduce a second typeface; JetBrains Mono carries every role.
