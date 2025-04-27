import { CUSTOM_FORM_ERROR as customFormError } from "@/lib/constants";
import * as z from "zod";

const createPositiveField = () => z.number().positive(customFormError);
const createConditionalField = () => z.number().optional();
const validateConditionalField = (
	ctx: z.RefinementCtx,
	value: number | undefined,
	path: string[],
) => {
	if (!value || value <= 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: customFormError.message,
			path,
		});
	}
};

const stepOneBaseFields = {
	selfEmployed: createPositiveField(),
	consultancy: createPositiveField(),
	lifecycleEquipment: createPositiveField(),
	subscriptions: createPositiveField(),
	cowork: z.boolean(),
	gasoline: createPositiveField(),
	coffee: createPositiveField(),
	water: createPositiveField(),
};

const stepOneOfficeFields = {
	officeRent: createConditionalField(),
	officeInsurance: createConditionalField(),
	officeBills: createConditionalField(),
	officeInternet: createConditionalField(),
};

const stepTwoBaseFields = {
	livingExpenses: createPositiveField(),
	commonExpenses: createPositiveField(),
	food: createPositiveField(),
	gym: createPositiveField(),
	entertainment: createPositiveField(),
	clothes: createPositiveField(),
	carFee: createPositiveField(),
	livingExpensesTwo: createPositiveField(),
	internet: createPositiveField(),
	personalPhone: createPositiveField(),
	healthPlan: createPositiveField(),
	retirementFund: createPositiveField(),
	otherExpenses: createPositiveField(),
	childrens: z.boolean(),
};

const stepTwoChildrenFields = {
	quantityChildrens: createConditionalField(),
	childrensExpenses: createConditionalField(),
	livingExpensesTwoTwo: createConditionalField(),
	carInsurance: createConditionalField(),
	taxes: createConditionalField(),
	incomeTaxRetention: createConditionalField(),
	valueContribution: createConditionalField(),
	unExpectedExpenses: createConditionalField(),
};

export const formSchema = z
	.object({
		...stepOneBaseFields,
		...stepOneOfficeFields,
		...stepTwoBaseFields,
		...stepTwoChildrenFields,
	})
	.superRefine((data, ctx) => {
		// Validate office fields only when cowork is true
		if (data.cowork) {
			const officeFieldsToValidate = [
				{ value: data.officeRent, path: "officeRent" },
				{ value: data.officeInsurance, path: "officeInsurance" },
				{ value: data.officeBills, path: "officeBills" },
				{ value: data.officeInternet, path: "officeInternet" },
			];

			officeFieldsToValidate.forEach((field) => {
				validateConditionalField(ctx, field.value, [field.path]);
			});
		}
	})
	.superRefine((data, ctx) => {
		// Validate children fields only when childrens is true
		if (data.childrens) {
			const childrenFieldsToValidate = [
				{ value: data.quantityChildrens, path: "quantityChildrens" },
				{ value: data.childrensExpenses, path: "childrensExpenses" },
				{ value: data.livingExpensesTwoTwo, path: "livingExpensesTwoTwo" },
				{ value: data.carInsurance, path: "carInsurance" },
				{ value: data.taxes, path: "taxes" },
				{ value: data.incomeTaxRetention, path: "incomeTaxRetention" },
				{ value: data.valueContribution, path: "valueContribution" },
				{ value: data.unExpectedExpenses, path: "unExpectedExpenses" },
			];

			childrenFieldsToValidate.forEach((field) => {
				validateConditionalField(ctx, field.value, [field.path]);
			});
		}
	});

export type FormValues = z.infer<typeof formSchema>;
