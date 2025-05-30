import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { NumberInput } from "@/components/ui/number-input";
import type { IntlConfig } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function AditionalCostsForm({
	totalBaseSum,
	intlConfig,
}: {
	totalBaseSum: number;
	intlConfig: IntlConfig;
}) {
	const { control } = useFormContext();
	const t = useTranslations("aditionalCosts");

	const formValues = useWatch({
		control,
		name: [
			"childrens",
			"unExpectedExpenses",
			"valueContribution",
			"incomeTaxRetention",
		] as const,
		defaultValue: {
			childrens: false,
			unExpectedExpenses: 0,
			valueContribution: 0,
			incomeTaxRetention: 0,
		},
	});

	const [
		hasChildrens,
		unExpectedExpenses,
		valueContribution,
		incomeTaxRetention,
	] = formValues;
	const disabledFields = useMemo(() => !hasChildrens, [hasChildrens]);

	const calculations = useMemo(() => {
		const unExpectedExpensesTotal = Math.round(
			(totalBaseSum * (unExpectedExpenses || 0)) / 100,
		);

		const sumWithUnexpected = totalBaseSum + unExpectedExpensesTotal;
		const valueContributionTotal = Math.round(
			(sumWithUnexpected * (valueContribution || 0)) / 100,
		);

		const totalBeforeTax = sumWithUnexpected + valueContributionTotal;
		const incomeTaxRetentionTotal = Math.round(
			totalBeforeTax * ((incomeTaxRetention || 0) / 100),
		);

		return {
			unExpectedExpensesTotal,
			valueContributionTotal,
			incomeTaxRetentionTotal,
		};
	}, [totalBaseSum, unExpectedExpenses, valueContribution, incomeTaxRetention]);

	const currencyPrefix = useMemo(
		() => `${intlConfig.currency} ${intlConfig.symbol}`,
		[intlConfig],
	);

	return (
		<div className="mt-10 space-y-8">
			<FormField
				control={control}
				name="unExpectedExpenses"
				render={({ field }) => (
					<FormItem>
						<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
							<FormLabel>{t("unExpectedExpenses.label")}</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix="%"
											placeholder="%"
											disabled={disabledFields}
											allowDecimals={false}
											maxLength={2}
										/>
									</FormControl>
									<NumberInput
										readOnly
										intlConfig={intlConfig}
										value={calculations.unExpectedExpensesTotal}
										prefix={`${currencyPrefix}`}
										placeholder={`${currencyPrefix} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									{t("unExpectedExpenses.description")}
								</FormDescription>
								<FormMessage />
							</div>
						</div>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="valueContribution"
				render={({ field }) => (
					<FormItem>
						<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
							<FormLabel>{t("valueContribution.label")}</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix="%"
											placeholder="%"
											disabled={disabledFields}
											allowDecimals={false}
											maxLength={2}
										/>
									</FormControl>
									<NumberInput
										readOnly
										intlConfig={intlConfig}
										value={calculations.valueContributionTotal}
										prefix={`${currencyPrefix}`}
										placeholder={`${currencyPrefix} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									{t("valueContribution.description")}
								</FormDescription>
								<FormMessage />
							</div>
						</div>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="incomeTaxRetention"
				render={({ field }) => (
					<FormItem>
						<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
							<FormLabel>{t("incomeTaxRetention.label")}</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix="%"
											placeholder="%"
											disabled={disabledFields}
											allowDecimals={false}
											maxLength={2}
										/>
									</FormControl>
									<NumberInput
										readOnly
										intlConfig={intlConfig}
										value={calculations.incomeTaxRetentionTotal}
										prefix={`${currencyPrefix}`}
										placeholder={`${currencyPrefix} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									{t("incomeTaxRetention.description")}
								</FormDescription>
								<FormMessage />
							</div>
						</div>
					</FormItem>
				)}
			/>
		</div>
	);
}
