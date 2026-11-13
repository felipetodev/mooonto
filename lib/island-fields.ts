import type { FormCompletionProgressResult } from "@/hooks/use-form-completions";
import type { FormValues } from "@/schemas/form";

export type SectionId = "work" | "living" | "extra";

export type FieldDef = {
	name: keyof FormValues;
	label: string;
	section: SectionId;
	/** Entered per year, counted per month (value / 12). */
	yearly?: boolean;
	unit?: "percent" | "count";
	/** Only asked when this toggle is on. */
	when?: "cowork" | "childrens";
};

export const SECTIONS: { id: SectionId; title: string; short: string }[] = [
	{ id: "work", title: "Gastos para trabajar", short: "Trabajo" },
	{ id: "living", title: "Gastos para vivir", short: "Vivienda" },
	{ id: "extra", title: "Costos adicionales", short: "Adicionales" },
];

export const FIELDS: FieldDef[] = [
	{ name: "selfEmployed", label: "Autónomos", section: "work" },
	{ name: "consultancy", label: "Asesoría / Gestoría", section: "work" },
	{
		name: "lifecycleEquipment",
		label: "Vida útil de tus equipos",
		section: "work",
		yearly: true,
	},
	{ name: "subscriptions", label: "Suscripciones", section: "work" },
	{
		name: "officeRent",
		label: "Alquiler de oficina / Cowork",
		section: "work",
		when: "cowork",
	},
	{
		name: "officeInsurance",
		label: "Seguro oficina",
		section: "work",
		yearly: true,
		when: "cowork",
	},
	{
		name: "officeBills",
		label: "Agua / luz / gas oficina",
		section: "work",
		when: "cowork",
	},
	{
		name: "officeInternet",
		label: "Internet / teléfono oficina",
		section: "work",
		when: "cowork",
	},
	{ name: "gasoline", label: "Gasolina / diesel", section: "work" },
	{ name: "coffee", label: "Café", section: "work" },
	{ name: "water", label: "Agua", section: "work" },

	{ name: "livingExpenses", label: "Alquiler / hipoteca", section: "living" },
	{ name: "commonExpenses", label: "Gastos comunes", section: "living" },
	{ name: "food", label: "Comida", section: "living" },
	{ name: "gym", label: "Gimnasio", section: "living" },
	{ name: "entertainment", label: "Ocio", section: "living" },
	{ name: "clothes", label: "Ropa y aseo personal", section: "living" },
	{ name: "carFee", label: "Cuota automóvil", section: "living" },
	{ name: "livingExpensesTwo", label: "Agua / luz / gas", section: "living" },
	{ name: "internet", label: "Internet", section: "living" },
	{ name: "personalPhone", label: "Teléfono personal", section: "living" },
	{
		name: "healthPlan",
		label: "Plan de previsión de salud",
		section: "living",
	},
	{ name: "retirementFund", label: "Fondo jubilación", section: "living" },
	{ name: "otherExpenses", label: "Otro tipo de gastos", section: "living" },
	{
		name: "livingExpensesTwoTwo",
		label: "Seguro de vivienda",
		section: "living",
		yearly: true,
	},
	{
		name: "carInsurance",
		label: "Seguro automotriz",
		section: "living",
		yearly: true,
	},
	{ name: "taxes", label: "Impuestos", section: "living", yearly: true },
	{
		name: "quantityChildrens",
		label: "Personas a tu cargo",
		section: "living",
		unit: "count",
		when: "childrens",
	},
	{
		name: "childrensExpenses",
		label: "Gasto mensual por persona a cargo",
		section: "living",
		when: "childrens",
	},

	{
		name: "unExpectedExpenses",
		label: "Imprevistos",
		section: "extra",
		unit: "percent",
	},
	{
		name: "valueContribution",
		label: "Valor que aportas",
		section: "extra",
		unit: "percent",
	},
	{
		name: "incomeTaxRetention",
		label: "Retención IRPF",
		section: "extra",
		unit: "percent",
	},
];

export type Row = {
	def: FieldDef;
	value: number;
	filled: boolean;
	/** What this row adds to the monthly total (0 for percent/count rows). */
	monthly: number;
};

export type SectionSummary = {
	id: SectionId;
	title: string;
	short: string;
	rows: Row[];
	missing: Row[];
	total: number;
};

export type IslandSummary = {
	sections: SectionSummary[];
	rows: Row[];
	missing: Row[];
	filledCount: number;
	requiredCount: number;
};

export function buildIslandSummary(
	values: FormValues,
	results: FormCompletionProgressResult,
): IslandSummary {
	const num = (name: keyof FormValues) => Number(values[name] ?? 0);

	const rows: Row[] = FIELDS.filter((f) => !f.when || values[f.when]).map(
		(def) => {
			const value = num(def.name);
			let monthly = 0;
			if (def.name === "childrensExpenses") {
				monthly = value * num("quantityChildrens");
			} else if (!def.unit) {
				monthly = def.yearly ? Math.round(value / 12) : value;
			}
			return { def, value, filled: value > 0, monthly };
		},
	);

	const totals: Record<SectionId, number> = {
		work: results.totalStepOne,
		living: results.totalStepTwo,
		extra: results.totalResult - results.totalBaseSum,
	};

	const sections = SECTIONS.map((s) => {
		const sectionRows = rows.filter((r) => r.def.section === s.id);
		return {
			...s,
			rows: sectionRows,
			missing: sectionRows.filter((r) => !r.filled),
			total: totals[s.id],
		};
	});

	return {
		sections,
		rows,
		missing: rows.filter((r) => !r.filled),
		filledCount: rows.filter((r) => r.filled).length,
		requiredCount: rows.length,
	};
}

const numberFormat = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

export function money(value: number, symbol: string) {
	return `${symbol}${numberFormat.format(value)}`;
}

/** The value exactly as the user typed it, with its unit. */
export function entered(row: Row, symbol: string) {
	if (row.def.unit === "percent") return `${row.value}%`;
	if (row.def.unit === "count") return String(row.value);
	return money(row.value, symbol);
}
