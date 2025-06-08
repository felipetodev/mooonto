import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/forms/heading";
import { cn } from "@/lib/utils";

interface FormWrapperProps {
	children: React.ReactNode;
	variant?: "default" | "accordion";
	title: React.ReactNode;
	step?: number;
	totalSteps?: number;
	defaultOpen?: string;
	className?: string;
}

export function FormWrapper({
	children,
	variant,
	title,
	step,
	totalSteps,
	defaultOpen,
	className,
}: FormWrapperProps) {
	if (variant === "accordion") {
		return (
			<Accordion
				type="single"
				collapsible
				className={cn("w-full", className)}
				defaultValue={defaultOpen}
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
						{children}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	}

	return (
		<div className={cn("flex flex-col", className)}>
			{step && totalSteps ? (
				<Heading step={step} totalSteps={totalSteps}>
					{title}
				</Heading>
			) : (
				<div className="mb-6">
					<h2 className="font-semibold text-2xl">{title}</h2>
				</div>
			)}
			{children}
		</div>
	);
}
