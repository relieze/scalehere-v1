'use client';

import { ZoomParallax, type BodySegment } from '@/components/ui/zoom-parallax';

const panels = [
	{ type: 'center' as const },
	{ type: 'quote' as const, quote: 'More excuses than results.', sub: 'Always "we need more time, more budget." Month after month.' },
	{ type: 'quote' as const, quote: 'I spent thousands and got nothing.', sub: 'Reports full of clicks and impressions. Phone never rang.' },
	{ type: 'quote' as const, quote: 'They ghosted me after month one.', sub: 'Emails ignored. Account rep gone. Basic communication paywalled.' },
	{ type: 'quote' as const, quote: 'Cookie-cutter campaigns, copy-pasted.', sub: 'No strategy built around my business. Just a recycled formula.' },
	{ type: 'quote' as const, quote: 'They held my accounts hostage.', sub: "Couldn't access my own Google or Meta accounts when I left." },
	{ type: 'quote' as const, quote: 'I felt like a small fish.', sub: 'Pitched by the expert, handed off to the most junior person.' },
];

// Each segment fades in sequentially. Highlighted phrases draw the eye.
const bodySegments: BodySegment[] = [
	{ text: "You've tried " },
	{ text: 'marketing before.', highlight: 'orange' },
	{ text: ' They ' },
	{ text: 'promised results,', highlight: 'bold' },
	{ text: ' sent reports full of jargon, and ' },
	{ text: 'disappeared', highlight: 'italic-orange' },
	{ text: ' when you had questions. ' },
	{ text: 'Your phone never rang', highlight: 'bold' },
	{ text: ' any more than it did before.' },
];

export function SoundFamiliar() {
	return (
		<section>
			<ZoomParallax
				panels={panels}
				bodySegments={bodySegments}
				promiseText="We do it differently — and we can prove it."
			/>
		</section>
	);
}
