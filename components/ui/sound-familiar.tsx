'use client';

import { ZoomParallax, type Quote, type BodySegment } from '@/components/ui/zoom-parallax';

// All available quotes — assign to any layout slot freely.
// Changing a quote here only affects the layouts that reference its index.
const quotes: Quote[] = [
	{ quote: 'No one could explain what they were doing.', sub: 'Every question got a five-page report. Never a straight answer.' },          // 0
	{ quote: 'Cookie-cutter campaigns, copy-pasted.', sub: 'No strategy built around my business. Just a recycled formula.' },                 // 1
	{ quote: 'I felt like a small fish.', sub: 'Pitched by the expert, handed off to the most junior person.' },                               // 2
	{ quote: 'More excuses than results.', sub: 'Always "we need more time, more budget." Month after month.' },                               // 3
	{ quote: 'They ghosted me after month one.', sub: 'Emails ignored. Account rep gone. Basic communication paywalled.' },                    // 4
	{ quote: 'They held my accounts hostage.', sub: "Couldn't access my own Google or Meta accounts when I left." },                           // 5
	{ quote: 'I was locked in for 12 months.', sub: 'No performance clause. No way out. Just invoices with nothing to show.' },                // 6
	{ quote: 'I spent thousands and got nothing.', sub: 'Reports full of clicks and impressions. Phone never rang.' },                         // 7
];

// Each segment fades in sequentially. Highlighted phrases draw the eye.
const bodySegments: BodySegment[] = [
	{ text: "You've already tried " },
	{ text: 'marketing', highlight: 'orange' },
	{ text: ' before. They sent reports full of jargon, ' },
	{ text: 'promised results,', highlight: 'bold' },
	{ text: ' then just ' },
	{ text: 'disappeared', highlight: 'italic-orange' },
	{ text: ' when you had questions. Meanwhile, your phone ' },
	{ text: 'never rang', highlight: 'bold' },
	{ text: ' any more than it did before.' },
];

export function SoundFamiliar() {
	return (
		<section>
			<ZoomParallax
				quotes={quotes}
				bodySegments={bodySegments}
				promiseText="We do it differently — and we can prove it."
			/>
		</section>
	);
}
