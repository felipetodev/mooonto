import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { IntlConfig } from "@/lib/types";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { NumberInput } from "../ui/number-input";

export function AditionalCostsForm({
	totalBaseSum,
	intlConfig,
}: {
	totalBaseSum: number;
	intlConfig: IntlConfig;
}) {
	const { control } = useFormContext();

	const hasChildrens = useWatch({
		control,
		name: "childrens",
	});

	const unExpectedExpenses = useWatch({
		control,
		name: "unExpectedExpenses",
		defaultValue: 0,
	});

	const valueContribution = useWatch({
		control,
		name: "valueContribution",
		defaultValue: 0,
	});

	const incomeTaxRetention = useWatch({
		control,
		name: "incomeTaxRetention",
		defaultValue: 0,
	});

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

	return (
		<div className="mt-10 space-y-8">
			<FormField
				control={control}
				name="unExpectedExpenses"
				render={({ field }) => (
					<FormItem>
						<div className="flex items-center">
							<FormLabel className="w-[330px]">Imprevistos</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={(value) => {
												field.onChange(value);
											}}
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
										prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
										placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									Lorem Ipsum dolor sit amet.
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
						<div className="flex items-center">
							<FormLabel className="w-[330px]">Valor que aportas</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={(value) => {
												field.onChange(value);
											}}
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
										prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
										placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									Por ejemplo, 3% por cada año de experiencia laboral
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
						<div className="flex items-center">
							<FormLabel className="w-[330px]">Retención IRPF</FormLabel>
							<div className="flex w-full flex-col">
								<div className="grid grid-cols-2 gap-x-4">
									<FormControl>
										<NumberInput
											className="max-w-60"
											intlConfig={intlConfig}
											onChange={(value) => {
												field.onChange(value);
											}}
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
										prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
										placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										disabled={disabledFields}
									/>
								</div>
								<FormDescription aria-disabled={disabledFields}>
									Lorem Ipsum dolor sit amet.
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
