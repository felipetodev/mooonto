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
import { FORM_FIELDS_TWO, FORM_FIELDS_TWO_TWO } from "@/lib/constants";
import type { IntlConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Heading from "./heading";

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

export function StepTwoForm({ intlConfig }: { intlConfig: IntlConfig }) {
	const form = useFormContext();

	const hasChildrens = useWatch({
		control: form.control,
		name: "childrens",
	});
	const disabledFields = useMemo(() => !hasChildrens, [hasChildrens]);

	const prevValues = useRef<ChildFieldValues>({});

	const handleChildrensChange = (value: boolean) => {
		if (!value) {
			prevValues.current = {
				quantityChildrens: form.getValues("quantityChildrens"),
				childrensExpenses: form.getValues("childrensExpenses"),
				livingExpensesTwoTwo: form.getValues("livingExpensesTwoTwo"),
				carInsurance: form.getValues("carInsurance"),
				taxes: form.getValues("taxes"),
				incomeTaxRetention: form.getValues("incomeTaxRetention"),
				valueContribution: form.getValues("valueContribution"),
				unExpectedExpenses: form.getValues("unExpectedExpenses"),
			};

			form.setValue("quantityChildrens", undefined);
			form.setValue("childrensExpenses", undefined);
			form.setValue("livingExpensesTwoTwo", undefined);
			form.setValue("carInsurance", undefined);
			form.setValue("taxes", undefined);
			form.setValue("incomeTaxRetention", undefined);
			form.setValue("valueContribution", undefined);
			form.setValue("unExpectedExpenses", undefined);
		} else {
			form.setValue("quantityChildrens", prevValues.current.quantityChildrens);
			form.setValue("childrensExpenses", prevValues.current.childrensExpenses);
			form.setValue(
				"livingExpensesTwoTwo",
				prevValues.current.livingExpensesTwoTwo,
			);
			form.setValue("carInsurance", prevValues.current.carInsurance);
			form.setValue("taxes", prevValues.current.taxes);
			form.setValue(
				"incomeTaxRetention",
				prevValues.current.incomeTaxRetention,
			);
			form.setValue("valueContribution", prevValues.current.valueContribution);
			form.setValue(
				"unExpectedExpenses",
				prevValues.current.unExpectedExpenses,
			);
		}

		return value;
	};

	const opacityStyles = (className: string) =>
		cn(className, "transition-opacity ease-in-out", {
			"opacity-50": disabledFields,
		});

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
						control={form.control}
						name={f.name}
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">{f.label}</FormLabel>
									<div className="flex w-full flex-col">
										<FormControl>
											<NumberInput
												ref={field.ref}
												intlConfig={intlConfig}
												onValueChange={(value) => {
													field.onChange(Number(value ?? 0));
												}}
												prefix={intlConfig.symbol}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											/>
										</FormControl>
										<FormDescription className="text-inherit">
											{f.description}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				))}
				<FormField
					control={form.control}
					name="childrens"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<div className="flex items-center">
								<FormLabel className="block w-[330px]">
									Hijos o personas a tu cargo
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
				<FormField
					control={form.control}
					name="quantityChildrens"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">
									<span className="ml-8">Cantidad</span>
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
					control={form.control}
					name="childrensExpenses"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel className="w-[330px]">
									<span className="ml-8 flex text-balance">
										Media de gastos mensuales por cada hijo o persona a tu cargo
									</span>
								</FormLabel>
								<div className="flex w-full flex-col">
									<FormControl>
										<NumberInput
											intlConfig={intlConfig}
											onValueChange={(value) => {
												field.onChange(Number(value ?? 0));
											}}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											disabled={disabledFields}
										/>
									</FormControl>
									<FormDescription className={opacityStyles("text-inherit")}>
										Lorem Ipsum dolor sit amet.
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
						control={form.control}
						name={f.name}
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel className="w-[330px]">{f.label}</FormLabel>
									<div className="flex w-full flex-col">
										<div className="grid grid-cols-2 gap-x-4">
											<div className="flex items-center">
												<FormLabel className={opacityStyles("min-w-max")}>
													Costo Anual
												</FormLabel>
												<FormControl>
													<NumberInput
														disabled={disabledFields}
														intlConfig={intlConfig}
														onValueChange={(value) => {
															field.onChange(Number(value ?? 0));
														}}
														prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
														placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
													/>
												</FormControl>
											</div>
											<NumberInput
												readOnly
												disabled={disabledFields}
												intlConfig={intlConfig}
												value={form.getValues(f.name) * 12 || 0}
												prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
												placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											/>
										</div>
										<FormDescription className={opacityStyles("text-inherit")}>
											{f.description}
										</FormDescription>
										<FormMessage />
									</div>
								</div>
							</FormItem>
						)}
					/>
				))}
				<FormField
					control={form.control}
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
												onValueChange={(value) => {
													field.onChange(Number(value ?? 0));
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
											value={form.getValues("incomeTaxRetention") * 12 || 0}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											disabled={disabledFields}
										/>
									</div>
									<FormDescription className={opacityStyles("text-inherit")}>
										Lorem Ipsum dolor sit amet.
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
												onValueChange={(value) => {
													field.onChange(Number(value ?? 0));
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
											value={form.getValues("valueContribution") * 12 || 0}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											disabled={disabledFields}
										/>
									</div>
									<FormDescription className={opacityStyles("text-inherit")}>
										Por ejemplo, 3% por cada año de experiencia laboral
									</FormDescription>
									<FormMessage />
								</div>
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
												onValueChange={(value) => {
													field.onChange(Number(value ?? 0));
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
											value={form.getValues("unExpectedExpenses") * 12 || 0}
											prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
											placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
											disabled={disabledFields}
										/>
									</div>
									<FormDescription className={opacityStyles("text-inherit")}>
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

export default StepTwoForm;
