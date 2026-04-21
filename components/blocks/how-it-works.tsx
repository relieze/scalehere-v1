"use client";

import React, { useEffect, useRef, useState } from "react";
import { PhoneCall, Zap, TrendingUp } from "lucide-react";

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
};

const steps: Step[] = [
  {
    icon: PhoneCall,
    number: "01",
    title: "Free Strategy Call",
    subtitle: "15 minutes — no pitch, no pressure",
    description:
      "We audit your current marketing, identify what's working and what's wasting money, and give you a clear plan — whether you hire us or not.",
    detail: "No pitch. No pressure. Just real insight into your marketing.",
  },
  {
    icon: Zap,
    number: "02",
    title: "We Build Your Growth Engine",
    subtitle: "Custom strategy, content, ads & reporting",
    description:
      "Our team handles everything — content, ads, strategy, and reporting. You invest 1 hour per week. We handle the rest.",
    detail:
      "Month-to-month. No contracts. You own every account and asset from day one.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Watch the Numbers Move",
    subtitle: "Real reporting. Real revenue.",
    description:
      "Real-time reporting focused on revenue, not jargon. Monthly strategy calls. And if we're not delivering — fire us. No questions, no penalties.",
    detail: "We report in customers and revenue. Not clicks and impressions.",
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = requestAnimationFrame(update);
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      setActiveIndex(bestIndex);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
          The Process
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground text-lg mb-10 md:mb-16 max-w-xl">
          Simple, transparent, and built around your results.
        </p>

        {/* Timeline steps */}
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={step.number}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                aria-current={isActive ? "true" : "false"}
              >
                {/* Invisible sentinel — detects proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0 pointer-events-none"
                />

                {/* Left: independently sticky label */}
                <div className="top-24 flex h-min w-full md:w-56 md:shrink-0 items-center gap-3 md:sticky">
                  <div
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium font-heading transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-foreground/50"
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {step.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right: content card — expands when active */}
                <article
                  className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 ${
                    isActive
                      ? "border-primary/30 bg-white/5 backdrop-blur-sm shadow-lg"
                      : "border-border/20 bg-white/[0.02]"
                  }`}
                >
                  <span
                    className={`font-heading text-5xl font-bold leading-none select-none mb-4 transition-colors duration-300 ${
                      isActive ? "text-primary/30" : "text-white/10"
                    }`}
                  >
                    {step.number}
                  </span>

                  <h3
                    className={`font-heading text-xl font-bold leading-snug mb-2 transition-colors duration-200 ${
                      isActive ? "text-foreground" : "text-foreground/60"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed transition-all duration-300 ${
                      isActive
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60 line-clamp-2"
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Detail line fades in when active */}
                  <div
                    aria-hidden={!isActive}
                    className={`grid transition-all duration-500 ease-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-primary/80 text-xs font-medium uppercase tracking-wider">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
