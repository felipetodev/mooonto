import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainHero() {
	return (
		<section className="h-[700px] w-full bg-[#002446] px-10 md:px-16">
			<div className="mx-auto h-full max-w-(--breakpoint-4xl)">
				<div className="flex h-full max-w-3xl flex-col justify-center gap-y-10">
					<h1 className="flex flex-col font-bold font-dela-gothic text-[80px] leading-tight">
						<span>Dale valor a tu</span> <span>trabajo creativo</span>{" "}
						<span>
							con <span className="text-[#FF3B16]">mooonto</span>
						</span>
					</h1>

					<div className="flex flex-col gap-y-4">
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
							"w-max rounded-3xl font-bold text-[#002446] text-lg",
						)}
					>
						Calcula tu precio ahora, ¡es gratis!
					</a>
				</div>
			</div>
		</section>
	);
}
