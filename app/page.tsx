import { HeroSection } from "@/components/blocks/hero-section-5";
import { SoundFamiliar } from "@/components/ui/sound-familiar";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { HowItWorks } from "@/components/ui/how-it-works";
import { StatsSection } from "@/components/ui/stats-section";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { CaseStudiesSection } from "@/components/ui/case-studies-section";
import { PortfolioAccordion } from "@/components/ui/portfolio-accordion";
import { AboutSection } from "@/components/ui/about-section";
import TeamShowcase from "@/components/ui/team-showcase";
import { FAQSection } from "@/components/ui/faq-section";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";
import { StickyFooter } from "@/components/ui/sticky-footer";
import { ClientLogosSection } from "@/components/ui/logo-cloud";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Sound Familiar (pain/problem) ────── */}
      <SoundFamiliar />

      {/* ── Section 3: Services ─────────────────────────── */}
      <section id="services" className="w-full pt-24 md:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-7xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            What We Do
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Your Full Marketing Team — For 1 Hour of Your Time Per Week
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We handle everything — content, ads, strategy, and reporting — so you can focus on running your business.
          </p>
        </div>
        <FeatureCarousel />
      </section>

      {/* ── Section 4: How It Works ──────────────────────── */}
      <HowItWorks />

      {/* ── Section 5: Stats ────────────────────────────── */}
      <StatsSection />

      {/* ── Section 5b: Platform Logos ──────────────────── */}
      <ClientLogosSection />

      {/* ── Section 6: Testimonials ─────────────────────── */}
      <section className="w-full pt-24 md:pt-32 pb-4 px-4">
        <div className="max-w-7xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            Client Love
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            What Our Clients Are Saying
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Real results from real businesses. Click the cards to browse through our client stories.
          </p>
        </div>
        <StaggerTestimonials />
      </section>

      {/* ── Section 7: Case Studies ─────────────────────── */}
      <CaseStudiesSection />

      {/* ── Section 8: Portfolio (detailed case studies) ── */}
      <section className="w-full pt-24 md:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-5xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            Client Work
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Results We've Delivered
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Click any client to see the full story — services, strategy, and real numbers.
          </p>
        </div>
        <PortfolioAccordion />
      </section>

      {/* ── Section 9: About ────────────────────────────── */}
      <div id="about">
        <AboutSection />
      </div>

      {/* ── Section 10: Team ────────────────────────────── */}
      <section className="w-full pt-24 md:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-7xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            The People
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Meet the Team
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A tight-knit crew of creatives, strategists, and marketers who treat every client like family.
          </p>
        </div>
        <TeamShowcase />
      </section>

      {/* ── Section 11: FAQ ─────────────────────────────── */}
      <FAQSection />

      {/* ── Section 12: Contact CTA ─────────────────────── */}
      <div id="contact">
        <CTAWithVerticalMarquee />
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <StickyFooter />

    </div>
  );
}
