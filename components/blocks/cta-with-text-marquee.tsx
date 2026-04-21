"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useContactDialog } from "@/lib/contact-dialog-context";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(
        containerRef.current.querySelectorAll(".marquee-item")
      ) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      {/* Single animated wrapper with both copies — -50% lands exactly at the duplicate,
          making the reset invisible and the loop seamless */}
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex flex-col">{children}</div>
        <div className="flex flex-col" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

// Types of businesses Scale SD serves
const marqueeItems = [
  "Local Businesses",
  "E-commerce Brands",
  "Restaurants & Food",
  "Real Estate Agents",
  "Service Providers",
  "Startups & Founders",
];

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Dialog state from context — shared with navbar
  const { open: dialogOpen, openDialog, closeDialog } = useContactDialog();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  }, []);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll(".marquee-item");
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    let frameId: number;
    const loop = () => {
      updateOpacity();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  // Shared input class — glass panel language consistent with site
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-white/30 focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/40 transition-colors duration-200";

  return (
    <div className="min-h-screen text-foreground flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="w-full max-w-7xl animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground text-center lg:text-left animate-fade-in-up [animation-delay:200ms]">
              Ready to Stop Guessing and Start Growing?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center lg:text-left animate-fade-in-up [animation-delay:400ms]">
              Get a free marketing audit for your business. We'll show you exactly where your marketing dollars are going — and where they should be. Month-to-month. No contracts. You own everything.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up [animation-delay:600ms]">
              <button
                onClick={() => { resetForm(); openDialog(); }}
                className="group relative cursor-pointer px-6 py-3 btn-chrome rounded-md font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">GET MY FREE AUDIT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
              <a
                href="tel:7604437876"
                className="group relative cursor-pointer px-6 py-3 btn-chrome rounded-md font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10">CALL 760-443-7876</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </a>
            </div>
          </div>

          {/* Right Marquee — hidden on mobile, visible lg+ */}
          <div
            ref={marqueeRef}
            className="hidden lg:flex relative h-[600px] lg:h-[700px] items-center justify-center animate-fade-in-up [animation-delay:400ms]"
          >
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight py-8 marquee-item"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

            </div>
          </div>
        </div>
      </div>

      {/* Contact form dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { closeDialog(); resetForm(); } }}>
        <DialogContent className="bg-zinc-950 border border-white/10 text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-bold">Get Your Free Audit</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Tell us about your business — we'll be in touch within one business day.
            </DialogDescription>
          </DialogHeader>

          {status === "success" ? (
            <p className="text-sm text-primary font-medium py-4">
              Thank you — we'll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 mt-2">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />

              <textarea
                placeholder="Message *"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(inputClass, "resize-none")}
              />

              {status === "error" && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full cursor-pointer px-6 py-3 btn-chrome rounded-md font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status === "loading" ? "Sending…" : "SEND MESSAGE"}
                </span>
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
