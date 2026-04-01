import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type ReportFooterProps = {
	translations: {
		disclaimer: string;
		poweredBy: string;
	};
};

export function ReportFooter({ translations }: ReportFooterProps) {
	return (
		<View style={styles.footer}>
			<Text style={styles.footerText}>{translations.disclaimer}</Text>
			<Text style={[styles.footerText, { marginTop: 8 }]}>
				{translations.poweredBy}
			</Text>
		</View>
	);
}
