import CurrencySelector from "@/components/currency-selector";
import HelpPopover from "@/components/help-popover";
import { Logo } from "@/components/logo";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function NavBar() {
	const { userId } = await auth();

	return (
		<nav className="bg-primary px-4.5 sm:px-10 md:px-16">
			<div className="mx-auto flex h-16 max-w-(--breakpoint-4xl) items-center justify-between">
				<Link href="/">
					<Logo className="text-[#F7F4F0]" />
				</Link>
				<ul className="flex items-center gap-x-4">
					<li className="hidden sm:block">
						<HelpPopover>Ayuda</HelpPopover>
					</li>
					{userId ? (
						<li>
							<Link
								href="/dashboard"
								className="font-semibold text-[#F7F4F0] text-md hover:underline"
							>
								Dashboard
							</Link>
						</li>
					) : (
						<li className="hidden sm:block">
							<a
								href="#calcula"
								className="font-semibold text-[#F7F4F0] text-md hover:underline"
							>
								Calcula tu precio
							</a>
						</li>
					)}
					<li>
						<CurrencySelector />
					</li>
				</ul>
			</div>
		</nav>
	);
}
