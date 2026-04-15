"use client"

import { useState } from 'react';
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

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = TEAM }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto py-8 px-0 md:px-6">
      {/* ── Left: staggered photo grid ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[86px] h-[96px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 — offset down */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[94px] h-[104px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 — offset halfway */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[88px] h-[98px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: name + role list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-400',
        className,
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.77)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name row
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram;

  return (
    <div
      className={cn(
        'cursor-pointer transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social icons */}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            'h-3 rounded-[5px] flex-shrink-0 transition-all duration-300 bg-primary',
            isActive ? 'w-5' : 'w-4 opacity-30',
          )}
        />
        <span
          className={cn(
            'text-base md:text-[18px] font-semibold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-foreground/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons — slide in on hover */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150 hover:scale-110"
                title="X / Twitter">
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn">
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.instagram && (
              <a href={member.social.instagram} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-150 hover:scale-110"
                title="Instagram">
                <FaInstagram size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {member.role}
      </p>
    </div>
  );
}
