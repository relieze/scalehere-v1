'use client'
import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'motion/react'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { useContactDialog } from '@/lib/contact-dialog-context'

const trustStats = [
    { number: '100+', label: 'Clients Trust Us' },
    { number: '10+',  label: 'Years in Business' },
    { number: '50+',  label: 'Businesses Scaled' },
    { number: '$1M+', label: 'Revenue Generated' },
]

const trustLogos = [
    { src: 'https://svgl.app/library/instagram-wordmark.svg',  alt: 'Instagram', width: 120, height: 24 },
    { src: 'https://svgl.app/library/facebook-wordmark.svg',   alt: 'Facebook',  width: 110, height: 24 },
    { src: 'https://svgl.app/library/tiktok-wordmark-light.svg', alt: 'TikTok',  width: 100, height: 24 },
    { src: 'https://svgl.app/library/google-wordmark.svg',     alt: 'Google',    width: 90,  height: 24 },
    { src: 'https://svgl.app/library/linkedin.svg',            alt: 'LinkedIn',  width: 28,  height: 28 },
    { src: 'https://svgl.app/library/meta.svg',                alt: 'Meta',      width: 90,  height: 24 },
    { src: 'https://svgl.app/library/pinterest.svg',           alt: 'Pinterest', width: 28,  height: 28 },
]

// Logos that don't render cleanly with brightness-0 invert — rendered as text instead
const trustLogoText = ['YouTube', 'Snapchat']

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-clip">
                <section className="relative overflow-hidden min-h-screen">
                    {/* Brand accent — Scale SD chrome logo, below nav, top-right.
                        No side mask (was chopping the S). Soft bottom fade + low opacity
                        so the whole logo sits into the bg rather than on top of it. */}
                    <div
                        className="absolute left-1/2 top-20 md:top-24 -translate-x-1/2 w-[65%] md:w-[55%] lg:w-[48%] aspect-[3/2] pointer-events-none"
                        style={{
                            backgroundImage: 'url(/scale_sd_logo.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                            opacity: 0.5,
                        }}
                    />

                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-32">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="font-heading mt-8 max-w-2xl text-balance text-4xl sm:text-5xl font-black md:text-6xl lg:mt-4 xl:text-7xl">
                                    Stop Wasting Money on Marketing That Doesn't Bring Customers.
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg">
                                    We build revenue-generating marketing systems for San Diego businesses — in just 1 hour of your time per week.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Link
                                        href="#contact"
                                        className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-md pl-5 pr-3 text-base hover:scale-105 hover:shadow-lg duration-300")}>
                                        <span className="text-nowrap">Get Your Free Audit</span>
                                        <ChevronRight className="ml-1" />
                                    </Link>
                                    <Link
                                        href="#about"
                                        className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-12 rounded-md px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5")}>
                                        <span className="text-nowrap">Learn More</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust strip — absolute, flush to bottom of hero, above video layer */}
                    <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10 backdrop-blur-sm bg-black/40">

                        {/* Stacked: stats above logos — until viewport is wide enough for side-by-side to fit 4 stats in one row */}
                        <div className="xl:hidden py-3 flex flex-col gap-3">
                            {/* Stats — static, wraps until all 4 fit in one row */}
                            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 px-2">
                                {trustStats.map((stat) => (
                                    <div key={stat.number} className="flex flex-col gap-0.5 items-center">
                                        <span className="text-lg font-bold leading-none text-[#3B82F6]">{stat.number}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-white/60 whitespace-nowrap">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Aesthetic divider — inset, fades at ends */}
                            <div className="mx-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            {/* Logo marquee — arrays doubled so single-instance ≥ container width at stacked widths up to 1280px (guarantees the marquee always fills the row during the loop) */}
                            <div className="py-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                                <InfiniteSlider gap={48} speed={70} reverse>
                                    {[...trustLogos, ...trustLogos].map((logo, i) => (
                                        <img
                                            key={`${logo.alt}-${i}`}
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={logo.width}
                                            height={logo.height}
                                            className="h-4 w-auto pointer-events-none select-none opacity-50 brightness-0 invert"
                                        />
                                    ))}
                                    {[...trustLogoText, ...trustLogoText].map((name, i) => (
                                        <span
                                            key={`${name}-${i}`}
                                            className="text-xs font-medium tracking-wide text-white/40 whitespace-nowrap select-none"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </InfiniteSlider>
                            </div>
                        </div>

                        {/* xl+: 50/50 side-by-side — stats fit in one row at this width */}
                        <div className="hidden xl:flex items-center py-4">
                            {/* Logo marquee — left half, scrolls left (default). Arrays doubled to guarantee row fill at wide viewports */}
                            <div className="w-1/2 pr-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_78%,transparent)]">
                                <InfiniteSlider gap={56} speed={70} reverse>
                                    {[...trustLogos, ...trustLogos].map((logo, i) => (
                                        <img
                                            key={`${logo.alt}-${i}`}
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={logo.width}
                                            height={logo.height}
                                            className="h-5 w-auto pointer-events-none select-none opacity-50 brightness-0 invert"
                                        />
                                    ))}
                                    {[...trustLogoText, ...trustLogoText].map((name, i) => (
                                        <span
                                            key={`${name}-${i}`}
                                            className="text-sm font-medium tracking-wide text-white/40 whitespace-nowrap select-none"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </InfiniteSlider>
                            </div>
                            {/* Vertical divider — centered */}
                            <div className="w-px self-stretch bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />
                            {/* Stats — right half, static. Distribute with equal space between items and at both ends (justify-evenly) so the row spans the full half-width */}
                            <div className="w-1/2 pl-8">
                                <div className="flex flex-wrap justify-evenly items-center gap-y-2">
                                    {trustStats.map((stat) => (
                                        <div key={stat.number} className="flex flex-col gap-0.5 items-center">
                                            <span className="text-2xl font-bold leading-none text-[#3B82F6]">{stat.number}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-white/60 whitespace-nowrap">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()
    const { openDialog } = useContactDialog()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    // Close mobile menu on scroll
    React.useEffect(() => {
        const handleScroll = () => { if (menuState) setMenuState(false) }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [menuState])

    return (
        <header>
            {/* Backdrop — tapping outside the menu closes it */}
            {menuState && (
                <div
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setMenuState(false)}
                />
            )}
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-[300] w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-5', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <span className="text-xl font-bold tracking-tight">Scale SD</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuState(false)}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <button
                                    onClick={() => { setMenuState(false); openDialog(); }}
                                    className={cn(buttonVariants({ size: "sm" }), "rounded-md hover:scale-105 hover:shadow-lg duration-300")}>
                                    <span>Free Audit</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
