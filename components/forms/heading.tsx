import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Heading({
	children,
	step,
	totalSteps,
}: {
	children: React.ReactNode;
	step: number;
	totalSteps: number;
}) {
	return (
		<div>
			<div className="flex gap-x-4">
				<Badge className="bg-[#C2F454] font-bold text-inherit text-lg hover:bg-[#C2F454]/80">
					Paso {step} de {totalSteps}
				</Badge>
				<h2 className="text-2xl">{children}</h2>
			</div>
			<Separator className="mt-10" />
		</div>
	);
}
