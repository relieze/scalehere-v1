const pillars = [
  {
    title: "Branding",
    body: "We shape your visual identity through tone, colors, props, and style so every photo fits your ideal client.",
  },
  {
    title: "Storytelling",
    body: "Brand storytelling is the art of conveying ideas and viewpoints through authentic media.",
  },
  {
    title: "Design",
    body: "From static graphics to animation and interactive pages — design that moves people.",
  },
  {
    title: "Consulting",
    body: "Helping business owners learn the craft and strategy of social media from the ground up.",
  },
];

export function AboutSection() {
  return (
    <section className="w-full py-24 md:py-32 px-6 bg-background border-b border-border/30">
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium text-center">
          About Scale SD
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mt-12">

          {/* Left — mission */}
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
              Marketing That Feels Real, Fun &amp; Deeply Human.
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-medium mb-3">Our Mission</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We are a marketing agency dedicated to empowering businesses to expand their reach in
              the digital world. We specialize in crafting innovative marketing strategies, compelling
              content, and impactful campaigns that elevate brands and drive growth.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our team delivers tailored solutions that resonate with your audience and enhance your
              online presence. We treat clients like family and take pride in the quality of every
              deliverable — from production and creative direction to marketing planning.
            </p>
          </div>

          {/* Right — vision + brand pillars */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-medium mb-3">Our Vision</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              We support business owners across San Diego, Los Angeles, and beyond with creative,
              sustainable marketing that helps them grow without burning out. Whether you&apos;re
              launching a startup or scaling an established brand, we bring a people-first approach
              that builds trust and drives real results.
            </p>

            {/* Brand pillars */}
            <div className="grid grid-cols-2 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/30">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="bg-background p-6 flex flex-col gap-2"
                >
                  <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                    {pillar.title}
                  </span>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
