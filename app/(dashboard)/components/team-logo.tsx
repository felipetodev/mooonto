"use client";
import { CuttedLogo, Logo } from "@/components/logo";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function TeamLogo() {
	const { open, isMobile } = useSidebar();

	return (
		<span
			className={cn("mt-2 px-2", {
				"px-2": open,
				"px-1": !open,
			})}
		>
			{open || isMobile ? (
				<Logo className="w-40 text-primary" />
			) : (
				<CuttedLogo className="text-primary" />
			)}
		</span>
	);
}
