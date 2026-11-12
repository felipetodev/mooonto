"use client";

import { motion } from "motion/react";

/**
 * Expands/collapses its children.
 *
 * It stays mounted so the surrounding `space-y-*` margins never change
 * mid-animation (they would pop when a last/non-last child is removed).
 * - `className` goes on the inner wrapper: use it for spacing that must
 *   collapse together with the content (e.g. `pb-8`).
 * - `collapsedMarginTop` cancels a gap left by the previous sibling when this
 *   is the last child of a `space-y-*` stack.
 */
export function Reveal({
	show,
	children,
	className,
	collapsedMarginTop = 0,
}: {
	show: boolean;
	children: React.ReactNode;
	className?: string;
	collapsedMarginTop?: number | string;
}) {
	return (
		<motion.div
			inert={!show}
			initial={false}
			animate={
				show
					? { height: "auto", opacity: 1, marginTop: 0, visibility: "visible" }
					: {
							height: 0,
							opacity: 0,
							marginTop: collapsedMarginTop,
							transitionEnd: { visibility: "hidden" },
						}
			}
			transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
			// mb-0 beats space-y's margin; px/-mx keeps focus rings from being clipped.
			className="-mx-1 mb-0 overflow-hidden px-1"
		>
			<div className={className}>{children}</div>
		</motion.div>
	);
}
