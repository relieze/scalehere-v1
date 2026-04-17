import { HeroSection } from "@/components/blocks/hero-section-5";
import { SoundFamiliar } from "@/components/ui/sound-familiar";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import { HowItWorks } from "@/components/ui/how-it-works";
import { CaseStudiesSection } from "@/components/ui/case-studies-section";
import { PortfolioAccordion } from "@/components/ui/portfolio-accordion";
import { AboutSection } from "@/components/ui/about-section";
import TeamShowcase from "@/components/ui/team-showcase";
import { FAQSection } from "@/components/ui/faq-section";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Sound Familiar (pain/problem) ────── */}
      <SoundFamiliar />

      {/* ── Section 3: Services ─────────────────────────── */}
      <section id="services" className="w-full pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-7xl mx-auto mb-10 md:mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Your Full Marketing Team — For 1 Hour of Your Time Per Week
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We handle everything — content, ads, strategy, and reporting — so you can focus on running your business.
          </p>
        </div>
        <FeatureCarousel />
      </section>

      {/* ── Section 4: Testimonials ─────────────────────── */}
      {/* Moved before How It Works — social proof lands hardest right after */}
      {/* Services sells them on what we do; real client voices lock it in   */}
      {/* before they read the process detail.                               */}
      <section className="w-full pt-16 md:pt-24 lg:pt-32 pb-4 px-4">
        <div className="max-w-7xl mx-auto mb-10 md:mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            Client Love
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What Our Clients Are Saying
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Real results from real San Diego businesses.
          </p>
        </div>
        <TestimonialsSection />
      </section>

      {/* ── Section 5: How It Works ──────────────────────── */}
      <HowItWorks />

      {/* ── Section 6: Case Studies ─────────────────────── */}
      <CaseStudiesSection />

      {/* ── Section 7: Portfolio (detailed case studies) ── */}
      <section id="portfolio" className="w-full pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-5xl mx-auto mb-10 md:mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            Client Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Results We've Delivered
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Click any client to see the full story — services, strategy, and real numbers.
          </p>
        </div>
        <PortfolioAccordion />
      </section>

      {/* ── Section 8: About ────────────────────────────── */}
      <div id="about">
        <AboutSection />
      </div>

      {/* ── Section 9: Team ─────────────────────────────── */}
      <section className="w-full pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-7xl mx-auto mb-10 md:mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            The People
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Meet the Team
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A tight-knit crew of creatives, strategists, and marketers who treat every client like family.
          </p>
        </div>
        <TeamShowcase />
      </section>

      {/* ── Section 10: FAQ ─────────────────────────────── */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* ── Section 11: Contact CTA ─────────────────────── */}
      <div id="contact">
        <CTAWithVerticalMarquee />
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <StickyFooter />

      {/* ── Scroll to top ───────────────────────────────── */}
      <ScrollToTop />

    </div>
  );
}
