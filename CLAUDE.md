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
- `components/blocks/` — hero + navbar
- `components/ui/` — all section components
- `components/prompt-*.txt` — 21st.dev integration prompts (one per section)
- `lib/utils.ts` — `cn()` helper

## Design Direction
- True black background (`#000000`) + texture image (`public/Darkshell-12.jpeg`) + `body::before` rgba(0,0,0,0.55) overlay to dim it, electric blue accent (`#3B82F6`) — Electric Black scheme
- Chrome brand accent: `.chrome-border` utility in `globals.css` — subtle metallic gradient border, used on gallery cards (3px) and stat cards (1px)
- Three fonts: Syne (headings) + Plus Jakarta Sans (body) + Fraunces (accent/pull quotes)
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
- Before every commit: ask for confirmation — never commit on your own initiative
- Never push unless explicitly asked to
- After completing a significant change: ask user to check in browser before committing
- Never commit broken code
- No Co-Authored-By in commit messages
- Commit format: `type(scope): description` — Conventional Commits. Full convention in `../../PLAYBOOK.md`

---

## Personal Workflow (local only — not relevant to other contributors)

The following files are gitignored and only exist on the owner's machine:

- `my_references/` — task tracker, build summary, brand copy, screenshots
- `.claude/docs/` — detailed design tokens, section order, 21st.dev process
- `../../PLAYBOOK.md` — cross-project Claude workflow guide (two levels above this project)

**At the start of every session:** read `../../PLAYBOOK.md`, all of `my_references/`, all of `.claude/docs/`, and run `git log --oneline -10`. Confirm you've read everything and summarize the current project state before continuing.

**End of session:** follow the end of session protocol in `../../PLAYBOOK.md`.
