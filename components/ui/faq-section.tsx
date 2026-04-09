"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What if I've been burned by a marketing agency before?",
    answer:
      "Most of our clients have. That's why we work month-to-month, report in revenue (not marketing jargon), and give you full access to every account and asset from day one. If we leave, you keep everything — no hostage situations.",
  },
  {
    question: "How do I know you won't send me reports I don't understand?",
    answer:
      "Our reporting shows three things: how many customers we brought you, how much revenue those customers generated, and what it cost to get them. If it doesn't connect to your bottom line, we don't report it.",
  },
  {
    question: "What if it doesn't work?",
    answer:
      "Two things. First, we'll tell you within 30 days if something isn't working and exactly what we're changing. Second, there's no contract — if you're not seeing value, you can leave anytime. We believe in ourselves enough not to lock you in.",
  },
  {
    question: "I've been doing this myself — why should I pay someone?",
    answer:
      "Because the 10–15 hours per week you're spending on marketing is time you're not spending on your business. Our clients get that time back — and better results than they were getting on their own.",
  },
  {
    question: "Do I own my accounts and content?",
    answer:
      "Yes. Every account, every asset, every piece of content is yours from day one. We never hold access hostage. If you work with us and then leave, you take everything with you.",
  },
  {
    question: "How long before I see results?",
    answer:
      "It depends on the service mix, but most clients see meaningful movement within 60–90 days. We'll set clear expectations during your free strategy call and track progress against agreed goals from week one.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-heading text-base md:text-lg font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
          {question}
        </span>
        <span className="shrink-0 text-primary/70">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-background border-t border-border/30">
      <div className="max-w-3xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium text-center">
          Common Questions
        </p>

        {/* Headline */}
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-center mb-4">
          Honest Answers
        </h2>
        <p className="text-muted-foreground text-lg text-center mb-14">
          The questions every business owner should ask before hiring a marketing agency.
        </p>

        {/* FAQ list */}
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>

      </div>
    </section>
  );
}
