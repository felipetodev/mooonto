import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { NumberInput } from "@/components/ui/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heading } from "@/forms/heading";
import type { IntlConfig } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface CoworkFieldValues {
	officeRent?: number;
	officeInsurance?: number;
	officeBills?: number;
	officeInternet?: number;
}

export function WorkExpensesForm({ intlConfig }: { intlConfig: IntlConfig }) {
	const { control, getValues, setValue } = useFormContext();
	const t = useTranslations("workExpenses");

	const cowork = useWatch({
		control: control,
		name: "cowork",
	});
	const disabledField = useMemo(() => !cowork, [cowork]);

	const prevValues = useRef<CoworkFieldValues>({});

	const handleCoworkChange = (value: boolean) => {
		if (!value) {
			prevValues.current = {
				officeRent: getValues("officeRent"),
				officeInsurance: getValues("officeInsurance"),
				officeBills: getValues("officeBills"),
				officeInternet: getValues("officeInternet"),
			};

			setValue("officeRent", undefined);
			setValue("officeInsurance", undefined);
			setValue("officeBills", undefined);
			setValue("officeInternet", undefined);
		} else {
			setValue("officeRent", prevValues.current.officeRent);
			setValue("officeInsurance", prevValues.current.officeInsurance);
			setValue("officeBills", prevValues.current.officeBills);
			setValue("officeInternet", prevValues.current.officeInternet);
		}
		return value;
	};

	const currencyPrefix = useMemo(
		() => `${intlConfig.currency} ${intlConfig.symbol}`,
		[intlConfig],
	);

	return (
		<div className="flex flex-col">
			<Heading step={1} totalSteps={2}>
				Gastos mensuales mínimos para poder{" "}
				<span className="font-bold">trabajar</span>
			</Heading>
			<div className="mt-10 space-y-8">
				<FormField
					control={control}
					name="selfEmployed"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("selfEmployed.label")}</FormLabel>
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
										{t("selfEmployed.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="consultancy"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("consultancy.label")}</FormLabel>
								<div className="flex w-full flex-col gap-x-4">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										{t("consultancy.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="lifecycleEquipment"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("lifecycleEquipment.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<div className="grid grid-cols-2 gap-x-4">
										<div className="flex flex-col-reverse md:flex-row md:items-center">
											<FormLabel className="!min-w-fit !w-auto my-1.5 mr-1 md:my-auto">
												{t("lifecycleEquipment.subLabel")}
											</FormLabel>
											<FormControl>
												<NumberInput
													className="w-full"
													ref={field.ref}
													intlConfig={intlConfig}
													onChange={field.onChange}
													prefix={`${currencyPrefix}`}
													placeholder={`${currencyPrefix} 0`}
												/>
											</FormControl>
										</div>
										<NumberInput
											readOnly
											intlConfig={intlConfig}
											value={Math.round(
												(getValues("lifecycleEquipment") ?? 0) / 12 || 0,
											)}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</div>
									<FormDescription className="text-inherit">
										{t("lifecycleEquipment.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="subscriptions"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("subscriptions.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										{t("subscriptions.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="cowork"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<div className="flex items-center">
								<FormLabel>{t("cowork.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<RadioGroup
											onValueChange={(e) => {
												const value = Boolean(Number(e));
												field.onChange(handleCoworkChange(value));
											}}
											defaultValue={field.value ? "1" : "0"}
											className="flex items-center"
										>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="1" />
												</FormControl>
												<FormLabel className="!w-full !min-w-full font-normal">
													{t("cowork.options.true")}
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="0" />
												</FormControl>
												<FormLabel className="!w-full !min-w-full font-normal">
													{t("cowork.options.false")}
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
				<div className="space-y-8">
					<FormField
						control={control}
						name="officeRent"
						render={({ field }) => (
							<FormItem>
								<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
									<FormLabel>{t("officeRent.label")}</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${currencyPrefix}`}
												placeholder={`${currencyPrefix} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
											{t("officeRent.description")}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="officeInsurance"
						render={({ field }) => (
							<FormItem>
								<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
									<FormLabel>{t("officeInsurance.label")}</FormLabel>
									<div className="flex w-full flex-col">
										<div className="grid grid-cols-2 gap-x-4">
											<div className="flex flex-col-reverse md:flex-row md:items-center">
												<FormLabel
													aria-disabled={disabledField}
													className="!min-w-fit !w-auto my-1.5 mr-1 md:my-auto"
												>
													{t("officeInsurance.subLabel")}
												</FormLabel>
												<FormControl>
													<NumberInput
														intlConfig={intlConfig}
														onChange={field.onChange}
														prefix={`${currencyPrefix}`}
														placeholder={`${currencyPrefix} 0`}
														disabled={disabledField}
													/>
												</FormControl>
											</div>
											<NumberInput
												readOnly
												intlConfig={intlConfig}
												value={Math.round(
													(getValues("officeInsurance") ?? 0) / 12 || 0,
												)}
												prefix={`${currencyPrefix}`}
												placeholder={`${currencyPrefix} 0`}
												disabled={disabledField}
											/>
										</div>
										<FormDescription aria-disabled={disabledField}>
											{t("officeInsurance.description")}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="officeBills"
						render={({ field }) => (
							<FormItem>
								<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
									<FormLabel>{t("officeBills.label")}</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${currencyPrefix}`}
												placeholder={`${currencyPrefix} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
											{t("officeBills.description")}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="officeInternet"
						render={({ field }) => (
							<FormItem>
								<div className="ml-8 flex flex-col gap-y-2 md:flex-row md:items-center md:gap-y-auto">
									<FormLabel>{t("officeInternet.label")}</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${currencyPrefix}`}
												placeholder={`${currencyPrefix} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
											{t("officeInternet.description")}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="gasoline"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("gasoline.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										{t("gasoline.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="coffee"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("coffee.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										{t("coffee.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="water"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel>{t("water.label")}</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${currencyPrefix}`}
											placeholder={`${currencyPrefix} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										{t("water.description")}
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
