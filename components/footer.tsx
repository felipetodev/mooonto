import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/ui/icons";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="relative w-full overflow-hidden px-4.5 pt-24 pb-8 sm:px-10 md:px-16">
			<div className="mx-auto h-full max-w-(--breakpoint-4xl)">
				<div className="relative flex flex-col justify-between gap-y-8 md:flex-row md:gap-y-0">
					<div className="-right-18 sm:-right-10 md:-top-20 -z-10 absolute top-50 w-[430px] sm:top-10 sm:w-[500px] md:left-[27%]">
						<img src="/footer.webp" alt="footer" className="size-full" />
					</div>
					<Link href="/" className="h-max">
						<Logo className="text-[#FF3B16]" />
					</Link>
					<div className="grid gap-y-4 md:grid-cols-2 md:gap-y-0 md:text-shadow-md">
						<ul className="space-y-5 text-sm md:space-y-8 [&_a]:transition-colors [&_a]:hover:text-[#FF3B16]">
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

						<ul className="space-y-5 text-sm md:space-y-8 [&_a]:transition-colors [&_a]:hover:text-[#FF3B16]">
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
				<div className="mt-60 flex justify-between text-shadow-sm text-xs opacity-50 sm:mt-24">
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
