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
- `my_references/` — gitignored personal docs (see below)
- `.claude/docs/` — detailed reference docs for Claude (gitignored)

## General Playbook
`../PLAYBOOK.md` — one level up, outside this project. Contains startup checklist, CLAUDE.md structure rules, ANF process, session habits, and cross-project lessons learned. Read it when starting fresh or if something feels unclear about how we work.

## Reference Files — Read When Relevant
- `my_references/current.md` — active task tracker. **Update as work is completed.**
- `my_references/tips.md` — hard-learned lessons. **Add to when something is worth remembering.**
- `my_references/v1.md` — build summary. Update at end of session.
- `my_references/scalehere_content.md` — all real Scale SD brand copy. Use for all content.
- `.claude/docs/sections.md` — full page section order, anchor nav, shadcn note
- `.claude/docs/design-tokens.md` — colors, fonts, dark mode — do not change without instruction
- `.claude/docs/process.md` — 21st.dev workflow and prompt file status

## Design Direction
- Dark near-black background (`#07080f`), indigo accent (`#6366f1`)
- Radial gradient blobs for depth — no flat backgrounds
- Two fonts: Syne (headings) + DM Sans (body)
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
- After completing a significant change: ask user to check, then commit with a descriptive message
- Never commit broken code
- Update `my_references/current.md` task tracker as work is done
- Screenshots for UI fixes go in `my_references/screenshots/` — check there before asking user to describe a problem
- **End of every session:** review `../PLAYBOOK.md` and update Lessons Learned if anything new was discovered. Then update `my_references/current.md` and `my_references/v1.md`, then commit.
