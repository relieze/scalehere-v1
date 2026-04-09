"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Free Strategy Call (15 Minutes)",
    description:
      "We audit your current marketing, identify what's working and what's wasting money, and give you a clear plan — whether you hire us or not.",
    detail: "No pitch. No pressure. Just real insight into your marketing.",
  },
  {
    number: "02",
    title: "We Build Your Growth Engine",
    description:
      "Custom strategy, content, ads, and reporting — all managed by our team. You invest 1 hour per week. We handle the rest.",
    detail: "Month-to-month. No contracts. You own every account and asset from day one.",
  },
  {
    number: "03",
    title: "Watch the Numbers Move",
    description:
      "Real-time reporting focused on revenue, not jargon. Monthly strategy calls. And if we're not delivering — fire us. No questions, no penalties.",
    detail: "We report in customers and revenue. Not clicks and impressions.",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-background border-t border-border/30">
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium text-center">
          The Process
        </p>

        {/* Headline */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground text-lg text-center max-w-xl mx-auto mb-16">
          Simple, transparent, and built around your results.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative flex flex-col gap-5 p-8 rounded-2xl border border-border/40 bg-background"
            >
              {/* Step number */}
              <span className="font-heading text-6xl font-bold text-primary/20 leading-none select-none">
                {step.number}
              </span>

              {/* Connector line (desktop only, between cards) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-border/60 z-10" />
              )}

              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-xl font-bold leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
                <p className="text-primary/80 text-xs font-medium uppercase tracking-wider mt-1">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
