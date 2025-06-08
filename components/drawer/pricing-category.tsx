import {
	type EmploymentType,
	PricingSection,
} from "@/components/drawer/pricing-section";

interface PricingCategoryProps {
	title: string;
	amount: string;
	type: EmploymentType;
	isValueContributor?: boolean;
}

export function PricingCategory({
	title,
	amount,
	type,
	isValueContributor,
}: PricingCategoryProps) {
	return (
		<div className="grid">
			<div className="flex items-end justify-between space-x-4 md:items-center">
				<h3 className="text-pretty font-bold text-xl md:text-2xl">{title}</h3>
				<span className="px-2 font-bold text-xs md:text-lg">{amount}</span>
			</div>
			<div className="my-2 h-[2px] w-full bg-gray-300/50" />
			<PricingSection type={type} isValueContributor={isValueContributor} />
			<PricingSection
				type={type === "freelance" ? "contractor" : "freelance"}
				isValueContributor={isValueContributor}
			/>
		</div>
	);
}
