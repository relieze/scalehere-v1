import { HeroSection } from "@/components/blocks/hero-section-5";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { StatsSection } from "@/components/ui/stats-section";
import { AboutSection } from "@/components/ui/about-section";
import CTAWithVerticalMarquee from "@/components/ui/cta-with-text-marquee";

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <HeroSection />

      {/* ── Section 2: Services ─────────────────────────── */}
      <section id="services" className="w-full pt-0 pb-20 md:pb-28 px-4">
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

      {/* ── Section 4: About ────────────────────────────── */}
      <div id="about">
        <AboutSection />
      </div>

      {/* ── Section 5: Contact CTA ──────────────────────── */}
      <div id="contact">
        <CTAWithVerticalMarquee />
      </div>

    </div>
  );
}
