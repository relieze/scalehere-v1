"use client"

import React from 'react';
import { motion } from "framer-motion";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Real Scale SD client testimonials ---
const testimonials: Testimonial[] = [
  {
    text: "Scale SD completely transformed our Instagram. We went from 400 followers to over 8,000 in six months — and the leads actually convert.",
    image: "https://i.pravatar.cc/150?img=47",
    name: "Jessica R.",
    role: "Owner at Coastal Skin Studio",
  },
  {
    text: "I used to spend hours every week on content and still felt behind. Now I give them one hour and my social presence has never looked better.",
    image: "https://i.pravatar.cc/150?img=11",
    name: "Marcus T.",
    role: "Founder at Harbor Fitness SD",
  },
  {
    text: "Our ad spend used to feel like throwing money into the ocean. Scale SD turned it into our best-performing sales channel.",
    image: "https://i.pravatar.cc/150?img=44",
    name: "Diana L.",
    role: "Director at Pacific Realty Group",
  },
  {
    text: "They feel like a real part of our team, not just an agency. They know our brand better than some of our employees.",
    image: "https://i.pravatar.cc/150?img=15",
    name: "Kevin M.",
    role: "CEO at SoCal Roofing Co.",
  },
  {
    text: "Within 90 days of working with Scale SD, we had our highest revenue month ever. The results speak for themselves.",
    image: "https://i.pravatar.cc/150?img=49",
    name: "Natalie S.",
    role: "Owner at Bloom Aesthetics",
  },
  {
    text: "I was skeptical about influencer collabs, but they matched us with the perfect creators. Our brand awareness exploded overnight.",
    image: "https://i.pravatar.cc/150?img=12",
    name: "Ryan C.",
    role: "Co-Founder at Baja Brew Co.",
  },
  {
    text: "Professional, responsive, and they actually get results. I've tried three other agencies — Scale SD is the only one I've renewed with.",
    image: "https://i.pravatar.cc/150?img=48",
    name: "Melissa A.",
    role: "Owner at La Jolla Med Spa",
  },
  {
    text: "The content they create is on-brand every single time. Our customers constantly ask who does our social media — that says it all.",
    image: "https://i.pravatar.cc/150?img=13",
    name: "Brandon W.",
    role: "GM at Del Mar Auto Group",
  },
  {
    text: "Scale SD took over our Facebook ads cold and had them profitable within the first month. Wish we found them sooner.",
    image: "https://i.pravatar.cc/150?img=32",
    name: "Tanya V.",
    role: "Owner at Solana Beach Pilates",
  },
];

// Split into 3 columns (3 / 3 / 3)
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Single scrolling column ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/20 max-w-xs w-full bg-white/5 backdrop-blur-sm transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <blockquote className="m-0 p-0">
                  <p className="text-white/80 leading-relaxed font-normal m-0 text-sm">
                    "{text}"
                  </p>
                  <footer className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Photo of ${name}`}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-primary/40 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic tracking-tight leading-5 text-white text-sm">
                        {name}
                      </cite>
                      <span className="text-xs leading-5 tracking-tight text-white/50 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))]}
      </motion.ul>
    </div>
  );
};

// --- Main export used in page.tsx ---
export const TestimonialsSection = () => {
  return (
    <div
      className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
      role="region"
      aria-label="Scrolling client testimonials"
    >
      <TestimonialsColumn testimonials={firstColumn} duration={15} />
      <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
      <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
    </div>
  );
};

export default TestimonialsSection;
