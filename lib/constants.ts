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

export const FORM_FIELDS_TWO = [
	{
		label: "Alquiler / hipoteca",
		name: "livingExpenses",
		description: "¿Cuánto pagas de alquiler o hipoteca?",
	},
	{
		label: "Gastos comunes",
		name: "commonExpenses",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Comida",
		name: "food",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Gimnasio",
		name: "gym",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Ocio",
		name: "entertainment",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Ropa y aseo personal",
		name: "clothes",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Cuota automóvil",
		name: "carFee",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Agua / luz / gas",
		name: "livingExpensesTwo",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Internet",
		name: "internet",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Teléfono personal",
		name: "personalPhone",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Plan de previsión de salud",
		name: "healthPlan",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Fondo jubilación",
		name: "retirementFund",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Otro tipo de gastos",
		name: "otherExpenses",
		description: "Lorem Ipsum dolor sit amet.",
	},
] as const;

// change variable name 😅
export const FORM_FIELDS_TWO_TWO = [
	{
		label: "Seguro de vivienda",
		name: "livingExpensesTwoTwo",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Seguro automotriz",
		name: "carInsurance",
		description: "Lorem Ipsum dolor sit amet.",
	},
	{
		label: "Impuestos",
		name: "taxes",
		description: "Lorem Ipsum dolor sit amet.",
	},
] as const;

export const CUSTOM_FORM_ERROR = {
	message: "Ingresa un monto mayor a 0",
} as const;

export const isProduction = process.env.NODE_ENV === "production";

export const CURRENCY_COOKIE_KEY = isProduction
	? "currency"
	: ("currency_dev" as const);
