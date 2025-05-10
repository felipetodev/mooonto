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
								<FormLabel className="w-[330px]">
									{t("selfEmployed.label")}
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={intlConfig.symbol}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
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
								<FormLabel className="w-[330px]">
									{t("consultancy.label")}
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
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
								<FormLabel className="w-[330px]">
									Vida útil de tus equipos
								</FormLabel>
								<div className="flex w-full flex-col">
									<div className="grid grid-cols-2 gap-x-4">
										<div className="flex items-center">
											<FormLabel className="mr-1 min-w-max">
												Costo Anual
											</FormLabel>
											<FormControl>
												<NumberInput
													ref={field.ref}
													intlConfig={intlConfig}
													onChange={field.onChange}
													prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
													placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
												/>
											</FormControl>
										</div>
										<NumberInput
											readOnly
											intlConfig={intlConfig}
											value={Math.round(
												(getValues("lifecycleEquipment") ?? 0) / 12 || 0,
											)}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										/>
									</div>
									<FormDescription className="text-inherit">
										Costo de impuestos por ser autónomo
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
								<FormLabel className="w-[330px]">Suscripciones</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										Vercel, GitHub, Adobe, Shutterstock, Figma, etc.
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
								<FormLabel className="w-[330px]">Oficina / Cowork</FormLabel>
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
												<FormLabel className="font-normal">Si</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<RadioGroupItem value="0" />
												</FormControl>
												<FormLabel className="font-normal">No</FormLabel>
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
								<div className="flex items-center">
									<FormLabel className="w-[330px]">
										<span className="ml-8">Alquiler de oficina / Cowork</span>
									</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
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
						name="officeInsurance"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">
										<span className="ml-8">Seguro oficina</span>
									</FormLabel>
									<div className="flex w-full flex-col">
										<div className="grid grid-cols-2 gap-x-4">
											<div className="flex items-center">
												<FormLabel
													aria-disabled={disabledField}
													className="mr-1 min-w-max"
												>
													Costo Anual
												</FormLabel>
												<FormControl>
													<NumberInput
														intlConfig={intlConfig}
														onChange={field.onChange}
														prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
														placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
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
												prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
												disabled={disabledField}
											/>
										</div>
										<FormDescription aria-disabled={disabledField}>
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
						name="officeBills"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">
										<span className="ml-8">Agua / luz / gas oficina</span>
									</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
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
						name="officeInternet"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">
										<span className="ml-8">Internet / teléfono oficina</span>
									</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												intlConfig={intlConfig}
												onChange={field.onChange}
												prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
												disabled={disabledField}
											/>
										</FormControl>
										<FormDescription aria-disabled={disabledField}>
											Lorem Ipsum dolor sit amet.
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
								<FormLabel className="w-[330px]">Gasolina / diesel</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
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
					name="coffee"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">Café</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
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
					name="water"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">Agua</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											ref={field.ref}
											intlConfig={intlConfig}
											onChange={field.onChange}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
										/>
									</FormControl>
									<FormDescription className="text-inherit">
										Lorem Ipsum dolor sit amet.
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
