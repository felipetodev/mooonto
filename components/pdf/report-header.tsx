import { formatDate } from "@/lib/pdf-utils";
import type { IntlConfig } from "@/lib/types";
import { Image, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type ReportHeaderProps = {
	intlConfig: IntlConfig;
	generatedAt: Date;
	translations: {
		title: string;
		subtitle: string;
		currency: string;
		generatedAt: string;
	};
};

/**
 * Genera la URL de la bandera en formato PNG para el locale dado
 * Usamos flagcdn.com que ofrece PNGs (react-pdf no soporta bien SVGs remotos)
 */
function getFlagUrl(locale: string): string {
	return `https://flagcdn.com/w40/${locale.toLowerCase()}.png`;
}

export function ReportHeader({
	intlConfig,
	generatedAt,
	translations,
}: ReportHeaderProps) {
	const flagUrl = getFlagUrl(intlConfig.locale);

	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{translations.title}</Text>
			<Text style={styles.headerSubtitle}>{translations.subtitle}</Text>
			<View style={styles.headerMeta}>
				<View style={styles.currencyWithFlag}>
					<Text>{translations.currency}: </Text>
					<Image src={flagUrl} style={styles.flagImage} />
					<Text>
						{intlConfig.name} ({intlConfig.currency})
					</Text>
				</View>
				<Text>
					{translations.generatedAt}:{" "}
					{formatDate(generatedAt, intlConfig.locale.toLowerCase())}
				</Text>
			</View>
		</View>
	);
}
