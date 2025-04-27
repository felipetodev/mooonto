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
			<div
				className={cn(
					"sticky top-0 mt-10 mb-20 hidden h-[600px] w-40 place-items-center rounded bg-neutral-200 font-bold text-3xl md:grid",
					className,
				)}
			>
				{children}
			</div>
			<div
				className={cn(
					"mt-10 mb-20 grid h-32 w-full place-items-center rounded bg-neutral-200 font-bold text-3xl md:hidden",
					className,
				)}
			>
				{children}
			</div>
		</>
	);
}

export function AdsLayout({ children }: { children: React.ReactNode }) {
	return (
		<section id="calcula" className="bg-[#f7f4f0] px-10 md:px-16">
			<div className="mx-auto flex w-full max-w-(--breakpoint-4xl) flex-col md:flex-row">
				<AdComponent className="ml-auto">AD</AdComponent>
				<main className="w-full pt-10 pb-20 md:px-14">{children}</main>
				<AdComponent className="mr-auto">AD</AdComponent>
			</div>
		</section>
	);
}
