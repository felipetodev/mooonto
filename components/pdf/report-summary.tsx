import { formatCurrency } from "@/lib/pdf-utils";
import type { IntlConfig } from "@/lib/types";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type ExpenseItem = {
	label: string;
	value: number;
};

type ReportSummaryProps = {
	workExpenses: ExpenseItem[];
	livingExpenses: ExpenseItem[];
	additionalCosts: ExpenseItem[];
	totalWork: number;
	totalLiving: number;
	totalAdditional: number;
	totalMonthly: number;
	intlConfig: IntlConfig;
	translations: {
		workExpensesTitle: string;
		livingExpensesTitle: string;
		additionalCostsTitle: string;
		totalTitle: string;
		category: string;
		amount: string;
	};
};

function SummarySection({
	title,
	items,
	total,
	intlConfig,
	translations,
}: {
	title: string;
	items: ExpenseItem[];
	total: number;
	intlConfig: IntlConfig;
	translations: { category: string; amount: string };
}) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.table}>
				<View style={styles.tableHeader}>
					<Text style={styles.tableHeaderCell}>{translations.category}</Text>
					<Text style={styles.tableHeaderCellRight}>{translations.amount}</Text>
				</View>
				{items.map((item, index) => (
					<View
						key={`${item.label}-${index}`}
						style={index % 2 === 1 ? styles.tableRowHighlight : styles.tableRow}
					>
						<Text style={styles.tableCell}>{item.label}</Text>
						<Text style={styles.tableCellRight}>
							{formatCurrency(item.value, intlConfig)}
						</Text>
					</View>
				))}
				<View style={styles.totalRow}>
					<Text style={styles.totalLabel}>Subtotal</Text>
					<Text style={styles.totalValue}>
						{formatCurrency(total, intlConfig)}
					</Text>
				</View>
			</View>
		</View>
	);
}

export function ReportSummary({
	workExpenses,
	livingExpenses,
	additionalCosts,
	totalWork,
	totalLiving,
	totalAdditional,
	totalMonthly,
	intlConfig,
	translations,
}: ReportSummaryProps) {
	return (
		<View>
			<SummarySection
				title={translations.workExpensesTitle}
				items={workExpenses}
				total={totalWork}
				intlConfig={intlConfig}
				translations={translations}
			/>

			<SummarySection
				title={translations.livingExpensesTitle}
				items={livingExpenses}
				total={totalLiving}
				intlConfig={intlConfig}
				translations={translations}
			/>

			{additionalCosts.length > 0 && (
				<SummarySection
					title={translations.additionalCostsTitle}
					items={additionalCosts}
					total={totalAdditional}
					intlConfig={intlConfig}
					translations={translations}
				/>
			)}

			<View style={[styles.totalRow, { marginTop: 16, marginBottom: 24 }]}>
				<Text style={[styles.totalLabel, { fontSize: 14 }]}>
					{translations.totalTitle}
				</Text>
				<Text style={[styles.totalValue, { fontSize: 14 }]}>
					{formatCurrency(totalMonthly, intlConfig)}
				</Text>
			</View>
		</View>
	);
}
