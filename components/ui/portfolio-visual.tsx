"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PortfolioClient {
  id: string;
  name: string;
  industry: string;
  image: string;
  description: string;
  services: string[];
  results: { label: string; value: string }[];
}

const CLIENTS: PortfolioClient[] = [
  {
    id: '1',
    name: 'Coastal Skin Studio',
    industry: 'Medical Spa · San Diego',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&auto=format&fit=crop&q=80',
    description: 'Rebuilt their content strategy from the ground up — consistent aesthetic, targeted ads, and influencer partnerships with local creators.',
    services: ['Social Media Management', 'Paid Ads', 'Influencer Collabs'],
    results: [{ label: 'New Followers', value: '+7,600' }, { label: 'Ad ROAS', value: '4.8x' }],
  },
  {
    id: '2',
    name: 'Harbor Fitness SD',
    industry: 'Gym & Personal Training',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    description: 'Hyper-local content that highlighted coaches, community, and results — driving a surge in memberships through organic reach and Meta ads.',
    services: ['Social Media Management', 'Paid Ads', 'Content Creation'],
    results: [{ label: 'New Members', value: '+120' }, { label: 'Revenue Growth', value: '+41%' }],
  },
  {
    id: '3',
    name: 'Bloom Aesthetics',
    industry: 'Beauty & Wellness',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
    description: 'Launched their Instagram and TikTok from scratch with micro-influencer seedings. Within 90 days they had a waitlist.',
    services: ['Social Media Management', 'Influencer Collabs', 'Content Creation'],
    results: [{ label: 'Followers in 90 Days', value: '5,200' }, { label: 'Booking Rate', value: '+85%' }],
  },
  {
    id: '4',
    name: 'Pacific Realty Group',
    industry: 'Real Estate · La Jolla',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    description: 'Premium listing content and retargeting campaigns that kept Pacific Realty top-of-mind with buyers in the La Jolla market.',
    services: ['Social Media Management', 'Paid Ads', 'Content Creation'],
    results: [{ label: 'Listing Views', value: '+220%' }, { label: 'Ad Spend ROI', value: '6.1x' }],
  },
  {
    id: '5',
    name: 'Baja Brew Co.',
    industry: 'Craft Brewery · Chula Vista',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&auto=format&fit=crop&q=80',
    description: 'Event-based campaigns and creator visits that built a social presence driving consistent foot traffic every weekend.',
    services: ['Social Media Management', 'Influencer Collabs', 'Paid Ads'],
    results: [{ label: 'Weekend Foot Traffic', value: '+55%' }, { label: 'Reach Growth', value: '+310%' }],
  },
];

export function PortfolioVisual() {
  const [activeId, setActiveId] = useState<string>('1');
  const [animated, setAnimated] = useState<string[]>([]);

  // Stagger panels in on mount like the 21st.dev component
  useEffect(() => {
    CLIENTS.forEach((c, i) => {
      setTimeout(() => {
        setAnimated(prev => [...prev, c.id]);
      }, 120 * i);
    });
  }, []);

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-0" style={{ minHeight: '560px' }}>
      {CLIENTS.map((client) => {
        const isActive = activeId === client.id;
        const isAnimated = animated.includes(client.id);

        return (
          <div
            key={client.id}
            onClick={() => setActiveId(client.id)}
            className="relative overflow-hidden cursor-pointer border-2 transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url('${client.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderColor: isActive ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.08)',
              boxShadow: isActive ? '0 8px 40px rgba(99,102,241,0.25)' : '0 2px 12px rgba(0,0,0,0.3)',
              // Expand active panel, collapse others
              flex: isActive ? '7 1 0%' : '1 1 0%',
              minHeight: isActive ? '280px' : '64px',
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            {/* Dark overlay — heavier on inactive */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: isActive
                  ? 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%)'
                  : 'rgba(0,0,0,0.72)',
              }}
            />

            {/* Content */}
            <div className="relative h-full flex items-center px-6 gap-5 z-10">
              {/* Number badge */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 text-sm font-bold',
                  isActive
                    ? 'bg-primary border-primary text-white'
                    : 'bg-black/50 border-white/20 text-white/60'
                )}
              >
                {String(CLIENTS.indexOf(client) + 1).padStart(2, '0')}
              </div>

              {/* Name + industry — always visible */}
              <div className="flex-shrink-0">
                <p className={cn(
                  'font-heading font-bold transition-all duration-500',
                  isActive ? 'text-white text-xl' : 'text-white/80 text-base'
                )}>
                  {client.name}
                </p>
                <p className={cn(
                  'text-xs transition-all duration-500',
                  isActive ? 'text-primary' : 'text-white/40'
                )}>
                  {client.industry}
                </p>
              </div>

              {/* Expanded content — slides in when active */}
              <div
                className="flex-1 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Description */}
                <p className="text-sm text-white/80 leading-relaxed max-w-sm hidden md:block">
                  {client.description}
                </p>

                {/* Results + services */}
                <div className="ml-auto flex flex-col gap-3 items-end">
                  {/* Metrics */}
                  <div className="flex gap-3">
                    {client.results.map((r) => (
                      <div key={r.label} className="text-right">
                        <p className="text-xl font-bold font-heading text-white">{r.value}</p>
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Service tags */}
                  <div className="flex gap-2 flex-wrap justify-end">
                    {client.services.map((s) => (
                      <span key={s} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary/90">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PortfolioVisual;
