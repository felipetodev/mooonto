import { StyleSheet } from "@react-pdf/renderer";

// brand colors
export const colors = {
	primary: "#1A1A18",
	secondary: "#F7F4F0",
	accent: "#6366F1",
	muted: "#71717A",
	border: "#E4E4E7",
	// pie chart colors
	chart: {
		work: "#6366F1", // Indigo - gastos de trabajo
		living: "#22C55E", // Green - gastos de vivienda
		additional: "#F59E0B", // Amber - costos adicionales
	},
} as const;

export const styles = StyleSheet.create({
	// Page
	page: {
		padding: 40,
		backgroundColor: "#FFFFFF",
		fontFamily: "Helvetica",
		fontSize: 10,
		color: colors.primary,
	},

	// Header
	header: {
		marginBottom: 30,
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 24,
		fontFamily: "Helvetica-Bold",
		marginBottom: 4,
	},
	headerSubtitle: {
		fontSize: 12,
		color: colors.muted,
		marginBottom: 12,
	},
	headerMeta: {
		flexDirection: "row",
		justifyContent: "space-between",
		fontSize: 9,
		color: colors.muted,
		alignItems: "center",
	},
	currencyWithFlag: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	flagImage: {
		width: 14,
		height: 10,
		marginHorizontal: 4,
	},

	// Section
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 14,
		fontFamily: "Helvetica-Bold",
		marginBottom: 12,
		color: colors.primary,
	},

	// Summary Table
	table: {
		width: "100%",
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		paddingVertical: 8,
	},
	tableRowHighlight: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: colors.border,
		paddingVertical: 8,
		backgroundColor: colors.secondary,
	},
	tableCell: {
		flex: 1,
	},
	tableCellRight: {
		flex: 1,
		textAlign: "right",
		fontFamily: "Helvetica-Bold",
	},
	tableHeader: {
		flexDirection: "row",
		borderBottomWidth: 2,
		borderBottomColor: colors.primary,
		paddingBottom: 8,
		marginBottom: 4,
	},
	tableHeaderCell: {
		flex: 1,
		fontFamily: "Helvetica-Bold",
		fontSize: 10,
	},
	tableHeaderCellRight: {
		flex: 1,
		textAlign: "right",
		fontFamily: "Helvetica-Bold",
		fontSize: 10,
	},

	// Totals
	totalRow: {
		flexDirection: "row",
		paddingVertical: 12,
		marginTop: 8,
		backgroundColor: colors.secondary,
		paddingHorizontal: 8,
	},
	totalLabel: {
		flex: 1,
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
	},
	totalValue: {
		flex: 1,
		textAlign: "right",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
	},

	// Rates Section
	ratesContainer: {
		flexDirection: "row",
		gap: 16,
		marginTop: 8,
	},
	rateCard: {
		flex: 1,
		padding: 16,
		backgroundColor: colors.secondary,
		borderRadius: 4,
	},
	rateCardAccent: {
		flex: 1,
		padding: 16,
		backgroundColor: colors.accent,
		borderRadius: 4,
	},
	rateLabel: {
		fontSize: 9,
		color: colors.muted,
		marginBottom: 4,
	},
	rateLabelLight: {
		fontSize: 9,
		color: "#FFFFFF",
		opacity: 0.8,
		marginBottom: 4,
	},
	rateValue: {
		fontSize: 18,
		fontFamily: "Helvetica-Bold",
	},
	rateValueLight: {
		fontSize: 18,
		fontFamily: "Helvetica-Bold",
		color: "#FFFFFF",
	},
	rateBadge: {
		fontSize: 8,
		color: colors.muted,
		marginTop: 4,
	},
	rateBadgeLight: {
		fontSize: 8,
		color: "#FFFFFF",
		opacity: 0.7,
		marginTop: 4,
	},

	// Chart Section
	chartContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 24,
	},
	chartSvg: {
		width: 120,
		height: 120,
	},
	chartLegend: {
		flex: 1,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	legendColor: {
		width: 12,
		height: 12,
		borderRadius: 2,
		marginRight: 8,
	},
	legendLabel: {
		flex: 1,
		fontSize: 10,
	},
	legendValue: {
		fontSize: 10,
		fontFamily: "Helvetica-Bold",
	},

	// Footer
	footer: {
		position: "absolute",
		bottom: 30,
		left: 40,
		right: 40,
		borderTopWidth: 1,
		borderTopColor: colors.border,
		paddingTop: 12,
	},
	footerText: {
		fontSize: 8,
		color: colors.muted,
		textAlign: "center",
		lineHeight: 1.4,
	},

	// Utility
	flexRow: {
		flexDirection: "row",
	},
	mb8: {
		marginBottom: 8,
	},
	mb16: {
		marginBottom: 16,
	},
	bold: {
		fontFamily: "Helvetica-Bold",
	},
});
