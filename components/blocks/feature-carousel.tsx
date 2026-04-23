"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ColorsIcon,
  CommandFreeIcons,
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

// Scale SD Services
const FEATURES = [
  {
    id: "social-media",
    label: "Social Media Management",
    icon: SmartPhone01Icon,
    image: "/services/social_media.jpg",
    description: "Content creation, community engagement, and strategy development to build your brand online.",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    icon: GlobalSearchIcon,
    image: "/services/digital_marketing.jpg",
    description: "From SEO to PPC — boost visibility, increase traffic, and generate more qualified leads.",
  },
  {
    id: "collaborations",
    label: "Collaborations & UGC",
    icon: CommandFreeIcons,
    image: "/services/collaborations.jpg",
    description: "Influencer campaigns and UGC content that builds authentic trust with your audience.",
  },
  {
    id: "content",
    label: "Content Marketing",
    icon: MagicWandIcon,
    image: "/services/content_marketing.jpg",
    description: "Blogs, video content, and campaigns that engage your audience at every stage of the funnel.",
  },
  {
    id: "branding",
    label: "Branding & Design",
    icon: ColorsIcon,
    image: "/services/branding.jpg",
    description: "Logos, brand identity, and visual elements that make your business unforgettable.",
  },
  {
    id: "ads",
    label: "Paid Advertising",
    icon: AiCloudIcon,
    image: "/services/paid_advertising.jpg",
    description: "Google Ads and social media ads engineered to maximize ROI and scale your revenue.",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    icon: DashboardSquare01Icon,
    image: "/services/analytics_reporting.jpeg",
    description: "Campaign tracking and performance insights so you always know your marketing is working.",
  },
  {
    id: "seo",
    label: "SEO Optimization",
    icon: CheckmarkCircle01Icon,
    image: "/services/seo.jpg",
    objectPosition: "35% 50%",
    scale: 1.2,
    description: "Website optimization and keyword research to rank higher and attract organic traffic.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
// Per-row height AND per-slot Y-translate distance. Kept constant across
// breakpoints so the gap between service rows doesn't shift on resize.
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  // Pause auto-advance when tab is hidden — browsers throttle setInterval on
  // hidden tabs and fire a burst of delayed ticks on return, causing the
  // carousel to jump multiple slides.
  useEffect(() => {
    const handleVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || isTabHidden) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, isTabHidden]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col md:flex-row md:min-h-0 md:aspect-video border border-border/40">
        <div className="order-2 w-full md:w-[45%] lg:w-[40%] md:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-8 lg:pl-16 min-h-[280px]">
          <div className="absolute inset-x-0 top-0 h-12 md:h-16 bg-gradient-to-b from-black/40 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-12 md:h-16 bg-gradient-to-t from-black/40 to-transparent z-40" />
          <div className="relative w-full h-full flex items-center justify-center md:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3 lg:gap-4 px-4 lg:px-8 py-3 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-white text-primary border-white z-10"
                        : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-primary" : "text-white/40"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </div>
                    <span className="font-normal text-xs md:text-xs lg:text-sm tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="order-1 flex-1 min-h-[380px] md:h-full relative bg-white/2 backdrop-blur-sm flex items-center justify-center py-8 md:py-6 px-6 md:px-8 overflow-hidden border-b md:border-b-0 md:border-r border-border/20">
          <div className="relative w-full max-w-[320px] aspect-[4/5] md:w-auto md:max-w-none md:h-full md:aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-background bg-background origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    style={{
                      objectPosition: feature.objectPosition ?? "center",
                      transform: feature.scale ? `scale(${feature.scale})` : undefined,
                    }}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 pt-20 md:pt-24 lg:pt-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-background text-foreground px-4 py-1.5 rounded-full text-[11px] font-normal uppercase tracking-[0.2em] w-fit shadow-lg mb-3 border border-border/50">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-normal text-base md:text-lg lg:text-2xl leading-tight drop-shadow-md tracking-tight">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-8 left-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="text-white/80 text-[10px] font-normal uppercase tracking-[0.3em] font-mono">
                      Scale SD
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
