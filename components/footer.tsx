import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/ui/icons";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full bg-[#002446] px-10 pt-24 pb-8 md:px-16">
			<div className="mx-auto h-full max-w-(--breakpoint-4xl)">
				<div className="flex justify-between">
					<Link href="/" className="h-max">
						<Logo className="text-[#FF3B16]" />
					</Link>
					<div className="grid grid-cols-2">
						<ul className="space-y-8 text-sm [&_a]:transition-colors [&_a]:hover:text-[#FF3B16]">
							<li>
								<Link href="/">¿Quiénes somos?</Link>
							</li>
							<li>
								<Link href="/">¿Porqué Mooonto?</Link>
							</li>
							<li>
								<Link href="/">Politica de privacidad</Link>
							</li>
						</ul>
						<ul className="space-y-8 text-sm [&_a]:transition-colors [&_a]:hover:text-[#FF3B16]">
							<li>
								<a href="#" className="flex items-center">
									<InstagramIcon className="mr-2 h-6 w-6" />
									Síguenos en Instagram
								</a>
							</li>
							<li>
								<a href="#">Discord</a>
							</li>
							<li>
								<a href="#">Contáctanos</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-24 flex justify-between text-xs opacity-50">
					<span>
						Copyright © {new Date().getFullYear()} Mooonto. All Rights Reserved.
					</span>
					<span>
						<a
							className="hover:underline"
							href="https://www.ls.graphics/illustrations"
							rel="noopener noreferrer"
							target="_blank"
						>
							Illustrations by LS Graphics.
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
