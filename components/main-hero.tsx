import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainHero() {
	return (
		<section className="relative h-[calc(100svh-64px)] w-full overflow-hidden px-10 md:px-16 lg:h-[700px]">
			<div className="mx-auto flex h-full max-w-(--breakpoint-4xl) flex-col lg:flex-row">
				<div className="mt-10 flex h-full max-w-3xl flex-col justify-center gap-y-10 sm:mt-20 lg:mt-auto">
					<h1 className="flex flex-col font-bold font-dela-gothic leading-tight [font-size:clamp(2em,4vw,100px)]">
						<span>Dale valor a tu</span> <span>trabajo creativo</span>{" "}
						<span>
							con <span className="text-[#FF3B16]">mooonto</span>
						</span>
					</h1>

					<div className="flex flex-col gap-y-4 text-pretty sm:text-wrap">
						<p>
							Mooonto es una herramienta para creativos autónomos, freelance o
							empleados que ayuda a calcular el valor/hora de su trabajo en base
							en tus propios datos y costos de vida.
						</p>
						<p>
							Si definimos nuestro valor real podemos elevar los estándares
							salariales de la industria creativa
						</p>
						<p>
							Conoce tu valor/hora como freelance dentro de la industria
							creativa. Esta herramienta está basada en la plantilla “Calcula tu
							precio” de Marco Creativo.
						</p>
					</div>

					<a
						href="#calcula"
						className={cn(
							buttonVariants({ variant: "secondary" }),
							"rounded-3xl font-bold text-[#1A1A18] sm:w-max sm:text-lg",
						)}
					>
						Calcula tu precio ahora, ¡es gratis!
					</a>
				</div>
				<div className="lg:-mr-10 lg:-mb-70 xl:-mb-100 relative mt-20 block w-full scale-140 md:mt-20 lg:scale-180 xl:mr-auto xl:scale-150">
					<img
						src="/hero.webp"
						alt="mooonto"
						className="-scale-x-100 mx-auto h-full max-w-5/6 object-contain lg:w-full"
					/>
				</div>
			</div>
		</section>
	);
}
