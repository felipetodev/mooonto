import type common from "@/public/common/es.json";

declare module "next-intl" {
	interface AppConfig {
		Messages: typeof common;
	}
}

export interface IntlConfig {
	name: string;
	currency: string;
	locale: string;
	symbol: "$" | "€" | "S/" | "₲" | "R$";
}
