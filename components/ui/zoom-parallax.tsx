'use client';

import { useTransform, motion, useMotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface Panel {
	type: 'center' | 'quote';
	quote?: string;
	sub?: string;
}

export interface BodySegment {
	text: string;
	highlight?: 'orange' | 'bold' | 'italic-orange';
}

interface ZoomParallaxProps {
	panels: Panel[];
	bodySegments?: BodySegment[];
	promiseText?: string;
}

function getHighlightClass(highlight?: string): string {
	switch (highlight) {
		case 'orange': return 'text-primary font-medium';
		case 'bold': return 'font-semibold text-foreground';
		case 'italic-orange': return 'italic text-primary font-semibold';
		default: return 'text-muted-foreground';
	}
}


export function ZoomParallax({ panels, bodySegments, promiseText }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const scrollYProgress = useMotionValue(0);
	const [bodyProgress, setBodyProgress] = useState(0);

	const BODY_START = 0.12;
	const BODY_END = 0.75;

	useEffect(() => {
		const updateProgress = () => {
			const el = container.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const totalScrollable = rect.height - window.innerHeight;
			const scrolled = -rect.top;
			const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
			scrollYProgress.set(progress);

			const bodyP = (progress - BODY_START) / (BODY_END - BODY_START);
			setBodyProgress(Math.max(0, Math.min(1, bodyP)));
		};

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();
		return () => window.removeEventListener('scroll', updateProgress);
	}, [scrollYProgress]);

	// Center headline grows gently while quotes zoom past
	const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 2]);
	const scaleCenterMobile = useTransform(scrollYProgress, [0, 1], [1, 1.3]); // mobile — stays within viewport

	// Quote card scales
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
	const quoteScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Body text fades out near the end, promise text fades in
	const bodyFadeOut = useTransform(scrollYProgress, [0.87, 0.94], [1, 0]);
	const promiseOpacity = useTransform(scrollYProgress, [0.94, 1.0], [0, 1]);
	const promiseY = useTransform(scrollYProgress, [0.94, 1.0], [14, 0]);

	// Per-segment opacity: each phrase fades in sequentially
	const N = bodySegments?.length ?? 0;
	const getSegmentOpacity = (i: number): number => {
		if (N === 0) return 1;
		const segStart = i / N;
		const segEnd = Math.min(1, (i + 1.5) / N);
		return Math.max(0, Math.min(1, (bodyProgress - segStart) / (segEnd - segStart)));
	};

	// Desktop scattered positions (unchanged)
	const positionClasses = [
		'[&>div]:!-top-[33vh] [&>div]:!-left-[8vw] [&>div]:!h-[18vh] [&>div]:!w-[30vw]',
		'[&>div]:!-top-[20vh] [&>div]:!-left-[36vw] [&>div]:!h-[45vh] [&>div]:!w-[13vw]',
		'[&>div]:!-top-[5vh] [&>div]:!left-[20vw] [&>div]:!h-[38vh] [&>div]:!w-[13vw]',
		'[&>div]:!top-[22vh] [&>div]:!-left-[28vw] [&>div]:!h-[20vh] [&>div]:!w-[22vw]',
		'[&>div]:!top-[26vh] [&>div]:!left-[5vw] [&>div]:!h-[18vh] [&>div]:!w-[38vw]',
		'[&>div]:!top-[10vh] [&>div]:!left-[34vw] [&>div]:!h-[55vh] [&>div]:!w-[12vw]',
		'[&>div]:!-top-[36vh] [&>div]:!left-[25vw] [&>div]:!h-[18vh] [&>div]:!w-[26vw]',
		'[&>div]:!-top-[6vh] [&>div]:!-left-[22vw] [&>div]:!h-[30vh] [&>div]:!w-[12vw]',
	];

	// Center panel — accepts scale + optional class for vertical offset (e.g. tablet push-up)
	const makeCenterPanel = (scale: ReturnType<typeof useTransform>, extraClass = '') => (
		<motion.div
			style={{ scale }}
			className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none ${extraClass}`}
		>
			<div className="flex flex-col items-center text-center w-[75vw] px-0">
				<p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
					Sound Familiar?
				</p>
				<h2 className="font-heading text-2xl md:text-5xl font-bold leading-tight">
					Most Agencies Fail Their Clients.
				</h2>
				{(bodySegments || promiseText) && (
					<div className="relative mt-6 h-32 w-full">
						{bodySegments && (
							<motion.div
								style={{ opacity: bodyFadeOut }}
								className="absolute inset-0 text-sm md:text-base leading-relaxed"
							>
								{bodySegments.map((seg, i) => (
									<span
										key={i}
										style={{
											opacity: getSegmentOpacity(i),
											transition: 'opacity 0.5s ease',
										}}
										className={`${getHighlightClass(seg.highlight)}${seg.highlight ? ' whitespace-nowrap' : ''}`}
									>
										{seg.text}
									</span>
								))}
							</motion.div>
						)}
						{promiseText && (
							<motion.p
								style={{ opacity: promiseOpacity, y: promiseY }}
								className="absolute inset-0 flex items-center justify-center text-base md:text-lg text-primary font-semibold tracking-wide text-center"
							>
								{promiseText}
							</motion.p>
						)}
					</div>
				)}
			</div>
		</motion.div>
	);

	// Shared zero motion value — used wherever a card needs no translate
	const zero = useMotionValue(0);

	// Mobile scale values — depth stepping: top far back, bottom closest
	const scaleMobile1 = useTransform(scrollYProgress, [0, 1], [1, 2]);
	const scaleMobile2 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scaleMobile3 = useTransform(scrollYProgress, [0, 1], [1, 12]);

	// Mobile translate — middle drifts slightly left, bottom slightly right
	const mobileMidX    = useTransform(scrollYProgress, [0, 1], [0, -120]);
	const mobileBottomX = useTransform(scrollYProgress, [0, 1], [0,  120]);

	// ── MOBILE CARDS ───────────────────────────────────────────────────────────
	// 3 cards: panels[1] above center, panels[4] + panels[7] below.
	const mobileCards = [
		{ panel: panels[1], scale: scaleMobile1, x: zero,   y: zero, pos: '[&>div]:!-top-[38vh] [&>div]:!h-[14vh] [&>div]:!w-[78vw]' },
		{ panel: panels[4], scale: scaleMobile2, x: mobileMidX,    y: zero, pos: '[&>div]:!top-[16vh] [&>div]:!h-[14vh] [&>div]:!w-[78vw]' },
		{ panel: panels[7], scale: scaleMobile3, x: mobileBottomX, y: zero, pos: '[&>div]:!top-[33vh] [&>div]:!h-[14vh] [&>div]:!w-[78vw]' },
	];

	// Tablet scale — depth via stepping: row 1 far back, row 3 closest
	const scaleTablet1 = useTransform(scrollYProgress, [0, 1], [1, 3]);
	const scaleTablet2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scaleTablet3 = useTransform(scrollYProgress, [0, 1], [1, 8]);

	// Tablet translate — rows 2 and 3 same lateral speed, row 3 also drifts down
	const tabletXLeft  = useTransform(scrollYProgress, [0, 1], [0, -450]);
	const tabletXRight = useTransform(scrollYProgress, [0, 1], [0,  450]);
	const tabletYDown  = useTransform(scrollYProgress, [0, 1], [0,  280]);

	// ── TABLET CARDS ───────────────────────────────────────────────────────────
	const tabletCards = [
		// Row 1 — scale only, no translate (far back)
		{ panel: panels[1], scale: scaleTablet1, x: zero,  y: zero, pos: '[&>div]:!-top-[38vh] [&>div]:!-left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
		{ panel: panels[2], scale: scaleTablet1, x: zero,  y: zero, pos: '[&>div]:!-top-[38vh] [&>div]:!left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
		// Row 2 — flies left/right, mid depth
		{ panel: panels[3], scale: scaleTablet2, x: tabletXLeft,  y: zero, pos: '[&>div]:!top-[12vh] [&>div]:!-left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
		{ panel: panels[4], scale: scaleTablet2, x: tabletXRight, y: zero, pos: '[&>div]:!top-[12vh] [&>div]:!left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
		// Row 3 — same lateral speed as row 2, also drifts down, closest/most zoom
		{ panel: panels[5], scale: scaleTablet3, x: tabletXLeft,  y: tabletYDown, pos: '[&>div]:!top-[30vh] [&>div]:!-left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
		{ panel: panels[6], scale: scaleTablet3, x: tabletXRight, y: tabletYDown, pos: '[&>div]:!top-[30vh] [&>div]:!left-[24vw] [&>div]:!h-[16vh] [&>div]:!w-[42vw]' },
	];

	// Both layouts rendered simultaneously — CSS breakpoints toggle visibility
	// instantly on paint, eliminating the JS-state flash on page refresh.
	return (
		<div ref={container} className="relative h-[400vh]">

			{/* ── MOBILE LAYOUT (hidden at md+) ─────────────────────────────── */}
			<div className="md:hidden sticky top-0 h-screen overflow-hidden">
				{makeCenterPanel(scaleCenterMobile)}
				{mobileCards.map(({ panel, scale, x, y, pos }, i) => (
					<motion.div
						key={i}
						style={{ scale, x, y }}
						className={`absolute top-0 flex h-full w-full items-center justify-center ${pos}`}
					>
						<div className="relative flex flex-col justify-between p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
							<span className="absolute top-1 right-1 text-[17rem] leading-none text-primary/10 font-serif select-none">
								&ldquo;
							</span>
							<p style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)' }} className="font-accent italic font-semibold text-foreground leading-snug relative z-10">
								&ldquo;{panel.quote}&rdquo;
							</p>
							<p style={{ fontSize: 'clamp(0.65rem, 2.8vw, 0.85rem)' }} className="text-muted-foreground leading-relaxed mt-2">
								{panel.sub}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* ── TABLET LAYOUT (md to lg) ──────────────────────────────────── */}
			<div className="hidden md:block lg:hidden sticky top-0 h-screen overflow-hidden">
				{makeCenterPanel(scaleCenterMobile, 'pb-[12vh]')}
				{tabletCards.map(({ panel, scale, x, y, pos }, i) => (
					<motion.div
						key={i}
						style={{ scale, x, y }}
						className={`absolute top-0 flex h-full w-full items-center justify-center ${pos}`}
					>
						<div className="relative flex flex-col justify-between p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
							<span className="absolute top-1 right-1 text-[17rem] leading-none text-primary/10 font-serif select-none">
								&ldquo;
							</span>
							<p style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }} className="font-accent italic font-semibold text-foreground leading-snug relative z-10">
								&ldquo;{panel.quote}&rdquo;
							</p>
							<p style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)' }} className="text-muted-foreground leading-relaxed mt-2">
								{panel.sub}
							</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* ── DESKTOP LAYOUT (hidden below lg) ──────────────────────────── */}
			<div className="hidden lg:block sticky top-0 h-screen overflow-hidden">
				{panels.map((panel, index) => {
					if (panel.type === 'center') {
						return (
							<motion.div
								key={index}
								style={{ scale: scaleCenter }}
								className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
							>
								<div className="flex flex-col items-center text-center max-w-md px-8">
									<p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
										Sound Familiar?
									</p>
									<h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
										Most Agencies Fail Their Clients.
									</h2>
									{(bodySegments || promiseText) && (
										<div className="relative mt-6 h-32 w-full">
											{bodySegments && (
												<motion.div
													style={{ opacity: bodyFadeOut }}
													className="absolute inset-0 text-sm md:text-base leading-relaxed"
												>
													{bodySegments.map((seg, i) => (
														<span
															key={i}
															style={{
																opacity: getSegmentOpacity(i),
																transition: 'opacity 0.5s ease',
															}}
															className={`${getHighlightClass(seg.highlight)}${seg.highlight ? ' whitespace-nowrap' : ''}`}
														>
															{seg.text}
														</span>
													))}
												</motion.div>
											)}
											{promiseText && (
												<motion.p
													style={{ opacity: promiseOpacity, y: promiseY }}
													className="absolute inset-0 flex items-center justify-center text-base md:text-lg text-primary font-semibold tracking-wide text-center"
												>
													{promiseText}
												</motion.p>
											)}
										</div>
									)}
								</div>
							</motion.div>
						);
					}

					const quoteIndex = index - 1;
					const scale = quoteScales[quoteIndex % quoteScales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${positionClasses[quoteIndex] ?? ''}`}
						>
							<div className="relative flex flex-col justify-between h-[25vh] w-[25vw] p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
								<span className="absolute top-1 right-1 text-[17rem] leading-none text-primary/10 font-serif select-none">
									&ldquo;
								</span>
								<p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 2.2rem)' }} className="font-accent italic font-semibold text-foreground leading-snug relative z-10">
									&ldquo;{panel.quote}&rdquo;
								</p>
								<p style={{ fontSize: 'clamp(0.65rem, 0.85vw, 1rem)' }} className="text-muted-foreground leading-relaxed mt-2">
									{panel.sub}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>

		</div>
	);
}
