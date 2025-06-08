"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AditionalCostsForm } from "@/forms/aditional-costs-form";
import { LivingExpensesForm } from "@/forms/living-expenses-form";
import { WorkExpensesForm } from "@/forms/work-expenses-form";
import { useFormCalculations } from "@/hooks/use-form-completions";
import {
	DEFAULT_LIVING_EXPENSES_VALUES,
	DEFAULT_WORK_EXPENSES_VALUES,
} from "@/lib/constants";
import type { IntlConfig } from "@/lib/types";
import { type FormValues, formSchema } from "@/schemas/form";
import { useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { FormWrapper } from "./form-wrapper";

const Island = dynamic(
	() => import("@/components/island").then((mod) => mod.Island),
	{
		ssr: false,
	},
);

const ResultDrawer = dynamic(
	() => import("@/components/drawer").then((mod) => mod.ResultDrawer),
	{
		ssr: false,
	},
);

export function MainForm({ intlConfig }: { intlConfig: IntlConfig }) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...DEFAULT_WORK_EXPENSES_VALUES,
			...DEFAULT_LIVING_EXPENSES_VALUES,
		},
	});

	const watchedValues = useWatch({
		control: form.control,
	}) as FormValues;

	const { user, openSignIn } = useClerk();

	console.log("FORM VALUES:::", watchedValues);
	console.log("FORM ERRORS:::", form.formState.errors);

	const formResults = useFormCalculations(watchedValues);

	const onSubmit = () => {
		setOpenDrawer(true);
	};

	function onError(errors: any) {
		toast.error("Tienes campos inválidos y/o incompletos");
	}

	function saveToDatabase(values: FormValues) {
		if (!user) {
			return openSignIn({
				redirectUrl: `/dashboard?${new URLSearchParams(
					Object.fromEntries(
						Object.entries(values).map(([key, value]) => [key, String(value)]),
					),
				)}`,
			});
		}
		console.log("Saving to database ✨✨");
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
					<FormWrapper
						title={
							<>
								Gastos mensuales mínimos para poder{" "}
								<span className="font-bold">trabajar</span>
							</>
						}
						step={1}
						totalSteps={2}
					>
						<WorkExpensesForm intlConfig={intlConfig} />
					</FormWrapper>
					<FormWrapper
						title={
							<>
								Gastos mensuales mínimos para poder{" "}
								<span className="font-bold">vivir</span>
							</>
						}
						step={2}
						totalSteps={2}
					>
						<LivingExpensesForm intlConfig={intlConfig} />
						<AditionalCostsForm
							totalBaseSum={formResults.totalBaseSum}
							intlConfig={intlConfig}
						/>
					</FormWrapper>
				</form>
			</Form>
			<Island
				formRef={formRef}
				formResults={formResults}
				intlConfig={intlConfig}
			/>
			<ResultDrawer
				open={openDrawer}
				onSaveToDatabase={() => {
					saveToDatabase(watchedValues);
				}}
				handleOpenDrawer={setOpenDrawer}
			/>
			<Button
				form="mooonto"
				type="submit"
				variant="secondary"
				className="h-14 rounded-3xl font-bold text-2xl hover:bg-secondary/90"
			>
				Obtener resultado
			</Button>
		</div>
	);
}
