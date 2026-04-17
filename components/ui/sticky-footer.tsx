'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { buttonVariants } from './button';

interface FooterLink {
  title: string;
  href: string;
}
interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
  return (
    <footer
      className={cn('relative h-auto md:h-[500px] w-full', className)}
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      {...props}
    >
      <div className="md:fixed md:bottom-0 md:h-[500px] w-full">
        <div className="md:sticky md:top-[calc(100vh-500px)] h-full">
          <div className="relative flex size-full flex-col justify-between gap-5 border-t border-white/10 bg-black px-4 py-8 md:px-12">

            {/* Main columns */}
            <div className="relative z-10 mt-6 flex flex-col gap-8 md:flex-row xl:mt-0">

              {/* Brand column */}
              <AnimatedContainer className="w-full max-w-xs space-y-4">
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  Scale <span className="text-primary">SD</span>
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4 md:mt-0">
                  San Diego&apos;s social media marketing agency. We create campaigns that
                  turn followers into buyers — and buyers into loyal customers.
                </p>
                <div className="flex gap-2 pt-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      aria-label={link.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: 'icon', variant: 'outline' }),
                        'size-8 border-white/10 hover:border-primary/50 hover:text-primary'
                      )}
                    >
                      <link.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </AnimatedContainer>

              {/* Link groups */}
              {footerLinkGroups.map((group, index) => (
                <AnimatedContainer
                  key={group.label}
                  delay={0.1 + index * 0.1}
                  className="w-full"
                >
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                      {group.label}
                    </h3>
                    <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                      {group.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="hover:text-foreground inline-flex items-center transition-colors duration-200"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="relative z-10 text-muted-foreground flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs md:flex-row">
              <p>© 2026 Scale SD. All rights reserved.</p>
              <p>San Diego, CA · Made with ♥</p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Data ────────────────────────────────────────────────────────────────────

const socialLinks = [
  { title: 'Instagram', href: '#', icon: FaInstagram },
  { title: 'Facebook', href: '#', icon: FaFacebookF },
  { title: 'YouTube', href: '#', icon: FaYoutube },
  { title: 'LinkedIn', href: '#', icon: FaLinkedinIn },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: 'Navigate',
    links: [
      { title: 'Home', href: '#' },
      { title: 'Services', href: '#services' },
      { title: 'About', href: '#about' },
      { title: 'Contact', href: '#contact' },
      { title: 'Apply Now', href: '#contact' },
    ],
  },
  {
    label: 'Services',
    links: [
      { title: 'Social Media Management', href: '#services' },
      { title: 'Digital Marketing', href: '#services' },
      { title: 'Collaborations & UGC', href: '#services' },
      { title: 'Content Creation', href: '#services' },
      { title: 'PPC Advertising', href: '#services' },
      { title: 'SEO & Growth', href: '#services' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { title: 'Scalenowsd@gmail.com', href: 'mailto:Scalenowsd@gmail.com' },
      { title: '760-443-7876', href: 'tel:7604437876' },
      { title: '10918 Technology Pl', href: '#' },
      { title: 'San Diego, CA 92025', href: '#' },
    ],
  },
];

// ── Animation wrapper ────────────────────────────────────────────────────────

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({ delay = 0.1, children, ...props }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...(props as React.ComponentProps<'div'>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
