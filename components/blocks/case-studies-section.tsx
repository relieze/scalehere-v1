"use client"

import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

// Replace with real Scale SD client work when available
const clients: GalleryItem[] = [
  {
    client: 'Coastal Skin Studio',
    industry: 'Medical Spa · San Diego',
    photo: {
      url: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=900&auto=format&fit=crop&q=80',
      text: 'Clean modern spa interior',
      pos: '50% 30%',
      website: 'coastalskinstudio.com',
    },
  },
  {
    client: 'Harbor Fitness SD',
    industry: 'Gym & Personal Training',
    photo: {
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&auto=format&fit=crop&q=80',
      text: 'Modern gym equipment under dramatic lighting',
      pos: '50% 40%',
      website: 'harborfitnesssd.com',
    },
  },
  {
    client: 'Pacific Realty Group',
    industry: 'Real Estate · La Jolla',
    photo: {
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
      text: 'Luxury home exterior at golden hour',
      pos: '50% 50%',
      website: 'pacificrealtysandiego.com',
    },
  },
  {
    client: 'Baja Brew Co.',
    industry: 'Craft Brewery · Chula Vista',
    photo: {
      url: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=900&auto=format&fit=crop&q=80',
      text: 'Craft beer taps in a modern brewery',
      pos: '50% 30%',
      website: 'bajabrewco.com',
    },
  },
  {
    client: 'Bloom Aesthetics',
    industry: 'Beauty & Wellness',
    photo: {
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80',
      text: 'Elegant beauty studio setup',
      pos: '50% 20%',
      website: 'bloomaesthetics.co',
    },
  },
  {
    client: 'Del Mar Auto Group',
    industry: 'Automotive · Del Mar',
    photo: {
      url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&auto=format&fit=crop&q=80',
      text: 'Luxury car in a showroom',
      pos: '50% 50%',
      website: 'delmarautogroup.com',
    },
  },
  {
    client: 'SoCal Roofing Co.',
    industry: 'Home Services · San Diego',
    photo: {
      url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900&auto=format&fit=crop&q=80',
      text: 'Modern suburban home with clean roofline',
      pos: '50% 40%',
      website: 'socalroofingco.com',
    },
  },
  {
    client: 'La Jolla Med Spa',
    industry: 'Medical Aesthetics',
    photo: {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=80',
      text: 'Serene spa treatment room',
      pos: '50% 30%',
      website: 'lajollamedspa.com',
    },
  },
];

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
