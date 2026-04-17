"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Eye, Palette, MessageSquare, Layers, Lightbulb } from "lucide-react";

interface OrbitItem {
  id: string;
  title: string;
  tagline: string;
  content: string;
  icon: React.ElementType;
  tier: "core" | "pillar";
}

// ── Orbit radii (desktop defaults — overridden responsively) ──
const DEFAULT_INNER = 150;
const DEFAULT_OUTER = 265;

// ── Data ──────────────────────────────────────────────────────
const innerItems: OrbitItem[] = [
  {
    id: "mission",
    title: "Our Mission",
    tagline: "People-First Marketing",
    content:
      "We are a marketing agency dedicated to empowering businesses to expand their reach in the digital world. We specialize in crafting innovative strategies, compelling content, and impactful campaigns that elevate brands and drive growth. We treat clients like family.",
    icon: BookOpen,
    tier: "core",
  },
  {
    id: "vision",
    title: "Our Vision",
    tagline: "Marketing That Feels Human",
    content:
      "To build a world where marketing feels real, fun, and deeply human. We support business owners across San Diego, Los Angeles, and beyond with creative, sustainable marketing that helps them grow without burning out.",
    icon: Eye,
    tier: "core",
  },
];

const outerItems: OrbitItem[] = [
  {
    id: "branding",
    title: "Branding",
    tagline: "Visual Identity",
    content:
      "We shape your brand's look through tone, colors, props, and style so every photo speaks to your ideal client and builds instant recognition.",
    icon: Palette,
    tier: "pillar",
  },
  {
    id: "storytelling",
    title: "Storytelling",
    tagline: "Authentic Narrative",
    content:
      "Brand storytelling is the art of conveying your ideas, values, and viewpoints through compelling, authentic media that resonates with real people.",
    icon: MessageSquare,
    tier: "pillar",
  },
  {
    id: "design",
    title: "Design",
    tagline: "Creative Direction",
    content:
      "From static graphics to animation and interactive pages — design that moves people and drives real engagement across every platform.",
    icon: Layers,
    tier: "pillar",
  },
  {
    id: "consulting",
    title: "Consulting",
    tagline: "Strategy & Coaching",
    content:
      "Helping business owners master the craft and strategy of social media marketing from the ground up — so you always know what's working and why.",
    icon: Lightbulb,
    tier: "pillar",
  },
];

const allItems = [...innerItems, ...outerItems];

// ── Position calculator ───────────────────────────────────────
function calcPosition(index: number, total: number, radius: number, angle: number) {
  const deg = ((index / total) * 360 + angle) % 360;
  const rad = (deg * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);
  const zIndex = Math.round(100 + 50 * Math.cos(rad));
  const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
  return { x, y, zIndex, opacity };
}


export default function RadialOrbitalTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>("mission");
  const [innerAngle, setInnerAngle] = useState(270); // Mission starts at 12 o'clock
  const [outerAngle, setOuterAngle] = useState(45); // X offset — interleaves with inner orbit
  const [radii, setRadii] = useState<{ inner: number; outer: number; innerNode: number; outerNode: number; iconInner: number; iconOuter: number; containerHeight: number } | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);


  // ── Responsive detection — radii start null, nodes don't render until set
  useEffect(() => {
    const update = () => {
      // Disable node transitions during resize so nodes jump instantly — no travel, no layout overflow
      setIsResizing(true);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setIsResizing(false), 150);
      const w = window.innerWidth;
      // Orbit radii use 400/640/1024 thresholds (orbit size steps)
      // Container height matches the original Tailwind breakpoints exactly (640/768/1024)
      const containerHeight = w < 640 ? 360 : w < 768 ? 460 : w < 1024 ? 560 : 640;
      if (w < 400)       setRadii({ inner: 68,  outer: 108, innerNode: 28, outerNode: 32, iconInner: 12, iconOuter: 13, containerHeight });
      else if (w < 768)  setRadii({ inner: 82,  outer: 135, innerNode: 32, outerNode: 36, iconInner: 13, iconOuter: 15, containerHeight });
      // 768–1023px: side-by-side — canvas ~360px wide
      else if (w < 1024) setRadii({ inner: 95,  outer: 145, innerNode: 36, outerNode: 40, iconInner: 15, iconOuter: 16, containerHeight });
      // 1024–1279px: lg — canvas ~460px, intermediate orbit size
      else if (w < 1280) setRadii({ inner: 112, outer: 185, innerNode: 42, outerNode: 48, iconInner: 16, iconOuter: 18, containerHeight });
      // 1280px+: full orbit
      else               setRadii({ inner: DEFAULT_INNER, outer: DEFAULT_OUTER, innerNode: 48, outerNode: 56, iconInner: 18, iconOuter: 20, containerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Rotation loop ──────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      setInnerAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      setOuterAngle((prev) => Number(((prev - 0.18 + 360) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // ── Click handlers ─────────────────────────────────────────
  const handleNodeClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setExpandedId(id);
    },
    []
  );

  const handleNavClick = useCallback(
    (id: string) => {
      setExpandedId(id);
    },
    []
  );

  const handleContainerClick = () => {
    setExpandedId("mission");
  };

  const expandedItem = allItems.find((i) => i.id === expandedId) ?? null;

  // ── Node renderer ──────────────────────────────────────────
  const renderNode = (
    item: OrbitItem,
    index: number,
    total: number,
    radius: number,
    angle: number
  ) => {
    const pos = calcPosition(index, total, radius, angle);
    const isExpanded = expandedId === item.id;
    const isOuter = radii ? radius === radii.outer : false;
    const Icon = item.icon;

    return (
      <div
        key={item.id}
        className={`absolute transition-all ${isResizing ? "duration-0" : "duration-700"} cursor-pointer group`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          zIndex: isExpanded ? 200 : pos.zIndex,
          opacity: isExpanded ? 1 : pos.opacity,
        }}
        onClick={(e) => handleNodeClick(item.id, e)}
      >
        {/* Node button */}
        <div
          className={`rounded-full flex items-center justify-center border transition-all duration-300 ${
            isExpanded
              ? "bg-primary/20 text-white border-primary shadow-[0_0_20px_rgba(59,130,246,0.55)]"
              : `bg-white/[0.07] backdrop-blur-md text-white/70 hover:text-white hover:border-primary/60 hover:scale-105 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] ${item.tier === "core" ? "border-primary/35" : "border-white/20"}`
          }`}
          style={{ width: isOuter ? radii!.outerNode : radii!.innerNode, height: isOuter ? radii!.outerNode : radii!.innerNode }}
        >
          <Icon size={isOuter ? radii!.iconOuter : radii!.iconInner} />
        </div>

        {/* Label — offset derived from node size so gap stays consistent at every breakpoint */}
        <div
          className={`absolute whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 -translate-x-1/2 left-1/2 ${
            isExpanded ? "text-white" : "hidden md:block text-white/50 group-hover:text-white/80"
          }`}
          style={{ top: (isOuter ? radii!.outerNode : radii!.innerNode) + 6 }}
        >
          {item.title}
        </div>

      </div>
    );
  };

  // ── Orbital canvas (shared between both layouts) ───────────
  const orbitalCanvas = (
    <div
      className="relative flex items-center justify-center w-full md:w-[360px] lg:w-[460px] xl:w-[580px]"
      style={{ height: radii ? radii.containerHeight : 360 }}
      onClick={handleContainerClick}
    >
      {/* Radial glow — always visible */}
      <div
        className="absolute w-full h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 65%)" }}
      />

      {/* Center orb — always visible */}
      <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center z-10 pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full border border-blue-400/25 animate-ping opacity-60" />
        <div
          className="absolute w-24 h-24 rounded-full border border-blue-400/15 animate-ping opacity-40"
          style={{ animationDelay: "0.5s" }}
        />
        <span className="text-[9px] font-heading font-bold text-white tracking-wide text-center leading-tight">
          Scale<br />SD
        </span>
      </div>

      {/* Rings + nodes — only render once radii is measured on client */}
      {radii && (
        <>
          <div
            className="absolute rounded-full border border-white/[0.06] pointer-events-none"
            style={{ width: radii.outer * 2, height: radii.outer * 2 }}
          />
          <div
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{ width: radii.inner * 2, height: radii.inner * 2 }}
          />
          {innerItems.map((item, i) =>
            renderNode(item, i, innerItems.length, radii.inner, innerAngle)
          )}
          {outerItems.map((item, i) =>
            renderNode(item, i, outerItems.length, radii.outer, outerAngle)
          )}
        </>
      )}
    </div>
  );

  // ── Shared panel content — single source of truth ─────────────
  const panelContent = expandedItem ? (
    <>
      <p className="text-[9px] uppercase tracking-[0.25em] text-white/25 font-medium mb-1 md:mb-2">
        {expandedItem.tier === "core" ? "Core Belief" : "Brand Pillar"}
      </p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-medium mb-2 md:mb-3">
        {expandedItem.tagline}
      </p>
      <h3 className="font-heading text-2xl md:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 leading-tight">
        {expandedItem.title}
      </h3>
      <div className="w-8 h-px bg-primary/50 mb-4 md:mb-5" />
      <p className="text-muted-foreground text-sm xl:text-base leading-relaxed mb-6 md:mb-0">
        {expandedItem.content}
      </p>
      <div className="pt-4 md:mt-6 md:pt-5 border-t border-white/10 space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-[9px] uppercase tracking-widest text-white/25 font-medium w-10 flex-shrink-0">Core</span>
          <div className="flex gap-3 flex-wrap">
            {innerItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs transition-colors ${
                  expandedId === item.id ? "text-primary font-medium" : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.title.replace("Our ", "")}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-[9px] uppercase tracking-widest text-white/25 font-medium w-10 flex-shrink-0">Pillars</span>
          <div className="flex gap-3 flex-wrap">
            {outerItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs transition-colors ${
                  expandedId === item.id ? "text-primary font-medium" : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;

  // ── Desktop panel (side) ───────────────────────────────────────
  const desktopPanel = (
    <div className="hidden md:flex md:w-80 lg:w-[340px] xl:w-96 flex-shrink-0 flex-col justify-center min-h-[300px]" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="wait">
        {expandedItem && (
          <motion.div
            key={expandedItem.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ── Mobile panel (below orbit) ─────────────────────────────────
  const mobilePanel = (
    <div className="md:hidden pt-2 pb-2 max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
      <AnimatePresence mode="wait">
        {expandedItem && (
          <motion.div
            key={expandedItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full" onClick={handleContainerClick}>
      <div className="md:flex md:items-center md:justify-center md:gap-8 xl:gap-16">
        {orbitalCanvas}
        {desktopPanel}
      </div>
      {mobilePanel}
    </div>
  );
}
