"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
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

// Replace with real Scale SD client work when available
const CLIENTS: PortfolioClient[] = [
  {
    id: '1',
    name: 'Coastal Skin Studio',
    industry: 'Medical Spa · San Diego',
    image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&auto=format&fit=crop&q=80',
    description:
      'Coastal Skin Studio came to us with zero social presence and a brand that wasn\'t converting. We rebuilt their content strategy from the ground up — consistent aesthetic, targeted ad campaigns, and influencer partnerships with local San Diego creators.',
    services: ['Social Media Management', 'Paid Ads', 'Influencer Collaborations', 'Content Creation'],
    results: [
      { label: 'New Followers', value: '+7,600' },
      { label: 'Leads / Month', value: '3x' },
      { label: 'Ad ROAS', value: '4.8x' },
      { label: 'Time Saved / Week', value: '12 hrs' },
    ],
  },
  {
    id: '2',
    name: 'Harbor Fitness SD',
    industry: 'Gym & Personal Training',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    description:
      'Harbor Fitness needed to compete with big-box gyms without the big-box budget. We built a hyper-local content strategy that highlighted their coaches, community, and results — driving a surge in membership sign-ups through organic reach and targeted Meta ads.',
    services: ['Social Media Management', 'Paid Ads', 'Content Creation'],
    results: [
      { label: 'New Members', value: '+120' },
      { label: 'Cost Per Lead', value: '-62%' },
      { label: 'Engagement Rate', value: '8.4%' },
      { label: 'Revenue Growth', value: '+41%' },
    ],
  },
  {
    id: '3',
    name: 'Bloom Aesthetics',
    industry: 'Beauty & Wellness',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
    description:
      'Bloom Aesthetics had a loyal client base but no digital footprint. We launched their Instagram and TikTok from scratch, pairing polished content with micro-influencer seedings. Within 90 days they had a waitlist.',
    services: ['Social Media Management', 'Influencer Collaborations', 'Content Creation'],
    results: [
      { label: 'Followers in 90 Days', value: '5,200' },
      { label: 'Booking Rate', value: '+85%' },
      { label: 'Influencer Reach', value: '180K' },
      { label: 'Revenue Month 3', value: 'Record High' },
    ],
  },
  {
    id: '4',
    name: 'Pacific Realty Group',
    industry: 'Real Estate · La Jolla',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    description:
      'High-value real estate requires high-trust marketing. We produced premium listing content, managed their LinkedIn and Instagram, and ran retargeting campaigns that kept Pacific Realty top-of-mind with buyers browsing the La Jolla market.',
    services: ['Social Media Management', 'Paid Ads', 'Content Creation'],
    results: [
      { label: 'Listing Views', value: '+220%' },
      { label: 'Inbound Inquiries', value: '2.4x' },
      { label: 'Avg. Days on Market', value: '-18 days' },
      { label: 'Ad Spend ROI', value: '6.1x' },
    ],
  },
  {
    id: '5',
    name: 'Baja Brew Co.',
    industry: 'Craft Brewery · Chula Vista',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&auto=format&fit=crop&q=80',
    description:
      'Baja Brew Co. wanted to grow beyond their taproom regulars and reach the broader San Diego craft beer scene. We ran event-based campaigns, coordinated creator visits, and built a social presence that now drives consistent foot traffic every weekend.',
    services: ['Social Media Management', 'Influencer Collaborations', 'Paid Ads'],
    results: [
      { label: 'Weekend Foot Traffic', value: '+55%' },
      { label: 'Creator Visits', value: '14' },
      { label: 'Reach Growth', value: '+310%' },
      { label: 'Online Orders', value: '+90%' },
    ],
  },
];

export function PortfolioAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="w-full max-w-5xl mx-auto divide-y divide-white/20 border-y border-white/20">
      {CLIENTS.map((client) => {
        const isOpen = openId === client.id;

        return (
          <div key={client.id}>
            {/* ── Row header ── */}
            <button
              onClick={() => toggle(client.id)}
              className="w-full flex items-center gap-5 py-5 md:py-9 px-2 text-left group"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Name + industry */}
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold font-heading text-foreground leading-tight">
                  {client.name}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{client.industry}</p>
              </div>

              {/* Services preview — hidden when open */}
              <div className={cn('hidden md:flex gap-2 flex-wrap justify-end max-w-xs transition-opacity duration-300', isOpen && 'opacity-0')}>
                {client.services.slice(0, 2).map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-muted-foreground">
                    {s}
                  </span>
                ))}
                {client.services.length > 2 && (
                  <span className="text-xs px-2.5 py-1 rounded-full border border-white/15 text-muted-foreground">
                    +{client.services.length - 2} more
                  </span>
                )}
              </div>

              {/* Toggle icon */}
              <div className={cn(
                'w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300',
                isOpen ? 'border-primary bg-primary/10 text-primary' : 'border-white/20 text-muted-foreground group-hover:border-primary/50'
              )}>
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </div>
            </button>

            {/* ── Expanded panel ── */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 px-2 grid md:grid-cols-2 gap-8">
                    {/* Left: image + description */}
                    <div>
                      <div className="rounded-xl overflow-hidden aspect-video mb-5">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {client.description}
                      </p>

                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {client.services.map((s) => (
                          <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: results grid */}
                    <div className="grid grid-cols-2 gap-4 content-start">
                      {client.results.map((r) => (
                        <div key={r.label} className="chrome-border rounded-xl">
                          <div className="rounded-[11px] bg-white/[0.03] p-5">
                            <p className="text-2xl md:text-3xl font-bold font-heading text-foreground">{r.value}</p>
                            <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{r.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default PortfolioAccordion;
