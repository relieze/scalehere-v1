import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MouseEvent } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Force-scrolls to a hash target on every click — default <a href="#x"> is a no-op when the URL hash already matches.
// Non-hash protocols (mailto:, tel:, http:) fall through untouched. Bare "#" scrolls to top.
export function smoothScrollToHash(e: MouseEvent, hash: string) {
  if (!hash.startsWith("#")) return;
  e.preventDefault();
  if (hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
}
