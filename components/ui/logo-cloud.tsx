import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { cn } from '@/lib/utils';

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
};

function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        'overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]',
        className
      )}
    >
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className="pointer-events-none h-5 select-none md:h-6 opacity-75 hover:opacity-100 transition-opacity duration-300"
            height={logo.height ?? 'auto'}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
            width={logo.width ?? 'auto'}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}

const platformLogos: Logo[] = [
  { src: 'https://svgl.app/library/instagram-wordmark.svg',    alt: 'Instagram', width: 120, height: 24 },
  { src: 'https://svgl.app/library/facebook-wordmark.svg',     alt: 'Facebook',  width: 110, height: 24 },
  { src: 'https://svgl.app/library/tiktok-wordmark-light.svg', alt: 'TikTok',    width: 100, height: 24 },
  { src: 'https://svgl.app/library/youtube-wordmark-light.svg',alt: 'YouTube',   width: 110, height: 24 },
  { src: 'https://svgl.app/library/google-wordmark.svg',       alt: 'Google',    width: 90,  height: 24 },
  { src: 'https://svgl.app/library/linkedin.svg',              alt: 'LinkedIn',  width: 28,  height: 28 },
  { src: 'https://svgl.app/library/snapchat.svg',              alt: 'Snapchat',  width: 28,  height: 28 },
  { src: 'https://svgl.app/library/meta.svg',                  alt: 'Meta',      width: 90,  height: 24 },
  { src: 'https://svgl.app/library/pinterest.svg',             alt: 'Pinterest', width: 28,  height: 28 },
];

export function ClientLogosSection() {
  return (
    <section className="relative mx-auto max-w-3xl py-6">
      <h2 className="mb-5 text-center text-xs uppercase tracking-[0.35em] text-white/30">
        Across All Platforms
      </h2>
      {/* White strip that fades at the edges — logos sit on it in full color */}
      <div className="relative rounded-2xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="absolute inset-0 bg-white/90 rounded-2xl" />
        <div className="relative py-4">
          <LogoCloud logos={platformLogos} />
        </div>
      </div>
    </section>
  );
}
