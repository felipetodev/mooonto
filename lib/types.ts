import type messages from "@/public/common/es.json";

declare module "next-intl" {
	interface AppConfig {
		Messages: typeof messages;
	}
}

export interface IntlConfig {
	name: string;
	currency: string;
	locale: string;
	symbol: "$" | "€" | "S/" | "₲" | "R$";
}
