import { HeroSection } from "@/components/blocks/hero-section-5";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { StatsSection } from "@/components/ui/stats-section";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { CaseStudiesSection } from "@/components/ui/case-studies-section";
import { PortfolioAccordion } from "@/components/ui/portfolio-accordion";
import { PortfolioVisual } from "@/components/ui/portfolio-visual";
import { AboutSection } from "@/components/ui/about-section";
import TeamShowcase from "@/components/ui/team-showcase";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Services ─────────────────────────── */}
      <section id="services" className="w-full pt-24 md:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-7xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            What We Do
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Transform Your Business With Our Services
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            From social media to paid ads — we handle all your marketing so you
            can focus on running your business.
          </p>
        </div>
        <FeatureCarousel />
      </section>

      {/* ── Section 3: Stats ────────────────────────────── */}
      <StatsSection />

      {/* ── Section 4: Testimonials ─────────────────────── */}
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

      {/* ── Section 5: Case Studies ─────────────────────── */}
      <CaseStudiesSection />

      {/* ── Section 6: Portfolio (detailed case studies) ── */}
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

      {/* ── Section 6b: Portfolio Visual (TEMP — compare with above) ── */}
      <section className="w-full pt-24 md:pt-32 pb-20 md:pb-28 px-4">
        <div className="max-w-5xl mx-auto mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            Client Work (Style B)
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
            Results We've Delivered
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Click any client to expand their story.
          </p>
        </div>
        <PortfolioVisual />
      </section>

      {/* ── Section 7: About ────────────────────────────── */}
      <div id="about">
        <AboutSection />
      </div>

      {/* ── Section 7: Team ─────────────────────────────── */}
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

      {/* ── Section 8: Contact CTA ──────────────────────── */}
      <div id="contact">
        <CTAWithVerticalMarquee />
      </div>

    </div>
  );
}
