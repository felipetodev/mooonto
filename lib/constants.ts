import type { IntlConfig } from "@/lib/types";
import type { FormValues } from "@/schemas/form";

export const DEFAULT_CURRENCY = "EUR" as const;

export const CURRENCY_SELECTOR: IntlConfig[] = [
	{
		name: "Chile",
		currency: "CLP",
		locale: "CL",
		symbol: "$",
	},
	{
		name: "Argentina",
		currency: "ARS",
		locale: "AR",
		symbol: "$",
	},
	{
		name: "Colombia",
		currency: "COP",
		locale: "CO",
		symbol: "$",
	},
	{
		name: "Mexico",
		currency: "MXN",
		locale: "MX",
		symbol: "$",
	},
	{
		name: "España",
		currency: "EUR",
		locale: "ES",
		symbol: "€",
	},
	{
		name: "USA",
		currency: "USD",
		locale: "US",
		symbol: "$",
	},
	{
		name: "Uruguay",
		currency: "UYU",
		locale: "UY",
		symbol: "$",
	},
	{
		name: "Brazil",
		currency: "BRL",
		locale: "BR",
		symbol: "R$",
	},
	{
		name: "Peru",
		currency: "PEN",
		locale: "PE",
		symbol: "S/",
	},
	{
		name: "Paraguay",
		currency: "PYG",
		locale: "PY",
		symbol: "₲",
	},
	{
		name: "Bolivia",
		currency: "BOB",
		locale: "BO",
		symbol: "$",
	},
] as const;

export const DEFAULT_WORK_EXPENSES_VALUES: Partial<FormValues> = {
	selfEmployed: 0,
	consultancy: 0,
	lifecycleEquipment: 0,
	subscriptions: 0,
	cowork: false,
	officeRent: undefined, // cowork conditional field
	officeInsurance: undefined, // cowork conditional field
	officeBills: undefined, // cowork conditional field
	officeInternet: undefined, // cowork conditional field
	gasoline: 0,
	coffee: 0,
	water: 0,
};

export const DEFAULT_LIVING_EXPENSES_VALUES: Partial<FormValues> = {
	livingExpenses: 0,
	commonExpenses: 0,
	food: 0,
	gym: 0,
	entertainment: 0,
	clothes: 0,
	carFee: 0,
	livingExpensesTwo: 0,
	internet: 0,
	personalPhone: 0,
	healthPlan: 0,
	retirementFund: 0,
	otherExpenses: 0,
	childrens: false,
	// childrens conditional fields
	quantityChildrens: undefined,
	childrensExpenses: undefined,
	livingExpensesTwoTwo: undefined,
	carInsurance: undefined,
	taxes: undefined,
	unExpectedExpenses: undefined,
	valueContribution: undefined,
	incomeTaxRetention: undefined,
};

export const WORK_EXPENSES_FIELDS = [
	"selfEmployed",
	"consultancy",
	"lifecycleEquipment",
	"subscriptions",
	"cowork",
	"officeRent",
	"officeInsurance",
	"officeBills",
	"officeInternet",
	"gasoline",
	"coffee",
	"water",
] as readonly (keyof FormValues)[];

export const LIVING_EXPENSES_FIELDS = [
	"livingExpenses",
	"commonExpenses",
	"food",
	"gym",
	"entertainment",
	"clothes",
	"carFee",
	"livingExpensesTwo",
	"internet",
	"personalPhone",
	"healthPlan",
	"retirementFund",
	"otherExpenses",
] as const;

export const OFFICE_CONDITIONAL_FIELDS = [
	"officeRent",
	"officeInsurance",
	"officeBills",
	"officeInternet",
] as readonly (keyof FormValues)[];

export const CHILDREN_CONDITIONAL_FIELDS = [
	"quantityChildrens",
	"childrensExpenses",
	"livingExpensesTwoTwo",
	"carInsurance",
	"taxes",
	"unExpectedExpenses",
	"valueContribution",
	"incomeTaxRetention",
] as readonly (keyof FormValues)[];

type LivingExpensesKey =
	`${(typeof LIVING_EXPENSES_FIELDS)[number]}.${"label" | "description"}`;

export const FORM_FIELDS_TWO = LIVING_EXPENSES_FIELDS.map((name) => ({
	name,
	label: `${name}.label` as LivingExpensesKey,
	description: `${name}.description` as LivingExpensesKey,
}));

// change variable name 😅
export const FORM_FIELDS_TWO_TWO = [
	{
		name: "livingExpensesTwoTwo",
		label: "livingExpensesTwoTwo.label",
		subLabel: "livingExpensesTwoTwo.subLabel",
		description: "livingExpensesTwoTwo.description",
	},
	{
		name: "carInsurance",
		label: "carInsurance.label",
		subLabel: "carInsurance.subLabel",
		description: "carInsurance.description",
	},
	{
		name: "taxes",
		label: "taxes.label",
		subLabel: "taxes.subLabel",
		description: "taxes.description",
	},
] as const;

export const CUSTOM_FORM_ERROR = {
	message: "Ingresa un monto mayor a 0",
} as const;

export const isProduction = process.env.NODE_ENV === "production";

export const CURRENCY_COOKIE_KEY = isProduction
	? "currency"
	: ("currency_dev" as const);
