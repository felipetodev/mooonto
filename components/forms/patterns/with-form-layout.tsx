import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/forms/heading";

interface FormLayoutConfig {
	variant?: "default" | "accordion";
	title: React.ReactNode;
	step?: number;
	totalSteps?: number;
	defaultOpen?: boolean;
	className?: string;
}

// HOC that adds form layout capabilities to any component
export function withFormLayout<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	config: FormLayoutConfig,
) {
	const WithFormLayoutComponent = (props: P) => {
		const {
			variant = "default",
			title,
			step,
			totalSteps,
			defaultOpen = true,
			className,
		} = config;

		if (variant === "accordion") {
			return (
				<Accordion
					type="single"
					collapsible
					className={`w-full ${className || ""}`}
					defaultValue={defaultOpen ? "item-1" : undefined}
				>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							{step && totalSteps ? (
								<Heading step={step} totalSteps={totalSteps} separator={false}>
									{title}
								</Heading>
							) : (
								title
							)}
						</AccordionTrigger>
						<AccordionContent className="flex flex-col">
							<WrappedComponent {...props} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			);
		}

		return (
			<div className={`flex flex-col ${className || ""}`}>
				{step && totalSteps ? (
					<Heading step={step} totalSteps={totalSteps}>
						{title}
					</Heading>
				) : (
					<div className="mb-6">
						<h2 className="text-2xl font-semibold">{title}</h2>
					</div>
				)}
				<WrappedComponent {...props} />
			</div>
		);
	};

	WithFormLayoutComponent.displayName = `withFormLayout(${WrappedComponent.displayName || WrappedComponent.name})`;

	return WithFormLayoutComponent;
}

// Example usage:
// const WorkExpensesFormWithLayout = withFormLayout(WorkExpensesFormContent, {
//   variant: "accordion",
//   title: "Work Expenses",
//   step: 1,
//   totalSteps: 2
// });
