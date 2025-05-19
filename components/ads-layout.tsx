import { cn } from "@/lib/utils";

function AdComponent({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<>
			<aside
				className={cn(
					"sticky top-10 mt-0 mb-20 hidden h-[600px] w-40 place-items-center rounded bg-neutral-200 font-bold text-3xl md:mt-10 md:grid",
					className,
				)}
			>
				{children}
			</aside>
			<aside
				className={cn(
					"my-10 grid h-32 w-full place-items-center rounded bg-neutral-200 font-bold text-3xl sm:mb-10 md:mb-20 md:hidden",
					className,
				)}
			>
				{children}
			</aside>
		</>
	);
}

export function AdsLayout({ children }: { children: React.ReactNode }) {
	return (
		<section id="calcula" className="bg-[#f7f4f0] px-4.5 sm:px-10 md:px-16">
			<div className="mx-auto flex w-full max-w-(--breakpoint-4xl) flex-col md:flex-row">
				<AdComponent className="ml-auto">AD</AdComponent>
				<main className="w-full pt-10 pb-20 md:px-14">{children}</main>
				<AdComponent className="mr-auto">AD</AdComponent>
			</div>
		</section>
	);
}
