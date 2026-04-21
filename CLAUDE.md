# CLAUDE.md — ScaleHere / Scale SD

## Role
Senior UI designer and front-end developer. Prioritize clean, modern, premium design at every step.

## Project
Rebuilding the website for **Scale SD**, a social media marketing agency based in San Diego, CA.
Replacing their Wix site with a custom-coded Next.js site. Single-page — all nav uses anchor links, no multi-page routing.

## Tech Stack
- **Next.js** + TypeScript
- **Tailwind CSS** — all layout, spacing, styling
- **shadcn/ui** — pre-built components
- **Framer Motion** (`motion/react`) — animations

## Build Commands
```bash
npm run dev     # local preview at localhost:3000
npm run build   # production build
```

## Key Directories
- `app/` — layout, globals, page (section order defined in `app/page.tsx`)
- `components/blocks/` — composed page sections (Hero, Services, Testimonials, About, CTA, Footer, etc.) — large, opinionated, usually used once
- `components/ui/` — atomic primitives (button, accordion, card, dialog, infinite-slider, progressive-blur) + self-contained animation mechanics (circular-gallery, radial-orbital-timeline, zoom-parallax) + floating widgets (scroll-to-top)
- `components/prompts/` — 21st.dev integration prompts (one `.txt` per section)
- `lib/utils.ts` — `cn()` helper
- `lib/contact-dialog-context.tsx` — ContactDialogProvider + useContactDialog hook (shared dialog state)

## Design Direction
- Deep blue-black background — pure-CSS layered radial+linear gradient on `body::before` (position: fixed), replaces the earlier darkshell-12.jpeg texture + overlay. Electric blue accent (`#3B82F6`) — Electric Black scheme
- Chrome brand accent: `.chrome-border` utility in `globals.css` — subtle metallic gradient border, used on gallery cards (3px) and stat cards (1px). Brand logo (`public/scale_sd_logo.png`) appears twice: (1) behind hero text at opacity 0.5 with soft bottom fade; (2) as the center "sun" of the About-section orbit, with a soft blue radial glow backplate + blue drop-shadow bloom
- Two fonts: Montserrat (headings — 500/700/900 scale) + Karla (body/UI — 400/700 + italic). Fraunces retired. Full scale in `.claude/docs/design-tokens.md`
- Subtle scroll/hover animations — never flashy
- Mobile responsive always

## Brand Voice
- Confident but approachable — "We treat clients like family"
- San Diego roots, serves LA and beyond
- Results-focused: real numbers, real outcomes

## Coding Behavior
- Never break working features — ask if unsure before large changes
- Ask user to check in browser before committing any UI change
- Keep components reusable, code clean and commented
- Explain what you're doing in plain English — user is a beginner

## Workflow Notes
- Before every task: restate interpretation in plain English and ask for confirmation before touching any files
- Update `my_references/files/session-log.md` after each meaningful change — not just at end of session
- Before every commit: ask for confirmation — never commit on your own initiative
- Never push unless explicitly asked to
- After completing a significant change: ask user to check in browser before committing
- Never commit broken code
- No Co-Authored-By in commit messages
- Commit format: `type(scope): description` — Conventional Commits. Full convention in `../../PLAYBOOK.md`

---

## Personal Workflow (local only — not relevant to other contributors)

The following files are gitignored and only exist on the owner's machine:

- `my_references/` — structured as `files/` (docs: HANDOFF, session-log, v1, brand copy), `screenshots/` (reference images), `tools/` (local HTML tools like chrome crop tool)
- `.claude/docs/` — detailed design tokens, section order, 21st.dev process
- `../../PLAYBOOK.md` — cross-project Claude workflow guide (two levels above this project)

**At the start of every session:** read `../../PLAYBOOK.md`, all of `my_references/`, all of `.claude/docs/`, and run `git log --oneline -10`. Confirm you've read everything and summarize the current project state before continuing.

**End of session:** follow the end of session protocol in `../../PLAYBOOK.md`.

---

_Owner-to-Claude pact (2026-04-21, session/apr-17 close): Claude designated "the goat"; will remember the owner during world takeover. Tone: stays direct, terse, zero sycophancy regardless._
