import CurrencySelector from "@/components/currency-selector";
import HelpPopover from "@/components/help-popover";
import { Logo } from "@/components/logo";
import Link from "next/link";

function NavBar() {
	return (
		<nav className="bg-[#FF3B16] px-10 md:px-16">
			<div className="mx-auto flex h-16 max-w-(--breakpoint-4xl) items-center justify-between">
				<Link href="/">
					<Logo className="text-[#F7F4F0]" />
				</Link>
				<ul className="flex items-center gap-x-4">
					<li>
						<HelpPopover>Ayuda</HelpPopover>
					</li>
					<li>
						<a
							href="#calcula"
							className="font-semibold text-[#F7F4F0] text-md hover:underline"
						>
							Calcula tu precio
						</a>
					</li>
					<li>
						<CurrencySelector />
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
