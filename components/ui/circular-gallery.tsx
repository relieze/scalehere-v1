"use client"

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  client: string;    // project / client name
  industry: string;  // niche or service type
  photo: {
    url: string;
    text: string;    // alt text
    pos?: string;    // object-position override
    website: string; // client URL or tagline
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.015, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const rotationRef = useRef(0);          // source of truth for animation loop
    const animationFrameRef = useRef<number | null>(null);
    const snapTargetRef = useRef<number | null>(null);  // target angle when snapping
    const pauseUntilRef = useRef<number>(0);            // timestamp — pause auto-rotate until then

    // Responsive card size — smaller on mobile.
    // Tracked in JS state (not Tailwind classes) because marginLeft/marginTop
    // below are derived from these values and have to be inline.
    const [cardW, setCardW] = useState(300);
    const [cardH, setCardH] = useState(400);
    useEffect(() => {
      const updateCard = () => {
        const mobile = window.innerWidth < 768;
        setCardW(mobile ? 220 : 300);
        setCardH(mobile ? 290 : 400);
      };
      updateCard();
      window.addEventListener('resize', updateCard);
      return () => window.removeEventListener('resize', updateCard);
    }, []);

    const anglePerItem = 360 / items.length;

    // Animation loop — handles snap easing + auto-rotate
    useEffect(() => {
      const tick = () => {
        {
          if (snapTargetRef.current !== null) {
            // Lerp toward snap target
            const diff = snapTargetRef.current - rotationRef.current;
            if (Math.abs(diff) < 0.3) {
              rotationRef.current = snapTargetRef.current;
              snapTargetRef.current = null;
              pauseUntilRef.current = Date.now() + 3000; // pause 3s after snap
            } else {
              rotationRef.current += diff * 0.12;
            }
            setRotation(rotationRef.current);
          } else if (Date.now() > pauseUntilRef.current) {
            // Normal auto-rotate
            rotationRef.current += autoRotateSpeed;
            setRotation(rotationRef.current);
          }
        }
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      animationFrameRef.current = requestAnimationFrame(tick);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [autoRotateSpeed]);

    // Snap to adjacent card — direction: +1 next, -1 prev
    const snapTo = (direction: 1 | -1) => {
      const nearestStep = Math.round(rotationRef.current / anglePerItem);
      snapTargetRef.current = (nearestStep + direction) * anglePerItem;
    };


    return (
      <div ref={ref} className={cn("relative w-full h-full flex flex-col items-center justify-center", className)}>
        {/* 3D viewport — drag/swipe enabled */}
        <div
          role="region"
          aria-label="Client Work Gallery"
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: '2000px' }}
          {...props}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {items.map((item, i) => {
              const itemAngle = i * anglePerItem;
              const totalRotation = rotation % 360;
              const relativeAngle = (itemAngle + totalRotation + 360) % 360;
              const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
              const opacity = Math.max(0.25, 1 - (normalizedAngle / 180));

              return (
                <div
                  key={item.photo.url}
                  role="group"
                  aria-label={item.client}
                  className="absolute"
                  style={{
                    width: cardW,
                    height: cardH,
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: `-${cardW / 2}px`,
                    marginTop: `-${cardH / 2}px`,
                    opacity,
                    transition: 'opacity 0.3s linear',
                  }}
                >
                  <div className="chrome-border rounded-lg shadow-2xl w-full h-full" style={{ padding: '3px' }}>
                    <div className="relative w-full h-full rounded-[5px] overflow-hidden bg-card/30 backdrop-blur-lg">
                      <img
                        src={item.photo.url}
                        alt={item.photo.text}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: item.photo.pos || 'center' }}
                      />
                      {/* Card overlay */}
                      <div className="absolute bottom-0 left-0 w-full px-4 pt-20 pb-5 bg-gradient-to-t from-black from-40% via-black/80 to-transparent text-white">
                        <h2 className="text-xl font-bold font-heading leading-tight">{item.client}</h2>
                        <p className="text-sm text-primary mt-1">{item.industry}</p>
                        <p className="text-xs mt-1.5 text-white/80">{item.photo.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prev button — click snaps to previous card */}
        <button
          onClick={() => snapTo(-1)}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur text-white hover:border-primary hover:bg-primary/20 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next button — click snaps to next card */}
        <button
          onClick={() => snapTo(1)}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur text-white hover:border-primary hover:bg-primary/20 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };
