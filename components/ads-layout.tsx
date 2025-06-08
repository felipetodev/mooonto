"use client";

import { cn } from "@/lib/utils";
import { SquareXIcon } from "lucide-react";
import { useState } from "react";

function AdComponent({
	className,
	children,
	onHandleCloseAd,
}: {
	className?: string;
	onHandleCloseAd?: () => void;
	children: React.ReactNode;
}) {
	return (
		<>
			<aside
				className={cn(
					"sticky top-10 mt-0 mb-20 hidden h-[calc(100vh-100px)] w-40 place-items-center rounded-xl bg-neutral-200 p-1.5 font-bold text-3xl text-primary/70 md:mt-10 md:grid",
					className,
				)}
			>
				<button
					type="button"
					onClick={onHandleCloseAd}
					className="absolute top-2 right-2 rounded bg-primary text-white hover:bg-primary/80"
				>
					<SquareXIcon size={20} />
				</button>
				{children}
			</aside>
			<aside
				className={cn(
					"relative my-10 grid h-32 w-full place-items-center rounded-xl bg-neutral-200 p-1.5 font-bold text-3xl text-primary/70 sm:mb-10 md:mb-20 md:hidden",
					className,
				)}
			>
				<button
					type="button"
					onClick={onHandleCloseAd}
					className="absolute top-2 right-2 rounded bg-primary text-white hover:bg-primary/80"
				>
					<SquareXIcon size={20} />
				</button>
				{children}
			</aside>
		</>
	);
}

export function AdsLayout({ children }: { children: React.ReactNode }) {
	const isAdsEnabled = false;
	const [showAds, setShowAds] = useState(isAdsEnabled);
	return (
		<section id="calcula" className="bg-[#f7f4f0] px-4.5 sm:px-10 md:px-16">
			<div className="mx-auto flex w-full max-w-(--breakpoint-4xl) flex-col md:flex-row">
				{showAds ? (
					<AdComponent
						className="ml-auto"
						onHandleCloseAd={() => setShowAds(false)}
					>
						<div className="flex h-full w-full items-center justify-between rounded-lg px-6 text-center text-xs md:grid md:w-auto md:items-start md:justify-start md:px-0 md:py-8">
							<span className="md:mb-auto">Sponsors</span>
							<span className="md:mt-auto">Sponsors</span>
						</div>
					</AdComponent>
				) : null}
				<main
					className={cn("w-full pt-10 pb-20", {
						"md:px-14": showAds,
					})}
				>
					{children}
				</main>
				{showAds ? (
					<AdComponent
						className="mr-auto"
						onHandleCloseAd={() => setShowAds(false)}
					>
						<div className="flex h-full w-full items-center justify-between rounded-lg px-6 text-center text-xs md:grid md:w-auto md:items-start md:justify-start md:px-0 md:py-8">
							<span className="md:mb-auto">Sponsors</span>
							<span className="md:mt-auto">Sponsors</span>
						</div>
					</AdComponent>
				) : null}
			</div>
		</section>
	);
}
