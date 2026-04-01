import type { IntlConfig } from "@/lib/types";

export function formatCurrency(value: number, intlConfig: IntlConfig): string {
	return `${intlConfig.symbol}${value.toLocaleString("es-ES")}`;
}

export function formatDate(date: Date, locale = "es"): string {
	return date.toLocaleDateString(locale === "br" ? "pt-BR" : "es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function generatePieSlicePath(
	centerX: number,
	centerY: number,
	radius: number,
	startAngle: number,
	endAngle: number,
): string {
	const startRad = ((startAngle - 90) * Math.PI) / 180;
	const endRad = ((endAngle - 90) * Math.PI) / 180;

	const x1 = centerX + radius * Math.cos(startRad);
	const y1 = centerY + radius * Math.sin(startRad);
	const x2 = centerX + radius * Math.cos(endRad);
	const y2 = centerY + radius * Math.sin(endRad);

	const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

	return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
}

export type PieChartData = {
	label: string;
	value: number;
	percentage: number;
	color: string;
	startAngle: number;
	endAngle: number;
};

export function calculatePieChartData(
	data: { label: string; value: number; color: string }[],
): PieChartData[] {
	const total = data.reduce((sum, item) => sum + item.value, 0);

	if (total === 0) {
		return data.map((item) => ({
			...item,
			percentage: 0,
			startAngle: 0,
			endAngle: 0,
		}));
	}

	let currentAngle = 0;

	return data.map((item) => {
		const percentage = (item.value / total) * 100;
		const angle = (item.value / total) * 360;
		const startAngle = currentAngle;
		const endAngle = currentAngle + angle;
		currentAngle = endAngle;

		return {
			...item,
			percentage,
			startAngle,
			endAngle,
		};
	});
}

export function generatePdfFilename(locale: string): string {
	const date = new Date();
	const dateStr = date.toISOString().split("T")[0];
	return `mooonto-reporte-${locale.toLowerCase()}-${dateStr}.pdf`;
}
