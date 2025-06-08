import { InfoIcon } from "lucide-react";

export function DrawerFooter() {
	return (
		<div className="mt-14 flex space-x-3">
			<span>
				<InfoIcon className="size-5 fill-[#0075FF] stroke-white" />
			</span>
			<p className="text-pretty text-[10px] md:text-xs">
				Recuerda que estos valores son estimativos y pueden variar según tu
				situación personal y el mercado laboral. Te recomendamos revisar tus
				gastos e ingresos regularmente.
			</p>
		</div>
	);
}
