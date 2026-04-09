"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Businesses Scaled" },
  { value: 1, prefix: "$", suffix: "M+", label: "Revenue Generated" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  value,
  suffix,
  prefix,
  label,
  animate,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  animate: boolean;
}) {
  const count = useCountUp(value, 1800, animate);

  return (
    <div className="flex flex-col items-center gap-2 py-10 px-4">
      {/* Number uses heading font + accent color */}
      <span className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-primary">
        {prefix ?? ""}{count}{suffix}
      </span>
      <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.25em] font-medium">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full pt-16 md:pt-24 pb-8 border-t border-border/30 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-primary/70 mb-10 font-medium">
          Us in Numbers
        </p>
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/30"
          )}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} animate={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
