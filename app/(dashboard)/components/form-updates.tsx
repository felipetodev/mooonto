"use client";

import { AditionalCostsForm } from "@/components/forms/aditional-costs-form";
import { FormWrapper } from "@/components/forms/form-wrapper";
import { LivingExpensesForm } from "@/components/forms/living-expenses-form";
import { WorkExpensesForm } from "@/components/forms/work-expenses-form";
import { Form } from "@/components/ui/form";
import { useFormCalculations } from "@/hooks/use-form-completions";
import type { IntlConfig } from "@/lib/types";
import { type FormValues, formSchema } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

type FormUpdatesProps = {
	intlConfig: IntlConfig;
	defaultValues: FormValues;
};

export function FormUpdates({ intlConfig, defaultValues }: FormUpdatesProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	console.log(form.getValues());

	const watchedValues = useWatch({
		control: form.control,
	}) as FormValues;

	const formResults = useFormCalculations(watchedValues);

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<div className="relative flex flex-col text-[#1A1A18]">
			<Form {...form}>
				<form
					id="form-updates"
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-10"
				>
					<FormWrapper
						variant="accordion"
						step={1}
						totalSteps={2}
						title={
							<>
								Gastos mensuales mínimos para poder{" "}
								<span className="font-bold">trabajar</span>
							</>
						}
					>
						<WorkExpensesForm intlConfig={intlConfig} />
					</FormWrapper>
					<FormWrapper
						variant="accordion"
						step={2}
						totalSteps={2}
						title={
							<>
								Gastos mensuales mínimos para poder{" "}
								<span className="font-bold">vivir</span>
							</>
						}
					>
						<LivingExpensesForm intlConfig={intlConfig} />
						<AditionalCostsForm
							totalBaseSum={formResults.totalBaseSum}
							intlConfig={intlConfig}
						/>
					</FormWrapper>
				</form>
			</Form>
		</div>
	);
}
