import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Heading({
	children,
	step,
	totalSteps,
	separator = true,
}: {
	children: React.ReactNode;
	step: number;
	totalSteps: number;
	separator?: boolean;
}) {
	return (
		<div>
			<div className="flex flex-wrap gap-2 sm:gap-4">
				<Badge variant="secondary" className="font-bold text-inherit text-lg ">
					Paso {step} de {totalSteps}
				</Badge>
				<h2 className="text-2xl">{children}</h2>
			</div>
			{separator && <Separator className="mt-10" />}
		</div>
	);
}
