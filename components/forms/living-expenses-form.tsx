import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heading } from "@/forms/heading";
import { FORM_FIELDS_TWO, FORM_FIELDS_TWO_TWO } from "@/lib/constants";
import type { IntlConfig } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface ChildFieldValues {
	quantityChildrens?: number;
	childrensExpenses?: number;
	livingExpensesTwoTwo?: number;
	carInsurance?: number;
	taxes?: number;
	incomeTaxRetention?: number;
	valueContribution?: number;
	unExpectedExpenses?: number;
}

export function LivingExpensesForm({ intlConfig }: { intlConfig: IntlConfig }) {
	const { control, getValues, setValue } = useFormContext();
	const t = useTranslations("livingExpenses");

	const hasChildrens = useWatch({
		control: control,
		name: "childrens",
	});
	const disabledFields = useMemo(() => !hasChildrens, [hasChildrens]);

	const prevValues = useRef<ChildFieldValues>({});

	const handleChildrensChange = (value: boolean) => {
		if (!value) {
			prevValues.current = {
				quantityChildrens: getValues("quantityChildrens"),
				childrensExpenses: getValues("childrensExpenses"),
				livingExpensesTwoTwo: getValues("livingExpensesTwoTwo"),
				carInsurance: getValues("carInsurance"),
				taxes: getValues("taxes"),
				incomeTaxRetention: getValues("incomeTaxRetention"),
				valueContribution: getValues("valueContribution"),
				unExpectedExpenses: getValues("unExpectedExpenses"),
			};

			setValue("quantityChildrens", undefined);
			setValue("childrensExpenses", undefined);
			setValue("livingExpensesTwoTwo", undefined);
			setValue("carInsurance", undefined);
			setValue("taxes", undefined);
			setValue("incomeTaxRetention", undefined);
			setValue("valueContribution", undefined);
			setValue("unExpectedExpenses", undefined);
		} else {
			setValue("quantityChildrens", prevValues.current.quantityChildrens);
			setValue("childrensExpenses", prevValues.current.childrensExpenses);
			setValue("livingExpensesTwoTwo", prevValues.current.livingExpensesTwoTwo);
			setValue("carInsurance", prevValues.current.carInsurance);
			setValue("taxes", prevValues.current.taxes);
			setValue("incomeTaxRetention", prevValues.current.incomeTaxRetention);
			setValue("valueContribution", prevValues.current.valueContribution);
			setValue("unExpectedExpenses", prevValues.current.unExpectedExpenses);
		}

		return value;
	};

	const currencyPrefix = useMemo(
		() => `${intlConfig.currency} ${intlConfig.symbol}`,
		[intlConfig],
	);

	return (
		<div className="flex flex-col">
			<Heading step={2} totalSteps={2}>
				Gastos mensuales mínimos para poder{" "}
				<span className="font-bold">vivir</span>
			</Heading>
			<div className="mt-10 space-y-8">
				{FORM_FIELDS_TWO.map((f) => (
					<FormField
						key={f.name}
						control={control}
						name={f.name}
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">{t(f.label)}</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												ref={field.ref}
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={intlConfig.symbol}
												placeholder={`${currencyPrefix} 0`}
											/>
										</FormControl>
										<FormDescription className="text-inherit">
											{t(f.description)}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				))}
				<FormField
					control={control}
					name="childrens"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<div className="flex items-center">
								<FormLabel className="block w-[330px]">
									{t("childrens.label")}
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<RadioGroup
											onValueChange={(e) => {
												const value = Boolean(Number(e));
												field.onChange(handleChildrensChange(value));
											}}
											defaultValue={field.value ? "1" : "0"}
											className="flex items-center"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="1" />
												</FormControl>
												<FormLabel className="font-normal">
													{t("childrens.options.true")}
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="0" />
												</FormControl>
												<FormLabel className="font-normal">
													{t("childrens.options.false")}
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="quantityChildrens"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">
									<span className="ml-8">{t("quantityChildrens.label")}</span>
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<Input
											className="max-w-60 text-end [&::-webkit-inner-spin-button]:ml-2"
											type="number"
											placeholder="0"
											{...field}
											value={field.value || ""}
											onChange={(e) => {
												field.onChange(Number(e.target.value ?? 0));
											}}
											disabled={disabledFields}
										/>
									</FormControl>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="childrensExpenses"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">
									<span className="ml-8 flex text-balance">
										{t("childrensExpenses.label")}
									</span>
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
											disabled={disabledFields}
										/>
									</FormControl>
									<FormDescription aria-disabled={disabledFields}>
										{t("childrensExpenses.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				{FORM_FIELDS_TWO_TWO.map((f) => (
					<FormField
						key={f.name}
						control={control}
						name={f.name}
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">{t(f.label)}</FormLabel>
									<div className="flex w-full flex-col">
										<div className="grid grid-cols-2 gap-x-4">
											<div className="flex items-center">
												<FormLabel
													aria-disabled={disabledFields}
													className="mr-1 min-w-max"
												>
													{t(f.label)}
												</FormLabel>
												<FormControl>
													<NumberInput
														disabled={disabledFields}
														intlConfig={intlConfig}
														onChange={field.onChange}
														prefix={`${currencyPrefix}`}
														placeholder={`${currencyPrefix} 0`}
													/>
												</FormControl>
											</div>
											<NumberInput
												readOnly
												disabled={disabledFields}
												intlConfig={intlConfig}
												value={Math.round(getValues(f.name) / 12 || 0)}
												prefix={`${currencyPrefix}`}
												placeholder={`${currencyPrefix} 0`}
											/>
										</div>
										<FormDescription aria-disabled={disabledFields}>
											{t(f.description)}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				))}
			</div>
		</div>
	);
}
