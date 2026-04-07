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
    const manualSpeedRef = useRef(0); // extra speed added by holding a button
    const animationFrameRef = useRef<number | null>(null);

    // Auto-rotate + manual speed boost
    useEffect(() => {
      const autoRotate = () => {
        setRotation(prev => prev + autoRotateSpeed + manualSpeedRef.current);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    // Hold-to-spin: add speed while button is pressed, stop on release
    const handlePrevStart = () => { manualSpeedRef.current = -0.4; };
    const handleNextStart = () => { manualSpeedRef.current = 0.4; };
    const handleManualEnd  = () => { manualSpeedRef.current = 0; };

    return (
      <div className={cn("relative w-full h-full flex flex-col items-center justify-center", className)}>
        {/* 3D viewport */}
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
                  className="absolute w-[300px] h-[400px]"
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-150px',
                    marginTop: '-200px',
                    opacity,
                    transition: 'opacity 0.3s linear',
                  }}
                >
                  <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden border border-white/10 bg-card/30 backdrop-blur-lg">
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: item.photo.pos || 'center' }}
                    />
                    {/* Card overlay — extended gradient so website URL is readable */}
                    <div className="absolute bottom-0 left-0 w-full px-4 pt-16 pb-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
                      <h2 className="text-xl font-bold font-heading leading-tight">{item.client}</h2>
                      <p className="text-sm text-primary mt-0.5">{item.industry}</p>
                      <p className="text-xs mt-2 text-white/80">{item.website}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prev / Next buttons — hold to spin faster */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <button
            onMouseDown={handlePrevStart}
            onMouseUp={handleManualEnd}
            onMouseLeave={handleManualEnd}
            onTouchStart={handlePrevStart}
            onTouchEnd={handleManualEnd}
            aria-label="Rotate left"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur text-white hover:border-primary hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onMouseDown={handleNextStart}
            onMouseUp={handleManualEnd}
            onMouseLeave={handleManualEnd}
            onTouchStart={handleNextStart}
            onTouchEnd={handleManualEnd}
            aria-label="Rotate right"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur text-white hover:border-primary hover:bg-primary/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };
