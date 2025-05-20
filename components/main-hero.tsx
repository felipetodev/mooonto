import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainHero() {
	return (
		<section className="relative h-[calc(100vh-64px)] w-full overflow-hidden px-4.5 sm:px-10 md:px-16 lg:h-[700px]">
			<div className="mx-auto flex h-full max-w-(--breakpoint-4xl) flex-col lg:flex-row">
				<div className="z-10 mt-10 flex h-full max-w-3xl flex-col justify-center gap-y-10 md:mt-20 lg:mt-auto">
					<h1 className="flex flex-col text-balance font-bold font-dela-gothic text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-6xl 2xl:text-[65px]">
						Dale valor a tu trabajo creativo con{" "}
						<span className="text-[#FF3B16]">mooonto</span>
					</h1>

					<div className="flex flex-col gap-y-4">
						<p className="text-balance text-base sm:text-pretty sm:text-medium md:text-lg">
							Mooonto es una herramienta que te ayuda a calcular el precio por
							hora de tu trabajo en base en tus propios datos y costos de vida.
						</p>
					</div>

					<a
						href="#calcula"
						className={cn(
							buttonVariants({ variant: "secondary" }),
							"rounded-3xl font-bold text-md sm:w-max sm:text-lg",
						)}
					>
						Calcula tu precio ahora, ¡es gratis!
					</a>
					<span />
				</div>
				<div className="lg:-mr-10 -mt-25 mx-auto xs:mt-0 flex min-h-[700px] sm:min-h-[500px] md:min-w-[200px] lg:min-h-[1000px] lg:min-w-[500px] xl:mr-auto 2xl:min-w-[500px]">
					<img
						decoding="sync"
						loading="eager"
						src="/hero.webp"
						alt="mooonto"
						className="-scale-x-100 w-full object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
