"use client";

import { motion } from "motion/react";

const pains = [
  {
    quote: "More excuses than results.",
    detail: "Big promises up front, then 'we need more time, more budget' every month.",
  },
  {
    quote: "I spent thousands and got nothing.",
    detail: "Reports full of clicks and impressions — but the phone never rang any more than before.",
  },
  {
    quote: "They disappeared once they had my money.",
    detail: "Emails ignored. Account reps gone. Basic communication became a luxury.",
  },
  {
    quote: "Cookie-cutter campaigns, copy-pasted.",
    detail: "No strategy built around your business. Just a generic formula recycled from a dozen other clients.",
  },
];

export function SoundFamiliar() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-background border-t border-border/30">
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium text-center">
          Sound Familiar?
        </p>

        {/* Headline */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-center max-w-3xl mx-auto mb-6">
          Most Agencies Fail Their Clients. Here's How It Usually Goes.
        </h2>

        {/* Narrative paragraph */}
        <p className="text-muted-foreground text-lg leading-relaxed text-center max-w-2xl mx-auto mb-16">
          You've tried marketing before. They promised the world, sent reports full of jargon,
          and disappeared when you had questions. Meanwhile, your phone didn't ring any more
          than it did before. Or maybe you've been doing it all yourself — posting at midnight,
          running ads you're not sure are working.{" "}
          <span className="text-foreground font-medium">There's a better way.</span>
        </p>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/30">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10 flex flex-col gap-3"
            >
              <span className="text-primary font-heading text-lg font-semibold leading-snug">
                &ldquo;{pain.quote}&rdquo;
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pain.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom pivot */}
        <p className="text-center text-muted-foreground text-base mt-12 max-w-xl mx-auto">
          Every single one of our clients came to us after a bad experience somewhere else.{" "}
          <span className="text-foreground font-medium">
            That's why we built Scale SD differently — starting with accountability.
          </span>
        </p>

      </div>
    </section>
  );
}
