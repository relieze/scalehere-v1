"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// Replace with real client quotes when available
const testimonials = [
  {
    tempId: 0,
    testimonial: "Scale SD completely transformed our Instagram. We went from 400 followers to over 8,000 in six months — and the leads actually convert.",
    by: "Jessica R., Owner at Coastal Skin Studio",
    imgSrc: "https://i.pravatar.cc/150?img=47"
  },
  {
    tempId: 1,
    testimonial: "I used to spend hours every week on content and still felt behind. Now I give them one hour and my social presence has never looked better.",
    by: "Marcus T., Founder at Harbor Fitness SD",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 2,
    testimonial: "Our ad spend used to feel like throwing money into the ocean. Scale SD turned it into our best-performing sales channel.",
    by: "Diana L., Director at Pacific Realty Group",
    imgSrc: "https://i.pravatar.cc/150?img=44"
  },
  {
    tempId: 3,
    testimonial: "They feel like a real part of our team, not just an agency. They know our brand better than some of our employees.",
    by: "Kevin M., CEO at SoCal Roofing Co.",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 4,
    testimonial: "Within 90 days of working with Scale SD, we had our highest revenue month ever. The results speak for themselves.",
    by: "Natalie S., Owner at Bloom Aesthetics",
    imgSrc: "https://i.pravatar.cc/150?img=49"
  },
  {
    tempId: 5,
    testimonial: "I was skeptical about influencer collabs, but they matched us with the perfect creators. Our brand awareness exploded overnight.",
    by: "Ryan C., Co-Founder at Baja Brew Co.",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 6,
    testimonial: "Professional, responsive, and they actually get results. I've tried three other agencies — Scale SD is the only one I've renewed with.",
    by: "Melissa A., Owner at La Jolla Med Spa",
    imgSrc: "https://i.pravatar.cc/150?img=48"
  },
  {
    tempId: 7,
    testimonial: "The content they create is on-brand every single time. Our customers constantly ask who does our social media — that says it all.",
    by: "Brandon W., GM at Del Mar Auto Group",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 border-primary"
          : "z-0 bg-card border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        // Background: center card uses accent gradient, others use our dark card color
        background: isCenter
          ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
          : "#0f1120",
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(99,102,241,0.3)"
          : "0px 0px 0px 0px transparent"
      }}
    >
      {/* Decorative cut-corner line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? "rgba(255,255,255,0.2)" : "hsl(var(--border))"
        }}
      />

      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{ boxShadow: "3px 3px 0px rgba(7,8,15,0.8)" }}
      />

      <h3 className={cn(
        "text-base sm:text-lg font-medium leading-snug",
        isCenter ? "text-white" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>

      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-white/70" : "text-muted-foreground"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Prev / Next buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center transition-colors",
            "bg-[#0f1120] border-2 border-border hover:bg-primary hover:border-primary hover:text-white text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center transition-colors",
            "bg-[#0f1120] border-2 border-border hover:bg-primary hover:border-primary hover:text-white text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
