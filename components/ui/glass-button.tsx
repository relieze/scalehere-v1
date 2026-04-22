'use client'

/**
 * GlassButton — V11 glass treatment converged from the sandbox.
 *
 * Translucent pill with animated conic ring + 3D tilt on press + outer shadow
 * pulse + inner conic sheen + stacked text halo for legibility over the Scale
 * SD logo foil. Visual layers live in globals.css under .btn-glass-*; this
 * component wires up the multi-element HTML structure required to drive the
 * CSS animations (wrap + button/link + text + shadow — all four are needed).
 *
 * Size covers all 4 live-site contexts (hero/nav/cta/send). Each size swaps
 * foil crop + text padding/font-size to match the live-site button exactly —
 * see .btn-glass--<size> rules in globals.css.
 *
 * Rendering:
 *   - href (http://, mailto:, tel:, sms:)  →  plain <a>  (Next Link routes
 *     those internally, which breaks tel:/mailto:)
 *   - href (anything else, typically '#anchor') →  Next <Link>
 *   - no href  →  <button> with optional disabled state
 *
 * Props are a discriminated union so mixing href + onClick<ButtonEvent> is a
 * type error at the call site.
 */

import Link from 'next/link'
import { cn } from '@/lib/utils'

export type GlassButtonSize = 'hero' | 'nav' | 'cta' | 'send'

interface GlassButtonBaseProps {
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  /** Hero (default) = big pill for hero section. Nav/cta/send match their
   *  respective live-site button sizing + foil crop. */
  size?: GlassButtonSize
  /** Stretches the pill (and text) to fill the container width. Used for the
   *  dialog Send submit which spans the form. */
  fullWidth?: boolean
}

interface GlassButtonLinkProps extends GlassButtonBaseProps {
  href: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  type?: never
  disabled?: never
}

interface GlassButtonButtonProps extends GlassButtonBaseProps {
  href?: never
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

type GlassButtonProps = GlassButtonLinkProps | GlassButtonButtonProps

const EXTERNAL_HREF = /^(https?:|mailto:|tel:|sms:)/i

export function GlassButton(props: GlassButtonProps) {
  const {
    children,
    className,
    'aria-label': ariaLabel,
    size = 'hero',
    fullWidth,
  } = props

  const wrapClass = cn(
    'btn-glass-wrap',
    size !== 'hero' && `btn-glass--${size}`,
    fullWidth && 'btn-glass--full',
    className,
  )

  const inner = (
    <>
      <div className="btn-glass-bg">
        <div className="btn-glass-foil" aria-hidden />
      </div>
      <span className="btn-glass-text">{children}</span>
    </>
  )

  let trigger: React.ReactNode
  if ('href' in props && props.href) {
    if (EXTERNAL_HREF.test(props.href)) {
      // tel:/mailto:/http(s) — plain anchor, Next Link doesn't route these.
      trigger = (
        <a
          href={props.href}
          onClick={props.onClick}
          className="btn-glass"
          aria-label={ariaLabel}
        >
          {inner}
        </a>
      )
    } else {
      trigger = (
        <Link
          href={props.href}
          onClick={props.onClick}
          className="btn-glass"
          aria-label={ariaLabel}
        >
          {inner}
        </Link>
      )
    }
  } else {
    // Narrow to Button props explicitly — the outer `'href' in props && props.href`
    // check leaves a compound false branch that TS can't narrow on its own, so
    // props.onClick stays as the union of anchor + button handlers. Safe assertion:
    // href was falsy, so GlassButtonLinkProps (href: string required) is excluded.
    const { onClick, type, disabled } = props as GlassButtonButtonProps
    trigger = (
      <button
        type={type ?? 'button'}
        onClick={onClick}
        disabled={disabled}
        className="btn-glass"
        aria-label={ariaLabel}
      >
        {inner}
      </button>
    )
  }

  return (
    <div className={wrapClass}>
      {trigger}
      <div className="btn-glass-shadow" aria-hidden />
    </div>
  )
}
