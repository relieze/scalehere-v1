"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Eye, Palette, MessageSquare, Layers, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrbitItem {
  id: string;
  title: string;
  tagline: string;
  content: string;
  icon: React.ElementType;
}

// ── Orbit radii ───────────────────────────────────────────────
const INNER_RADIUS = 150;
const OUTER_RADIUS = 265;

// ── Data ──────────────────────────────────────────────────────
const innerItems: OrbitItem[] = [
  {
    id: "mission",
    title: "Our Mission",
    tagline: "People-First Marketing",
    content:
      "We are a marketing agency dedicated to empowering businesses to expand their reach in the digital world. We specialize in crafting innovative strategies, compelling content, and impactful campaigns that elevate brands and drive growth. We treat clients like family.",
    icon: BookOpen,
  },
  {
    id: "vision",
    title: "Our Vision",
    tagline: "Marketing That Feels Human",
    content:
      "To build a world where marketing feels real, fun, and deeply human. We support business owners across San Diego, Los Angeles, and beyond with creative, sustainable marketing that helps them grow without burning out.",
    icon: Eye,
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
  },
  {
    id: "storytelling",
    title: "Storytelling",
    tagline: "Authentic Narrative",
    content:
      "Brand storytelling is the art of conveying your ideas, values, and viewpoints through compelling, authentic media that resonates with real people.",
    icon: MessageSquare,
  },
  {
    id: "design",
    title: "Design",
    tagline: "Creative Direction",
    content:
      "From static graphics to animation and interactive pages — design that moves people and drives real engagement across every platform.",
    icon: Layers,
  },
  {
    id: "consulting",
    title: "Consulting",
    tagline: "Strategy & Coaching",
    content:
      "Helping business owners master the craft and strategy of social media marketing from the ground up — so you always know what's working and why.",
    icon: Lightbulb,
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

// ── Angle to move a node to 270° (top / 12 o'clock) ──────────
function angleToTop(nodeIndex: number, total: number): number {
  return ((270 - (nodeIndex / total) * 360) % 360 + 360) % 360;
}

export default function RadialOrbitalTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [innerAngle, setInnerAngle] = useState(0);
  const [outerAngle, setOuterAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // ── Responsive detection ───────────────────────────────────
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Rotation loop ──────────────────────────────────────────
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setInnerAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      setOuterAngle((prev) => Number(((prev - 0.18 + 360) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  // ── On mobile: rotate orbit so clicked node goes to top ────
  const centerOnNode = useCallback((id: string) => {
    const innerIdx = innerItems.findIndex((i) => i.id === id);
    if (innerIdx !== -1) {
      setInnerAngle(angleToTop(innerIdx, innerItems.length));
      return;
    }
    const outerIdx = outerItems.findIndex((i) => i.id === id);
    if (outerIdx !== -1) {
      setOuterAngle(angleToTop(outerIdx, outerItems.length));
    }
  }, []);

  // ── Click handlers ─────────────────────────────────────────
  const handleNodeClick = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (expandedId === id) {
        setExpandedId(null);
        setAutoRotate(true);
      } else {
        setExpandedId(id);
        setAutoRotate(false);
        if (!isDesktop) centerOnNode(id);
      }
    },
    [expandedId, isDesktop, centerOnNode]
  );

  const handleContainerClick = () => {
    setExpandedId(null);
    setAutoRotate(true);
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
    const isOuter = radius === OUTER_RADIUS;
    const Icon = item.icon;

    return (
      <div
        key={item.id}
        className="absolute transition-all duration-700 cursor-pointer"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          zIndex: isExpanded ? 200 : pos.zIndex,
          opacity: isExpanded ? 1 : pos.opacity,
        }}
        onClick={(e) => handleNodeClick(item.id, e)}
      >
        {/* Node button */}
        <div
          className={`rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            isOuter ? "w-11 h-11" : "w-10 h-10"
          } ${
            isExpanded
              ? "bg-primary text-primary-foreground border-primary scale-125 shadow-lg shadow-primary/30"
              : "bg-background text-foreground border-white/25 hover:border-primary/60"
          }`}
        >
          <Icon size={isOuter ? 17 : 16} />
        </div>

        {/* Label */}
        <div
          className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 -translate-x-1/2 left-1/2 ${
            isExpanded ? "text-primary" : "text-white/60"
          }`}
        >
          {item.title}
        </div>

        {/* Mobile inline card — node is at top, card drops down over center */}
        {isExpanded && !isDesktop && (
          <Card
            className="absolute top-16 left-1/2 -translate-x-1/2 w-64 bg-card/95 backdrop-blur-lg border-border/60 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/50" />
            <CardHeader className="pb-1 pt-4 px-4">
              <p className="text-[10px] uppercase tracking-widest text-primary/70 font-medium mb-1">
                {item.tagline}
              </p>
              <CardTitle className="text-base font-heading">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed px-4 pb-4">
              {item.content}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // ── Orbital canvas (shared between both layouts) ───────────
  const orbitalCanvas = (
    <div
      className="relative flex items-center justify-center w-full h-[580px] lg:h-[640px] lg:flex-1"
      onClick={handleContainerClick}
    >
      {/* Ring decorations */}
      <div className="absolute w-[530px] h-[530px] rounded-full border border-white/[0.06] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 pointer-events-none" />

      {/* Center orb */}
      <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600 flex items-center justify-center z-10 pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full border border-orange-400/20 animate-ping opacity-60" />
        <div
          className="absolute w-24 h-24 rounded-full border border-orange-400/10 animate-ping opacity-40"
          style={{ animationDelay: "0.5s" }}
        />
        <span className="text-[9px] font-heading font-bold text-white tracking-wide text-center leading-tight">
          Scale<br />SD
        </span>
      </div>

      {/* Nodes */}
      {innerItems.map((item, i) =>
        renderNode(item, i, innerItems.length, INNER_RADIUS, innerAngle)
      )}
      {outerItems.map((item, i) =>
        renderNode(item, i, outerItems.length, OUTER_RADIUS, outerAngle)
      )}
    </div>
  );

  // ── Desktop right panel ────────────────────────────────────
  const desktopPanel = (
    <div className="hidden lg:flex lg:w-80 xl:w-96 flex-shrink-0 flex-col justify-center min-h-[300px]">
      <AnimatePresence mode="wait">
        {expandedItem ? (
          <motion.div
            key={expandedItem.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/70 font-medium mb-3">
              {expandedItem.tagline}
            </p>
            <h3 className="font-heading text-3xl xl:text-4xl font-bold mb-4 leading-tight">
              {expandedItem.title}
            </h3>
            <div className="w-8 h-px bg-primary/50 mb-5" />
            <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">
              {expandedItem.content}
            </p>
            <button
              className="mt-6 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              onClick={handleContainerClick}
            >
              ← Dismiss
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/30 text-sm"
          >
            Click any node to explore.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full lg:flex lg:items-center lg:gap-8 xl:gap-16">
      {orbitalCanvas}
      {desktopPanel}
    </div>
  );
}
