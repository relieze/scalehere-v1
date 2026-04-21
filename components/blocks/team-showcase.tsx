"use client"

import { useRef, useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Replace with real Scale SD team photos and social links when available
const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Carlos M.',
    role: 'Founder & CEO',
    image: 'https://i.pravatar.cc/400?img=11',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '2',
    name: 'Sofia R.',
    role: 'Head of Social Media',
    image: 'https://i.pravatar.cc/400?img=47',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Jake T.',
    role: 'Paid Ads Specialist',
    image: 'https://i.pravatar.cc/400?img=12',
    social: { linkedin: '#' },
  },
  {
    id: '4',
    name: 'Mia L.',
    role: 'Content Creator',
    image: 'https://i.pravatar.cc/400?img=44',
    social: { instagram: '#' },
  },
  {
    id: '5',
    name: 'Derek W.',
    role: 'Graphic Designer',
    image: 'https://i.pravatar.cc/400?img=15',
    social: { instagram: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'Alyssa P.',
    role: 'Influencer Relations',
    image: 'https://i.pravatar.cc/400?img=49',
    social: { instagram: '#' },
  },
];

export default function TeamShowcase({ members = TEAM }: { members?: TeamMember[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Mobile: 2 columns. Desktop: 3 columns.
  const mob1 = members.filter((_, i) => i % 2 === 0);
  const mob2 = members.filter((_, i) => i % 2 === 1);
  const dsk1 = members.filter((_, i) => i % 3 === 0);
  const dsk2 = members.filter((_, i) => i % 3 === 1);
  const dsk3 = members.filter((_, i) => i % 3 === 2);

  const onHover = (id: string | null) => setActiveId(id);
  const onTap   = (id: string) => setActiveId(prev => prev === id ? null : id);

  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto py-8 px-0 md:px-6 select-none" onClick={() => setActiveId(null)}>

      {/* ── Mobile layout: 2 columns ── */}
      <div className="flex gap-3 md:hidden">
        <div className="flex flex-col gap-3">
          {mob1.map(m => (
            <PhotoCard key={m.id} member={m} activeId={activeId} onHover={onHover} onTap={onTap}
              className="w-[130px] h-[148px] min-[375px]:w-[155px] min-[375px]:h-[175px]"
            />
          ))}
        </div>
        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-3 mt-[56px]">
          {mob2.map(m => (
            <PhotoCard key={m.id} member={m} activeId={activeId} onHover={onHover} onTap={onTap}
              className="w-[140px] h-[158px] min-[375px]:w-[165px] min-[375px]:h-[185px]"
            />
          ))}
        </div>
      </div>

      {/* ── Desktop layout: 3 columns ── */}
      <div className="hidden md:flex gap-4 lg:gap-5">
        <div className="flex flex-col gap-4">
          {dsk1.map(m => (
            <PhotoCard key={m.id} member={m} activeId={activeId} onHover={onHover} onTap={onTap}
              className="md:w-[185px] md:h-[210px] lg:w-[230px] lg:h-[260px]"
            />
          ))}
        </div>
        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-4 md:mt-[72px] lg:mt-[90px]">
          {dsk2.map(m => (
            <PhotoCard key={m.id} member={m} activeId={activeId} onHover={onHover} onTap={onTap}
              className="md:w-[205px] md:h-[230px] lg:w-[255px] lg:h-[285px]"
            />
          ))}
        </div>
        {/* Column 3 — offset halfway */}
        <div className="flex flex-col gap-4 md:mt-[36px] lg:mt-[45px]">
          {dsk3.map(m => (
            <PhotoCard key={m.id} member={m} activeId={activeId} onHover={onHover} onTap={onTap}
              className="md:w-[193px] md:h-[217px] lg:w-[240px] lg:h-[270px]"
            />
          ))}
        </div>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card with slide-up info strip
───────────────────────────────────────── */

function PhotoCard({
  member, className, activeId, onHover, onTap,
}: {
  member: TeamMember;
  className: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
  onTap: (id: string) => void;
}) {
  const isActive = activeId === member.id;
  const isDimmed = activeId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram;

  // Track touchstart Y so we can distinguish a tap from a scroll in touchEnd.
  // Without this, onTouchEnd fires after any vertical scroll that started on a
  // card, accidentally toggling the slide-up strip.
  const touchStartY = useRef<number | null>(null);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-300',
        className,
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
      onTouchEnd={(e) => {
        const startY = touchStartY.current;
        const endY = e.changedTouches[0].clientY;
        touchStartY.current = null;
        // > 10px vertical movement = scroll, not tap — leave default behavior alone
        if (startY !== null && Math.abs(endY - startY) > 10) return;
        e.preventDefault();
        onTap(member.id);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isDimmed ? 'grayscale(1) brightness(0.77)' : 'grayscale(0) brightness(1)',
        }}
      />

      {/* Peek — name always visible at bottom on all devices, hides when full strip is active */}
      <div className={cn("absolute bottom-0 inset-x-0 px-2.5 pb-2 pt-6 bg-gradient-to-t from-black/75 to-transparent", isActive && "hidden")}>
        <p className="text-white text-[11px] font-bold leading-tight truncate">
          {member.name}
        </p>
      </div>

      {/* Full info strip — slides up on tap (mobile) or hover (desktop)
          Covers the peek div when active                                  */}
      <div className={cn(
        'absolute bottom-0 inset-x-0 px-2.5 pb-2.5 pt-8',
        'bg-gradient-to-t from-black/85 via-black/50 to-transparent',
        'transition-transform duration-300 ease-out',
        isActive ? 'translate-y-0' : 'translate-y-full',
      )}>
        <p className="text-white text-[11px] font-bold leading-tight truncate">
          {member.name}
        </p>
        <p className="text-white/60 text-[9px] uppercase tracking-[0.15em] font-medium mt-0.5 leading-snug">
          {member.role}
        </p>

        {hasSocial && (
          <div className="flex items-center gap-1.5 mt-2">
            {member.social?.twitter && (
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-primary/20 hover:text-primary transition-colors duration-150">
                <FaTwitter size={12} />
              </a>
            )}
            {member.social?.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-primary/20 hover:text-primary transition-colors duration-150">
                <FaLinkedinIn size={12} />
              </a>
            )}
            {member.social?.instagram && (
              <a href={member.social.instagram} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-primary/20 hover:text-primary transition-colors duration-150">
                <FaInstagram size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
