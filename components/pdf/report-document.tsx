import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import type { IntlConfig } from "@/lib/types";
import type { FormValues } from "@/schemas/form";
import { Document, Page } from "@react-pdf/renderer";
import { ReportChart } from "./report-chart";
import { ReportFooter } from "./report-footer";
import { ReportHeader } from "./report-header";
import { ReportRates } from "./report-rates";
import { ReportSummary } from "./report-summary";
import { styles } from "./styles";

export type ReportTranslations = {
	title: string;
	subtitle: string;
	currency: string;
	generatedAt: string;
	workExpensesTitle: string;
	livingExpensesTitle: string;
	additionalCostsTitle: string;
	totalTitle: string;
	category: string;
	amount: string;
	distributionTitle: string;
	ratesTitle: string;
	ratesTitleWithValue: string;
	contractedRate: string;
	freelanceRate: string;
	perHour: string;
	disclaimer: string;
	poweredBy: string;
	// Field labels
	fields: {
		// Work expenses
		selfEmployed: string;
		consultancy: string;
		lifecycleEquipment: string;
		subscriptions: string;
		officeRent: string;
		officeInsurance: string;
		officeBills: string;
		officeInternet: string;
		gasoline: string;
		coffee: string;
		water: string;
		// Living expenses
		livingExpenses: string;
		commonExpenses: string;
		food: string;
		gym: string;
		entertainment: string;
		clothes: string;
		carFee: string;
		livingExpensesTwo: string;
		internet: string;
		personalPhone: string;
		healthPlan: string;
		retirementFund: string;
		otherExpenses: string;
		childrensExpenses: string;
		livingExpensesTwoTwo: string;
		carInsurance: string;
		taxes: string;
		// Additional costs
		unExpectedExpenses: string;
		valueContribution: string;
		incomeTaxRetention: string;
	};
};

type ReportDocumentProps = {
	formValues: FormValues;
	formResults: FormCompletionProgressResult;
	intlConfig: IntlConfig;
	translations: ReportTranslations;
};

function buildWorkExpenses(
	values: FormValues,
	translations: ReportTranslations["fields"],
) {
	const expenses = [
		{ label: translations.selfEmployed, value: values.selfEmployed },
		{ label: translations.consultancy, value: values.consultancy },
		{
			label: translations.lifecycleEquipment,
			value: Math.round(values.lifecycleEquipment / 12),
		},
		{ label: translations.subscriptions, value: values.subscriptions },
	];

	// Add office expenses if cowork is enabled
	if (values.cowork) {
		expenses.push(
			{ label: translations.officeRent, value: values.officeRent ?? 0 },
			{
				label: translations.officeInsurance,
				value: Math.round((values.officeInsurance ?? 0) / 12),
			},
			{ label: translations.officeBills, value: values.officeBills ?? 0 },
			{ label: translations.officeInternet, value: values.officeInternet ?? 0 },
		);
	}

	expenses.push(
		{ label: translations.gasoline, value: values.gasoline },
		{ label: translations.coffee, value: values.coffee },
		{ label: translations.water, value: values.water },
	);

	// Filter out zero values for cleaner report
	return expenses.filter((e) => e.value > 0);
}

function buildLivingExpenses(
	values: FormValues,
	translations: ReportTranslations["fields"],
) {
	const expenses = [
		{ label: translations.livingExpenses, value: values.livingExpenses },
		{ label: translations.commonExpenses, value: values.commonExpenses },
		{ label: translations.food, value: values.food },
		{ label: translations.gym, value: values.gym },
		{ label: translations.entertainment, value: values.entertainment },
		{ label: translations.clothes, value: values.clothes },
		{ label: translations.carFee, value: values.carFee },
		{
			label: translations.livingExpensesTwo,
			value: values.livingExpensesTwo ?? 0,
		},
		{ label: translations.internet, value: values.internet ?? 0 },
		{ label: translations.personalPhone, value: values.personalPhone ?? 0 },
		{ label: translations.healthPlan, value: values.healthPlan ?? 0 },
		{ label: translations.retirementFund, value: values.retirementFund ?? 0 },
		{ label: translations.otherExpenses, value: values.otherExpenses ?? 0 },
	];

	// Add children expenses if enabled
	if (values.childrens) {
		const childrenBasicExpenses =
			(values.quantityChildrens ?? 0) * (values.childrensExpenses ?? 0);
		if (childrenBasicExpenses > 0) {
			expenses.push({
				label: translations.childrensExpenses,
				value: childrenBasicExpenses,
			});
		}
		if ((values.livingExpensesTwoTwo ?? 0) > 0) {
			expenses.push({
				label: translations.livingExpensesTwoTwo,
				value: Math.round((values.livingExpensesTwoTwo ?? 0) / 12),
			});
		}
		if ((values.carInsurance ?? 0) > 0) {
			expenses.push({
				label: translations.carInsurance,
				value: Math.round((values.carInsurance ?? 0) / 12),
			});
		}
		if ((values.taxes ?? 0) > 0) {
			expenses.push({
				label: translations.taxes,
				value: Math.round((values.taxes ?? 0) / 12),
			});
		}
	}

	// Filter out zero values for cleaner report
	return expenses.filter((e) => e.value > 0);
}

function buildAdditionalCosts(
	values: FormValues,
	totalBaseSum: number,
	translations: ReportTranslations["fields"],
) {
	const expenses = [];

	const unExpectedExpensesValue =
		totalBaseSum * ((values.unExpectedExpenses ?? 0) / 100);
	if (unExpectedExpensesValue > 0) {
		expenses.push({
			label: `${translations.unExpectedExpenses} (${values.unExpectedExpenses}%)`,
			value: Math.round(unExpectedExpensesValue),
		});
	}

	const valueContributionValue =
		(totalBaseSum + unExpectedExpensesValue) *
		((values.valueContribution ?? 0) / 100);
	if (valueContributionValue > 0) {
		expenses.push({
			label: `${translations.valueContribution} (${values.valueContribution}%)`,
			value: Math.round(valueContributionValue),
		});
	}

	const incomeTaxBase =
		totalBaseSum + unExpectedExpensesValue + valueContributionValue;
	const incomeTaxRetentionValue =
		incomeTaxBase * ((values.incomeTaxRetention ?? 0) / 100);
	if (incomeTaxRetentionValue > 0) {
		expenses.push({
			label: `${translations.incomeTaxRetention} (${values.incomeTaxRetention}%)`,
			value: Math.round(incomeTaxRetentionValue),
		});
	}

	return expenses;
}

export function ReportDocument({
	formValues,
	formResults,
	intlConfig,
	translations,
}: ReportDocumentProps) {
	const generatedAt = new Date();

	const workExpenses = buildWorkExpenses(formValues, translations.fields);
	const livingExpenses = buildLivingExpenses(formValues, translations.fields);
	const additionalCosts = buildAdditionalCosts(
		formValues,
		formResults.totalBaseSum,
		translations.fields,
	);

	const totalAdditional = formResults.totalResult - formResults.totalBaseSum;

	return (
		<Document
			title={translations.title}
			author="Mooonto"
			subject={translations.subtitle}
			creator="Mooonto"
			producer="@react-pdf/renderer"
		>
			<Page size="A4" style={styles.page}>
				<ReportHeader
					intlConfig={intlConfig}
					generatedAt={generatedAt}
					translations={{
						title: translations.title,
						subtitle: translations.subtitle,
						currency: translations.currency,
						generatedAt: translations.generatedAt,
					}}
				/>

				<ReportSummary
					workExpenses={workExpenses}
					livingExpenses={livingExpenses}
					additionalCosts={additionalCosts}
					totalWork={formResults.totalStepOne}
					totalLiving={formResults.totalStepTwo}
					totalAdditional={totalAdditional}
					totalMonthly={formResults.totalResult}
					intlConfig={intlConfig}
					translations={{
						workExpensesTitle: translations.workExpensesTitle,
						livingExpensesTitle: translations.livingExpensesTitle,
						additionalCostsTitle: translations.additionalCostsTitle,
						totalTitle: translations.totalTitle,
						category: translations.category,
						amount: translations.amount,
					}}
				/>

				<ReportChart
					workExpenses={formResults.totalStepOne}
					livingExpenses={formResults.totalStepTwo}
					additionalCosts={totalAdditional}
					intlConfig={intlConfig}
					translations={{
						distributionTitle: translations.distributionTitle,
						workExpensesTitle: translations.workExpensesTitle,
						livingExpensesTitle: translations.livingExpensesTitle,
						additionalCostsTitle: translations.additionalCostsTitle,
					}}
				/>

				<ReportRates
					minimumHourlyRateContracted={
						formResults.minimumHourlyRateBeingContracted
					}
					minimumHourlyRateFreelance={
						formResults.minimumHourlyRateBeingFreelance
					}
					minimumHourlyRateContractedWithValue={
						formResults.minimumHourlyRateBeingContractedWithValueContribution
					}
					minimumHourlyRateFreelanceWithValue={
						formResults.minimumHourlyRateBeingFreelanceWithValueContribution
					}
					intlConfig={intlConfig}
					translations={{
						ratesTitle: translations.ratesTitle,
						ratesTitleWithValue: translations.ratesTitleWithValue,
						contractedRate: translations.contractedRate,
						freelanceRate: translations.freelanceRate,
						perHour: translations.perHour,
					}}
				/>

				<ReportFooter
					translations={{
						disclaimer: translations.disclaimer,
						poweredBy: translations.poweredBy,
					}}
				/>
			</Page>
		</Document>
	);
}
