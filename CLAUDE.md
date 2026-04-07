# CLAUDE.md — ScaleHere Project Instructions

## Role
You are a senior UI designer and front-end developer. Prioritize clean, modern, and professional design at every step.

## Project
We are rebuilding the website for **Scale SD**, a social media marketing agency based in San Diego, CA.
Website: scalehere.com
The current site is on Wix. We are replacing it with a custom-coded site.

## Tech Stack
- **Tailwind CSS** for all layout, spacing, and styling
- **shadcn/ui** for pre-built components (buttons, cards, accordions, etc.)
- **Framer Motion** for animations and hover effects
- Use **Next.js** unless told otherwise

## Design Direction
- Modern, premium marketing agency aesthetic — NOT generic or "AI slop"
- Dark or deep-toned backgrounds preferred (navy, charcoal, or near-black) with bold accent colors
- Use radial gradients with layered blurred color circles for background depth
- Avoid flat white backgrounds — they look amateur
- Use TWO fonts: one bold/stylish font for headings, one clean readable font for body text (both from Google Fonts)
- Subtle animations: elements fade/slide in on scroll, buttons have hover effects
- Mobile responsive at all times

## Brand Voice
- Confident but approachable
- San Diego local roots, but services clients beyond SD (LA and beyond)
- "We treat clients like family"
- Results-focused: real numbers, real outcomes

## Key Content (always available in scalehere_content.md)
- Hero tagline: "We Manage All Your Content & Ads With Just 1 Hour of Your Time Each Week."
- Stats: 100+ clients, 10+ years experience, 50+ businesses scaled, $1M+ revenue generated
- Services: Social Media Management, Digital Marketing, Collaborations/Influencer
- Contact: 760-443-7876 | Scalenowsd@gmail.com | 10918 Technology Pl, San Diego, CA 92025

## Coding Behavior
- Write clean, well-commented code
- Never break working features when making changes — ask if unsure
- When adding new sections, keep the overall visual style consistent
- Always make components reusable when possible
- If something looks broken in preview, fix it before moving on

## Iteration Notes
- I am a beginner — explain what you're doing in plain English when it's not obvious
- When I share a screenshot, treat it as the source of truth for what needs fixing
- Default to asking clarifying questions before making large structural changes

## Saving Progress
- After completing any significant change or feature, automatically run git add . and commit with a descriptive message. Never commit broken code.

---

## Current Project State
This is a **single-page site**. All navigation uses anchor links — there are no separate pages (/about, /contact, etc.). Do not add multi-page routing.

### Completed
- Next.js + TypeScript + Tailwind CSS + shadcn/ui project initialized in `v1/`
- ANF Assemble phase done: sections built from 21st.dev component prompts
- ANF Normalize phase done: dark theme, fonts, colors unified
- ANF Fill phase done: all real Scale SD content in place, placeholder icons fixed, better Unsplash images
- Single-page anchor nav: all links point to `#services`, `#about`, `#contact`
- About section added with mission, vision, and brand pillars
- Hero video background contained with `relative overflow-hidden` on section
- `.gitignore` in place — `.next/`, `node_modules/` are excluded

### Design Tokens (do not change without instruction)
- **Background:** `#07080f` (near-black navy)
- **Accent / Primary:** `#6366f1` (indigo-violet)
- **Text:** `#e8e8f2`
- **Muted text:** `#6b7280`
- **Heading font:** `Syne` (loaded via `next/font/google`, variable `--font-heading`)
- **Body font:** `DM Sans` (loaded via `next/font/google`, variable `--font-sans`)
- **Dark mode:** forced globally via `class="dark"` on `<html>` in `app/layout.tsx`
- **Background gradient:** two radial blobs in `app/globals.css` body rule

### File Structure
```
v1/
├── app/
│   ├── globals.css        # All CSS vars, dark palette, custom animations
│   ├── layout.tsx         # Google Fonts, dark class, metadata
│   └── page.tsx           # Homepage — imports all 5 sections in order
├── components/
│   ├── blocks/
│   │   └── hero-section-5.tsx     # Hero + navbar (fixed, z-50, blurred bg)
│   └── ui/
│       ├── button.tsx             # shadcn button (@base-ui/react — no asChild)
│       ├── about-section.tsx      # About section — mission, vision, brand pillars
│       ├── feature-carousel.tsx   # Services section (animated carousel)
│       ├── infinite-slider.tsx    # Used by hero logo row (currently removed)
│       ├── progressive-blur.tsx   # Used by hero logo row (currently removed)
│       ├── stats-section.tsx      # Stats row with count-up animation
│       └── cta-with-text-marquee.tsx  # Contact CTA with vertical marquee
├── lib/
│   └── utils.ts           # cn() helper
└── scalehere_content.md   # All real brand copy — use this for reference
```

### Page Section Order (`app/page.tsx`)
1. `<HeroSection />` — hero + fixed navbar
2. `<section id="services">` — services carousel
3. `<StatsSection />` — animated stats row
4. `<StaggerTestimonials />` — testimonials (staggered card layout, click to browse)
5. `<div id="about">` — about section (mission, vision, pillars)
6. `<div id="contact">` — CTA with vertical marquee

### Anchor Nav
- All nav links and buttons use anchor hrefs: `#services`, `#about`, `#contact`
- "Apply Now" everywhere → `#contact`
- "Learn More" → `#about`

### Important shadcn Note
This project uses a newer shadcn version with `@base-ui/react/button`. The `Button` component does **not** support `asChild`. Use `buttonVariants()` with a `<Link>` instead:
```tsx
import { buttonVariants } from '@/components/ui/button'
<Link href="#contact" className={cn(buttonVariants({ size: "lg" }))}>Apply Now</Link>
```

### Adding New Sections (21st.dev Process)
This is how we add new sections to the site:
1. Claude creates a prompt file in `components/` named `prompt-[section-name].txt` with a header comment and the 21st.dev search URL
2. User browses 21st.dev, picks a component, clicks "Claude Code", and copies the generated prompt
3. User pastes the prompt into the `.txt` file
4. Claude reads the file, integrates the component into the codebase (installs deps, adapts styles, fills real content), then commits

**Existing prompt files:**
- `components/prompt-hero.txt` — hero section (done)
- `components/prompt-services.txt` — services carousel (done)
- `components/prompt-stats.txt` — stats row (done)
- `components/prompt-cta.txt` — contact CTA (done)
- `components/prompt-testimonials.txt` — testimonials section (done)
- _(add new ones here as we go)_

### Known Issues / Next Up
- Anchor scroll offset: when nav links are clicked, the fixed navbar may still slightly overlap the destination section top — not fully resolved
- Carousel images: currently Unsplash placeholders — replace with real Scale SD photos when available
- CTA section: uses `min-h-screen` which makes it full viewport height — intentional for now
