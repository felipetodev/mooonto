import {
	CHILDREN_CONDITIONAL_FIELDS,
	OFFICE_CONDITIONAL_FIELDS,
} from "@/lib/constants";
import type { FormValues } from "@/schemas/form";
import { useMemo } from "react";

export type FormCompletionProgressResult = {
	completionProgress: number;
	totalBaseSum: number;
	totalStepOne: number;
	totalStepTwo: number;
	totalResult: number;
	totalResultWithvalueContribution: number;
	minimumHourlyRateBeingFreelance: number;
	minimumHourlyRateBeingContracted: number;
	minimumHourlyRateBeingFreelanceWithValueContribution: number;
	minimumHourlyRateBeingContractedWithValueContribution: number;
};

const getFormCompletionProgress = (values: FormValues) => {
	const totalFields = Object.entries(values).filter(([key, value]) => {
		if (value != null && typeof value !== "boolean") {
			return true;
		}

		if (values.cowork && OFFICE_CONDITIONAL_FIELDS.includes(key as any)) {
			return true;
		}

		if (values.childrens && CHILDREN_CONDITIONAL_FIELDS.includes(key as any)) {
			return true;
		}
	}).length;

	const filledFields = Object.values(values).reduce<number>((acc, value) => {
		if (typeof value === "number" && value > 0) {
			return acc + 1;
		}
		return acc;
	}, 0);

	return Math.round((filledFields / totalFields) * 100);
};

export const useFormCalculations = (
	values: FormValues,
): FormCompletionProgressResult => {
	return useMemo(() => {
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
			unExpectedExpenses + incomeTaxRetention,
		);

		const totalAdditionalCostsWithValueContribution = Math.round(
			unExpectedExpenses + valueContribution + incomeTaxRetention,
		);

		// Total sums
		const totalStepExpenses = totalBaseSum + totalAdditionalCosts; // base imponible
		const totalStepsExpensesWithValueContribution =
			totalBaseSum + totalAdditionalCostsWithValueContribution;

		const completionProgress = getFormCompletionProgress(values);

		return {
			totalBaseSum,
			totalStepOne: totalStepOneExpenses,
			totalStepTwo: totalStepTwoExpenses,
			totalResult: totalStepExpenses,
			totalResultWithvalueContribution: totalStepsExpensesWithValueContribution,
			minimumHourlyRateBeingFreelance: Math.round(totalStepExpenses / 80),
			minimumHourlyRateBeingContracted: Math.round(totalStepExpenses / 160),
			minimumHourlyRateBeingFreelanceWithValueContribution: Math.round(
				totalStepsExpensesWithValueContribution / 80,
			),
			minimumHourlyRateBeingContractedWithValueContribution: Math.round(
				totalStepsExpensesWithValueContribution / 160,
			),
			completionProgress,
		};
	}, [values]);
};
