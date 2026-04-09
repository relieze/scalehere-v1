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

	// bodyProgress: 0-1 mapped over the body-text scroll window
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

	// Center headline grows to fill the screen as quotes zoom past
	const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 2]);

	// Quote card scales — zoom in aggressively around the center
	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
	const quoteScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	// Body text holds fully visible until 87%, then fades out
	const bodyFadeOut = useTransform(scrollYProgress, [0.87, 0.94], [1, 0]);

	// Promise text fades in at the very end
	const promiseOpacity = useTransform(scrollYProgress, [0.94, 1.0], [0, 1]);
	const promiseY = useTransform(scrollYProgress, [0.94, 1.0], [14, 0]);

	// Per-segment opacity: each phrase fades in sequentially across bodyProgress 0→1
	const N = bodySegments?.length ?? 0;
	const getSegmentOpacity = (i: number): number => {
		if (N === 0) return 1;
		const segStart = i / N;
		const segEnd = Math.min(1, (i + 1.5) / N);
		return Math.max(0, Math.min(1, (bodyProgress - segStart) / (segEnd - segStart)));
	};

	const positionClasses = [
		'[&>div]:!-top-[33vh] [&>div]:!-left-[8vw] [&>div]:!h-[18vh] [&>div]:!w-[30vw]',   // 0: Cookie-cutter campaigns
		'[&>div]:!-top-[20vh] [&>div]:!-left-[36vw] [&>div]:!h-[45vh] [&>div]:!w-[13vw]',  // 1: No one could explain what they were doing
		'[&>div]:!-top-[5vh] [&>div]:!left-[20vw] [&>div]:!h-[38vh] [&>div]:!w-[13vw]',    // 2: They held my accounts hostage
		'[&>div]:!top-[22vh] [&>div]:!-left-[28vw] [&>div]:!h-[20vh] [&>div]:!w-[22vw]',   // 3: More excuses than results
		'[&>div]:!top-[26vh] [&>div]:!left-[5vw] [&>div]:!h-[18vh] [&>div]:!w-[38vw]',    // 4: I was locked in for 12 months
		'[&>div]:!top-[10vh] [&>div]:!left-[34vw] [&>div]:!h-[55vh] [&>div]:!w-[12vw]',    // 5: I spent thousands and got nothing
		'[&>div]:!-top-[36vh] [&>div]:!left-[25vw] [&>div]:!h-[18vh] [&>div]:!w-[26vw]',   // 6: They ghosted me after month one
		'[&>div]:!-top-[6vh] [&>div]:!-left-[22vw] [&>div]:!h-[30vh] [&>div]:!w-[12vw]',   // 7: I felt like a small fish
	];

	return (
		<div ref={container} className="relative h-[400vh]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{panels.map((panel, index) => {
					// Center panel: grows gently as anchor while quotes zoom around it
					if (panel.type === 'center') {
						return (
							<motion.div
								key={index}
								style={{ scale: scaleCenter }}
								className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
							>
								<div className="flex flex-col items-center text-center max-w-md px-8">
									{/* Eyebrow */}
									<p className="text-xs uppercase tracking-[0.35em] text-primary/70 mb-4 font-medium">
										Sound Familiar?
									</p>

									{/* Headline — always visible */}
									<h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight">
										Most Agencies Fail Their Clients.
									</h2>

									{/* Shared slot — body and promise cross-fade, fixed height so headline never shifts */}
									{(bodySegments || promiseText) && (
										<div className="relative mt-6 h-32 w-full">
											{/* Word-by-word body text */}
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

											{/* Promise — fades in at the very end */}
											{promiseText && (
												<motion.p
													style={{ opacity: promiseOpacity, y: promiseY }}
													className="absolute inset-0 flex items-center justify-center text-base md:text-lg text-primary font-semibold tracking-wide"
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

					// Quote panels: zoom in dramatically around the center
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
