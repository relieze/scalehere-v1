"use client"

import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

const realClients: GalleryItem[] = [
  {
    client: 'GGZ Construction',
    industry: 'General Contractor · San Diego',
    photo: {
      url: '/client_websites/ggz.png',
      text: 'GGZ Construction website',
      pos: '50% 0%',
      website: 'ggzconstruction.com',
    },
  },
  {
    client: 'SC Floors',
    industry: 'Commercial Flooring · San Diego',
    photo: {
      url: '/client_websites/sc_floors.png',
      text: 'SC Floors website',
      pos: '50% 0%',
      website: 'scfloorsus.com',
    },
  },
  {
    client: 'World Pools',
    industry: 'Pool Builder · San Diego',
    photo: {
      url: '/client_websites/world_pools.png',
      text: 'World Pools website',
      pos: '50% 0%',
      website: 'worldpoolsinc.com',
    },
  },
  {
    client: 'Star Builders',
    industry: 'Home Remodeling · San Diego',
    photo: {
      url: '/client_websites/star_builders.png',
      text: 'Star Builders website',
      pos: '50% 0%',
      website: 'starbuildersincsd.com',
    },
  },
];

// Duplicated to 8 slots — keeps CircularGallery spacing dense at radius=550.
const clients: GalleryItem[] = [...realClients, ...realClients];

export function CaseStudiesSection() {
  return (
    <section className="w-full pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-28 px-4 overflow-hidden">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto mb-10 md:mb-24 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
          Our Work
        </p>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          Websites We've Built
        </h2>
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          From local service businesses to growing brands — each site is built to convert.
        </p>
      </div>

      {/* 3D rotating gallery — responsive height */}
      <div className="w-full h-[400px] md:h-[460px] lg:h-[520px]">
        <CircularGallery items={clients} radius={550} autoRotateSpeed={0.015} />
      </div>
    </section>
  );
}

export default CaseStudiesSection;
