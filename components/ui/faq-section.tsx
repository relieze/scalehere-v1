"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "What if I've been burned by a marketing agency before?",
    answer:
      "Most of our clients have. That's why we work month-to-month, report in revenue (not marketing jargon), and give you full access to every account and asset from day one. If we leave, you keep everything — no hostage situations.",
  },
  {
    id: "item-2",
    question: "How do I know you won't send me reports I don't understand?",
    answer:
      "Our reporting shows three things: how many customers we brought you, how much revenue those customers generated, and what it cost to get them. If it doesn't connect to your bottom line, we don't report it.",
  },
  {
    id: "item-3",
    question: "What if it doesn't work?",
    answer:
      "Two things. First, we'll tell you within 30 days if something isn't working and exactly what we're changing. Second, there's no contract — if you're not seeing value, you can leave anytime. We believe in ourselves enough not to lock you in.",
  },
  {
    id: "item-4",
    question: "I've been doing this myself — why should I pay someone?",
    answer:
      "Because the 10–15 hours per week you're spending on marketing is time you're not spending on your business. Our clients get that time back — and better results than they were getting on their own.",
  },
  {
    id: "item-5",
    question: "Do I own my accounts and content?",
    answer:
      "Yes. Every account, every asset, every piece of content is yours from day one. We never hold access hostage. If you work with us and then leave, you take everything with you.",
  },
  {
    id: "item-6",
    question: "How long before I see results?",
    answer:
      "It depends on the service mix, but most clients see meaningful movement within 60–90 days. We'll set clear expectations during your free strategy call and track progress against agreed goals from week one.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-background border-t border-border/30">
      <div className="mx-auto w-full max-w-3xl space-y-7">

        {/* Header */}
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 font-medium">
            Common Questions
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Honest Answers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The questions every business owner should ask before hiring a marketing agency.
          </p>
        </div>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="bg-card/50 w-full -space-y-px rounded-lg border border-border/40"
          defaultValue="item-1"
        >
          {faqs.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="relative border-x border-border/40 first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b px-4"
            >
              <AccordionTrigger className="py-5 text-[15px] font-heading font-semibold leading-snug hover:no-underline hover:text-primary transition-colors duration-200 text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer CTA */}
        <p className="text-muted-foreground text-center text-sm">
          Still have questions?{" "}
          <a href="#contact" className="text-primary hover:underline font-medium">
            Book a free strategy call
          </a>{" "}
          and we'll walk you through it.
        </p>

      </div>
    </section>
  );
}
