import { formatCurrency } from "@/lib/pdf-utils";
import type { IntlConfig } from "@/lib/types";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type ReportRatesProps = {
	minimumHourlyRateContracted: number;
	minimumHourlyRateFreelance: number;
	minimumHourlyRateContractedWithValue: number;
	minimumHourlyRateFreelanceWithValue: number;
	intlConfig: IntlConfig;
	translations: {
		ratesTitle: string;
		ratesTitleWithValue: string;
		contractedRate: string;
		freelanceRate: string;
		perHour: string;
	};
};

function RateCard({
	label,
	value,
	badge,
	intlConfig,
	accent = false,
}: {
	label: string;
	value: number;
	badge: string;
	intlConfig: IntlConfig;
	accent?: boolean;
}) {
	return (
		<View style={accent ? styles.rateCardAccent : styles.rateCard}>
			<Text style={accent ? styles.rateLabelLight : styles.rateLabel}>
				{label}
			</Text>
			<Text style={accent ? styles.rateValueLight : styles.rateValue}>
				{formatCurrency(value, intlConfig)}
			</Text>
			<Text style={accent ? styles.rateBadgeLight : styles.rateBadge}>
				{badge}
			</Text>
		</View>
	);
}

export function ReportRates({
	minimumHourlyRateContracted,
	minimumHourlyRateFreelance,
	minimumHourlyRateContractedWithValue,
	minimumHourlyRateFreelanceWithValue,
	intlConfig,
	translations,
}: ReportRatesProps) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{translations.ratesTitle}</Text>
			<View style={styles.ratesContainer}>
				<RateCard
					label={translations.contractedRate}
					value={minimumHourlyRateContracted}
					badge={translations.perHour}
					intlConfig={intlConfig}
				/>
				<RateCard
					label={translations.freelanceRate}
					value={minimumHourlyRateFreelance}
					badge={translations.perHour}
					intlConfig={intlConfig}
					accent
				/>
			</View>

			<Text style={[styles.sectionTitle, { marginTop: 16 }]}>
				{translations.ratesTitleWithValue}
			</Text>
			<View style={styles.ratesContainer}>
				<RateCard
					label={translations.contractedRate}
					value={minimumHourlyRateContractedWithValue}
					badge={translations.perHour}
					intlConfig={intlConfig}
				/>
				<RateCard
					label={translations.freelanceRate}
					value={minimumHourlyRateFreelanceWithValue}
					badge={translations.perHour}
					intlConfig={intlConfig}
					accent
				/>
			</View>
		</View>
	);
}
