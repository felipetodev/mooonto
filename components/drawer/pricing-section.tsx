import { Badge } from "../ui/badge";

export type EmploymentType = "freelance" | "contractor";

interface PricingSectionProps {
	type: EmploymentType;
	isValueContributor?: boolean;
}

export function PricingSection({
	type,
	isValueContributor = false,
}: PricingSectionProps) {
	return (
		<div className="mt-6 grid grid-cols-2 sm:gap-x-4 md:mt-8 md:gap-x-8">
			<div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
				<h4 className="px-1 text-sm sm:px-0 md:text-base">
					{isValueContributor ? "Precio hora" : "Precio hora mínimo"}
				</h4>
				<span>
					<Badge
						variant="secondary"
						className="font-bold text-inherit md:text-lg"
					>
						{type === "freelance" ? "Siendo freelance" : "Estando contratado"}
					</Badge>
				</span>
			</div>
			<div className="flex items-center justify-between gap-x-2">
				<p className="max-w-[250px] text-xs md:max-w-xs md:text-sm">
					{type === "freelance"
						? "Resultado para 20 días laborales al mes y 8h x día"
						: "Resultado para 20 días laborales al mes y 4h x día de trabajo 100% productivo"}
				</p>
				<p>
					<Badge
						variant="outline"
						className="block font-bold text-inherit md:text-lg"
					>
						$156
					</Badge>
				</p>
			</div>
		</div>
	);
}
