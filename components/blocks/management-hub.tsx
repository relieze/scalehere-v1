/**
 * MANAGEMENT HUB — auto-advancing carousel.
 * Adapted from 21st.dev elegant-carousel. Dark brand, electric blue accent.
 *
 * Expected to be rendered inside a <section> in page.tsx that provides:
 *   - Section padding, width, anchor id
 *   - Outer header (eyebrow + static section h2 + description)
 * This component renders only the carousel body (per-slide tool content + image + progress bar).
 *
 * STYLING: all custom CSS lives in SCOPED_CSS at the top of the return.
 * Tailwind v4 was unreliable for: arbitrary grid templates, some responsive variants,
 * and hover states on touch devices — hence the scoped CSS + targeted inline styles.
 */

'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Data & constants

const ACCENT = '#3B82F6'

interface SlideData {
  title: string
  subtitle: string
  description: string
  imageUrl: string
}

// NOTE: images are placeholders (/public/management_hub/ghl_N.png). Swap in real
// Scale SD dashboard screenshots when available — should be ~2:1 landscape to match the frame.
const slides: SlideData[] = [
  {
    title: 'Dashboard Overview',
    subtitle: 'The command center',
    description:
      'Every number, every lead, every message — one view. Know your business at a glance, no tab-switching, no guesswork.',
    imageUrl: '/management_hub/ghl_1.png',
  },
  {
    title: 'Lead Capture',
    subtitle: 'Never lose a lead',
    description:
      'Inbound leads flow straight into your pipeline — tagged, routed, and ready to work the moment they land.',
    imageUrl: '/management_hub/ghl_2.png',
  },
  {
    title: 'Online Booking',
    subtitle: 'Clients book themselves',
    description:
      'Share one link anywhere. Your calendar fills itself, reminders go out automatically, phone tag disappears.',
    imageUrl: '/management_hub/ghl_3.png',
  },
  {
    title: 'Text Back',
    subtitle: 'Turn missed calls into revenue',
    description:
      'Missed a call? A text fires back automatically to keep the lead warm and the conversation open.',
    imageUrl: '/management_hub/ghl_4.png',
  },
  {
    title: 'Automated Follow-ups',
    subtitle: 'Every lead, every time',
    description:
      'Set-and-forget sequences. Emails, texts, reminders — all running in the background while you focus on the work.',
    imageUrl: '/management_hub/ghl_5.png',
  },
]

const SLIDE_DURATION = 6000
const TRANSITION_DURATION = 800

// ─────────────────────────────────────────────────────────────────────────────
// Consolidated scoped CSS.

const SCOPED_CSS = `
  /* ─── LAYOUT ───────────────────────────────────────────────────────── */

  /* Description min-heights lock the text column so slides with shorter/longer
     copy don't resize the section and make the page above/below jump during
     auto-advance. Values chosen just big enough to fit the longest description
     at each column width — smaller = less dead space below short descriptions. */
  .hub-description { min-height: 78px; } /* mobile: ~3 lines of 16px × 1.625 at narrow widths */
  @media (min-width: 768px)  { .hub-description { min-height: 64px;  } } /* tablet: wide col, 2 lines */
  @media (min-width: 1024px) { .hub-description { min-height: 180px; } } /* desktop: narrow 20% col, 5-6 lines */

  /* 2-col grid on desktop — image LEFT (wide), text RIGHT (narrow).
     minmax(0, Nfr) prevents long content from expanding columns past their ratio. */
  @media (min-width: 1024px) {
    .hub-grid {
      grid-template-columns: minmax(0, 8fr) minmax(0, 2fr) !important;
      gap: 4rem !important;
    }
  }

  /* ─── IMAGE FRAME CORNERS ──────────────────────────────────────────── */

  .hub-corner {
    position: absolute;
    width: 40px;
    height: 40px;
    pointer-events: none;
  }
  .hub-corner-tl { top: -12px; left: -12px;  border-top:    2px solid ${ACCENT}; border-left:  2px solid ${ACCENT}; }
  .hub-corner-br { bottom: -12px; right: -12px; border-bottom: 2px solid ${ACCENT}; border-right: 2px solid ${ACCENT}; }

  /* ─── PROGRESS BAR ─────────────────────────────────────────────────── */

  .hub-progress-track {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .hub-progress-fill {
    height: 100%;
    background: ${ACCENT};
  }

  /* Labels: number under 1280px (where word labels wrap), word title at ≥1280px */
  .hub-label-num  { display: inline-block; }
  .hub-label-word { display: none; }
  @media (min-width: 1280px) {
    .hub-label-num  { display: none; }
    .hub-label-word { display: inline-block; }
  }

  /* ─── ARROW BUTTONS — inversion on hover/active ────────────────────── */

  .hub-arrow-btn {
    transition: all 300ms ease;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: transparent;
    color: rgba(255, 255, 255, 0.75);
  }
  /* Hover-capable devices only — on touch, :hover sticks after tap. */
  @media (hover: hover) and (pointer: fine) {
    .hub-arrow-btn:hover {
      background: #ffffff;
      border-color: #ffffff;
      color: #000000;
    }
  }
  /* Touch: flash inversion while pressed. */
  .hub-arrow-btn:active {
    background: #ffffff;
    border-color: #ffffff;
    color: #000000;
  }

  .hub-arrow-icon { width: 20px; height: 20px; }

  /* ─── IMAGE WRAPPER ────────────────────────────────────────────────── */

  /* perspective on the wrapper establishes the 3D context; tilt div carries
     the rotation. Chrome corners (siblings of .hub-image-tilt) stay flat —
     they frame the tilted screenshot rather than tilt with it.
     Values dialed in /sandbox/image-tilt — paste export to update. */
  .hub-image-wrapper { aspect-ratio: 2 / 1; position: relative; perspective: 1500px; }

  /* 3D tilt — left edge forward, right edge recedes (left sidebar closer to viewer).
     rotateX positive = top recedes, bottom forward — tablet leaning back on a stand.
     Image faces right-front toward the text column for "pointing at" effect.
     scale compensates for the foreshortening bulge so the tilted bounds fit
     inside the chrome corner frame.

     translate serves two purposes stacked:
       1. aesthetic (all viewports): counter the foreshortening left-bias — the
          rotated plane's near edge projects larger, shifting visual weight left,
          so a small right-ward translate rebalances.
       2. layout (desktop only): nudge the image toward the adjacent right-hand
          text column for "pointing at the copy" read.
     Mobile/tablet gets only purpose 1 (smaller value); desktop adds purpose 2 on top.
     % units keep the shift proportional across all widths — same visual offset
     regardless of image size. */
  .hub-image-tilt {
    width: 100%;
    height: 100%;
    transform: translate(2%, -2%) rotateY(27deg) rotateX(15deg) rotateZ(0deg) scale(0.88);
    transform-origin: center center;
    will-change: transform;
  }
  @media (min-width: 1024px) {
    .hub-image-tilt {
      transform: translate(4%, -3%) rotateY(27deg) rotateX(15deg) rotateZ(0deg) scale(0.88);
    }
  }

  .hub-image-frame {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    /* Strong shadow stack (lab shadow-strength: 5) — sells depth + separates the
       tilted plane firmly from the page. Alphas at 1.00 (valid-CSS capped);
       blur+offset+spread scaled 2.2× vs. the 1.0x baseline. */
    box-shadow:
      0 110px 176px -44px rgba(0, 0, 0, 1.00),
      0 55px 88px -33px rgba(0, 0, 0, 1.00),
      0 22px 55px -22px rgba(59, 130, 246, 1.00);
  }

  /* ─── BACKGROUND WASH ──────────────────────────────────────────────── */

  .hub-bg-wash {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(ellipse at 70% 50%, ${ACCENT}20 0%, transparent 70%);
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// Component

export function ManagementHub() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  // Click-pause: clicking anywhere in the content area pauses auto-advance for SLIDE_DURATION
  // ms, then resumes regardless of hover state. Gives users a beat to read after interacting.
  const [isClickPaused, setIsClickPaused] = useState(false)
  const clickPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const triggerClickPause = useCallback(() => {
    setIsClickPaused(true)
    // Also clear hover-pause — without this, after the 6s timer fires progress would
    // stay frozen because the mouse is still over the section (isPaused still true).
    setIsPaused(false)
    if (clickPauseTimerRef.current) clearTimeout(clickPauseTimerRef.current)
    clickPauseTimerRef.current = setTimeout(() => setIsClickPaused(false), SLIDE_DURATION)
  }, [])

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      // Progress reset happens at currentIndex flip (mid-transition), so the outgoing
      // slide stays at 100% blue through the fade.
      setTimeout(() => {
        setProgress(0)
        setCurrentIndex(index)
        setTimeout(() => setIsTransitioning(false), 50)
      }, TRANSITION_DURATION / 2)
    },
    [isTransitioning, currentIndex],
  )

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length)
  }, [currentIndex, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length)
  }, [currentIndex, goToSlide])

  // Progress bar timer. Hitting 100 triggers goNext via the effect below.
  useEffect(() => {
    if (isPaused || isTransitioning || isClickPaused) return
    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (SLIDE_DURATION / 50)
        return next >= 100 ? 100 : next
      })
    }, 50)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [currentIndex, isPaused, isTransitioning, isClickPaused])

  useEffect(() => {
    if (progress >= 100 && !isTransitioning && !isPaused && !isClickPaused) goNext()
  }, [progress, isTransitioning, isPaused, isClickPaused, goNext])

  // Touch handlers — initialize both refs to the same position so a tap (no touchmove)
  // produces diff = 0 and doesn't fire a swipe.
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current   = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 60) (diff > 0 ? goNext : goPrev)()
  }

  const currentSlide = slides[currentIndex]
  const isOut = isTransitioning
  const textTransition: React.CSSProperties = {
    transitionDuration: `${TRANSITION_DURATION / 2}ms`,
    transitionProperty: 'opacity, transform',
    opacity: isOut ? 0 : 1,
    transform: isOut ? 'translateY(8px)' : 'translateY(0)',
  }
  const imageTransition: React.CSSProperties = {
    transitionDuration: `${TRANSITION_DURATION / 2}ms`,
    transitionProperty: 'opacity, transform',
    opacity: isOut ? 0 : 1,
    transform: isOut ? 'translateY(8px) scale(0.99)' : 'translateY(0) scale(1)',
  }

  return (
    <div
      className="relative text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{SCOPED_CSS}</style>
      <div className="hub-bg-wash" aria-hidden />

      <div
        className="relative mx-auto max-w-7xl px-6 md:px-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={triggerClickPause}
      >
        {/* GRID — image column (LEFT, wide 8fr) | text column (RIGHT, narrow 2fr) on desktop.
            On mobile the grid collapses to 1 col; source order puts image on top, text below. */}
        <div className="hub-grid grid grid-cols-1 gap-10 items-stretch">
          {/* Image column — source-first: desktop LEFT, mobile TOP. lg:self-start
              prevents the grid (items-stretch default) from stretching this cell to the
              text column's height, which combined with aspect-ratio: 2/1 would derive
              width from the stretched height and overflow the column at 1024-1280px. */}
          <div className="hub-image-wrapper lg:self-start">
            <div className="hub-image-tilt">
              <div className="hub-image-frame transition-all ease-out" style={imageTransition}>
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="hub-corner hub-corner-tl" />
            <div className="hub-corner hub-corner-br" />
          </div>

          {/* Text column — source-second: desktop RIGHT, mobile BOTTOM. */}
          <div style={{ height: '100%' }}>
            <div
              className="transition-all ease-out flex flex-col"
              style={{ ...textTransition, height: '100%' }}
            >
              {/* Top chunk: slide number + per-slide title + subtitle + description */}
              <div>
                <div className="mb-6 text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                  — {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>

                {/* Per-slide tool title — demoted to h3, acts as subtitle to the section heading above */}
                <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mb-2 text-white">
                  {currentSlide.title}
                </h3>

                {/* Per-slide tagline — italic pull-quote in electric blue */}
                <p className="italic text-base md:text-lg mb-5" style={{ color: ACCENT }}>
                  {currentSlide.subtitle}
                </p>

                <p className="hub-description text-base md:text-lg font-normal leading-relaxed text-white/70">
                  {currentSlide.description}
                </p>
              </div>

              {/* Arrows — pinned to the bottom of the text column (when stretched to row height on desktop).
                  Inline styles because Tailwind v4 was dropping mt-auto / h-full. */}
              <div
                className="flex items-center gap-3"
                style={{ marginTop: 'auto', paddingTop: 40 }}
              >
                <button
                  onClick={() => { triggerClickPause(); goPrev() }}
                  aria-label="Previous slide"
                  className="hub-arrow-btn h-14 w-14 rounded-full flex items-center justify-center"
                >
                  <svg className="hub-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => { triggerClickPause(); goNext() }}
                  aria-label="Next slide"
                  className="hub-arrow-btn h-14 w-14 rounded-full flex items-center justify-center"
                >
                  <svg className="hub-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-8 md:mt-10 flex gap-3 md:gap-4">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex
            const fillWidth = isActive ? `${progress}%` : index < currentIndex ? '100%' : '0%'
            const labelColor = isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
            return (
              <button
                key={index}
                onClick={() => { triggerClickPause(); goToSlide(index) }}
                className="flex-1 text-left group"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className="hub-progress-track">
                  <div
                    className="hub-progress-fill"
                    style={{
                      width: fillWidth,
                      transition: isActive ? 'width 50ms linear' : 'width 300ms ease',
                    }}
                  />
                </div>
                <span className={`hub-label-num text-xs font-mono tracking-[0.25em] transition-colors ${labelColor}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`hub-label-word text-xs font-medium tracking-[0.2em] uppercase transition-colors ${labelColor}`}>
                  {slide.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
