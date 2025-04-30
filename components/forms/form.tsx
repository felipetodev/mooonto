"use client";

import type { IntlConfig } from "@/lib/types";
import { type FormValues, formSchema } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/form";
import { AditionalCostsForm } from "./aditional-costs-form";
import { StepOneForm } from "./step-one-form";
import { StepTwoForm } from "./step-two-form";

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

const OFFICE_CONDITIONAL_FIELDS = [
	"officeRent",
	"officeInsurance",
	"officeBills",
	"officeInternet",
] as const;

const CHILDREN_CONDITIONAL_FIELDS = [
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
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...DEFAULT_FORM_STEP_ONE,
			...DEFAULT_FORM_STEP_TWO,
		},
		mode: "onChange",
	});

	console.log("FORM VALUES:::", form.getValues());
	console.log("FORM ERRORS:::", form.formState.errors);

	const watchedValues = useWatch({ control: form.control });

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
		toast.warning("Tienes campos inválidos y/o incompletos");
	}

	const stepsSum = useMemo(() => {
		const values = form.getValues();

		const calculateOfficeExpenses = () => {
			if (!values.cowork) return 0;

			return (
				(values.officeRent ?? 0) +
				Math.round((values.officeInsurance ?? 0) / 12) +
				(values.officeBills ?? 0) +
				(values.officeInternet ?? 0)
			);
		};

		const calculateChildrenExpenses = () => {
			if (!values.childrens) return 0;

			const childrenBasicExpenses =
				(values.quantityChildrens ?? 0) * (values.childrensExpenses ?? 0);
			const childrenPeriodicExpenses =
				Math.round((values.livingExpensesTwoTwo ?? 0) / 12) +
				Math.round((values.carInsurance ?? 0) / 12) +
				Math.round((values.taxes ?? 0) / 12);

			return childrenBasicExpenses + childrenPeriodicExpenses;
		};

		// Step One Expenses
		const businessExpenses =
			values.selfEmployed +
			values.consultancy +
			Math.round(values.lifecycleEquipment / 12) +
			values.subscriptions;

		const officeExpenses = calculateOfficeExpenses();

		const dailyBusinessExpenses =
			values.gasoline + values.coffee + values.water;

		const totalStepOneExpenses =
			businessExpenses + officeExpenses + dailyBusinessExpenses;

		// Step Two Expenses
		const basicLivingExpenses =
			values.livingExpenses + values.commonExpenses + values.food;

		const lifestyleExpenses =
			values.gym + values.entertainment + values.clothes;

		const recurringExpenses =
			values.carFee +
			(values.livingExpensesTwo ?? 0) +
			(values.internet ?? 0) +
			(values.personalPhone ?? 0);

		const financialSecurity =
			(values.healthPlan ?? 0) +
			(values.retirementFund ?? 0) +
			(values.otherExpenses ?? 0);

		const childrenExpenses = calculateChildrenExpenses();

		const totalStepTwoExpenses =
			basicLivingExpenses +
			lifestyleExpenses +
			recurringExpenses +
			financialSecurity +
			childrenExpenses;

		const totalBaseSum = totalStepOneExpenses + totalStepTwoExpenses;

		// Additional Costs
		const unExpectedExpenses =
			totalBaseSum * ((values.unExpectedExpenses ?? 0) / 100);
		const valueContribution =
			(totalBaseSum + unExpectedExpenses) *
			((values.valueContribution ?? 0) / 100);
		const incomeTaxRetention =
			(totalStepOneExpenses +
				totalStepTwoExpenses +
				unExpectedExpenses +
				valueContribution) *
			((values.incomeTaxRetention ?? 0) / 100);

		const totalAdditionalCosts = Math.round(
			unExpectedExpenses + valueContribution + incomeTaxRetention,
		);

		// Total sum
		const totalStepsExpenses = totalBaseSum + totalAdditionalCosts;

		return {
			totalBaseSum,
			totalResult: totalStepsExpenses,
		};
	}, [watchedValues]);

	return (
		<div className="relative flex flex-col text-[#002446]">
			<Form {...form}>
				<form
					id="mooonto"
					onSubmit={form.handleSubmit(onSubmit, onError)}
					className="flex flex-col gap-y-20"
				>
					<StepOneForm intlConfig={intlConfig} />
					<div className="grid">
						<StepTwoForm intlConfig={intlConfig} />
						<AditionalCostsForm
							totalBaseSum={stepsSum.totalBaseSum}
							intlConfig={intlConfig}
						/>
					</div>
				</form>
			</Form>
			<div className="sticky bottom-0 py-10">
				<div className="rounded-3xl bg-lime-400 p-6 font-bold">
					Total: {intlConfig.symbol}
					{stepsSum.totalResult}
				</div>
			</div>
			<button
				form="mooonto"
				type="submit"
				className="h-12 rounded-3xl border bg-lime-400 px-4 font-bold text-2xl"
			>
				Obtener resultado
			</button>
		</div>
	);
}
