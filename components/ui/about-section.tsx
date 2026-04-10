import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-24 md:py-32 px-6 bg-background border-b border-border/30"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-2">
          <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
            About Scale SD
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
            Marketing That Feels Real,<br />Fun &amp; Deeply Human.
          </h2>
          <p className="text-muted-foreground text-sm">
            Click{" "}
            <span className="text-primary font-medium">Mission</span>
            {" "}or{" "}
            <span className="text-primary font-medium">Vision</span>
            {" "}to explore — click anywhere to dismiss.
          </p>
        </div>

        {/* Orbital */}
        <RadialOrbitalTimeline />

      </div>
    </section>
  );
}
