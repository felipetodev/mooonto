"use client";
import { Island } from "@/components/island";
import { Form } from "@/components/ui/form";
import { AditionalCostsForm } from "@/forms/aditional-costs-form";
import { LivingExpensesForm } from "@/forms/living-expenses-form";
import { WorkExpensesForm } from "@/forms/work-expenses-form";
import { useFormCalculations } from "@/hooks/use-form-completions";
import type { IntlConfig } from "@/lib/types";
import { type FormValues, formSchema } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const DEFAULT_FORM_STEP_ONE = {
	selfEmployed: 0,
	consultancy: 0,
	lifecycleEquipment: 0,
	subscriptions: 0,
	cowork: false,
	officeRent: undefined, // cowork conditional field
	officeInsurance: undefined, // cowork conditional field
	officeBills: undefined, // cowork conditional field
	officeInternet: undefined, // cowork conditional field
	gasoline: 0,
	coffee: 0,
	water: 0,
};

const DEFAULT_FORM_STEP_TWO = {
	livingExpenses: 0,
	commonExpenses: 0,
	food: 0,
	gym: 0,
	entertainment: 0,
	clothes: 0,
	carFee: 0,
	livingExpensesTwo: 0,
	internet: 0,
	personalPhone: 0,
	healthPlan: 0,
	retirementFund: 0,
	otherExpenses: 0,
	childrens: false,
	// childrens conditional fields
	quantityChildrens: undefined,
	childrensExpenses: undefined,
	livingExpensesTwoTwo: undefined,
	carInsurance: undefined,
	taxes: undefined,
	unExpectedExpenses: undefined,
	valueContribution: undefined,
	incomeTaxRetention: undefined,
};

export const OFFICE_CONDITIONAL_FIELDS = [
	"officeRent",
	"officeInsurance",
	"officeBills",
	"officeInternet",
] as const;

export const CHILDREN_CONDITIONAL_FIELDS = [
	"quantityChildrens",
	"childrensExpenses",
	"livingExpensesTwoTwo",
	"carInsurance",
	"taxes",
	"unExpectedExpenses",
	"valueContribution",
	"incomeTaxRetention",
] as const;

export function MainForm({ intlConfig }: { intlConfig: IntlConfig }) {
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...DEFAULT_FORM_STEP_ONE,
			...DEFAULT_FORM_STEP_TWO,
		},
	});

	const watchedValues = useWatch({
		control: form.control,
	}) as FormValues;

	console.log("FORM VALUES:::", watchedValues);
	console.log("FORM ERRORS:::", form.formState.errors);

	const formResults = useFormCalculations(watchedValues);

	const onSubmit = (formData: FormValues) => {
		const cleanedData: Partial<FormValues> = structuredClone(formData);

		if (!formData.cowork) {
			OFFICE_CONDITIONAL_FIELDS.forEach((field) => {
				cleanedData[field as keyof FormValues] = undefined;
			});
		}

		if (!formData.childrens) {
			CHILDREN_CONDITIONAL_FIELDS.forEach((field) => {
				cleanedData[field as keyof FormValues] = undefined;
			});
		}

		alert(JSON.stringify(cleanedData, null, 2));
	};

	function onError(errors: any) {
		toast.error("Tienes campos inválidos y/o incompletos");
	}

	return (
		<div className="relative flex flex-col text-[#1A1A18]">
			<Form {...form}>
				<form
					id="mooonto"
					ref={formRef}
					onSubmit={form.handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-y-20"
				>
					<WorkExpensesForm intlConfig={intlConfig} />
					<div className="grid">
						<LivingExpensesForm intlConfig={intlConfig} />
						<AditionalCostsForm
							totalBaseSum={formResults.totalBaseSum}
							intlConfig={intlConfig}
						/>
					</div>
				</form>
			</Form>
			<Island
				formRef={formRef}
				formResults={formResults}
				intlConfig={intlConfig}
			/>
			<button
				form="mooonto"
				type="submit"
				className="h-14 rounded-3xl border bg-secondary px-4 font-bold text-2xl"
			>
				Obtener resultado
			</button>
		</div>
	);
}
