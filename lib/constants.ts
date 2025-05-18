import type { IntlConfig } from "./types";

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
		label: "livingExpensesTwoTwo.label" as LivingExpensesKey,
		subLabel: "livingExpensesTwoTwo.subLabel" as LivingExpensesKey,
		description: "livingExpensesTwoTwo.description" as LivingExpensesKey,
	},
	{
		name: "carInsurance",
		label: "carInsurance.label" as LivingExpensesKey,
		subLabel: "carInsurance.subLabel" as LivingExpensesKey,
		description: "carInsurance.description" as LivingExpensesKey,
	},
	{
		name: "taxes",
		label: "taxes.label" as LivingExpensesKey,
		subLabel: "taxes.subLabel" as LivingExpensesKey,
		description: "taxes.description" as LivingExpensesKey,
	},
] as const;

export const CUSTOM_FORM_ERROR = {
	message: "Ingresa un monto mayor a 0",
} as const;

export const isProduction = process.env.NODE_ENV === "production";

export const CURRENCY_COOKIE_KEY = isProduction
	? "currency"
	: ("currency_dev" as const);
