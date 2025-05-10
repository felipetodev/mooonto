import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "@/lib/constants";
import type { IntlConfig } from "@/lib/types";
import { cookies } from "next/headers";

export async function getCurrencyCookie(): Promise<IntlConfig> {
	const currencyCookie = (await cookies()).get(CURRENCY_COOKIE_KEY);
	const currency = currencyCookie?.value || DEFAULT_CURRENCY;

	return CURRENCY_SELECTOR.find((c) => c.currency === currency)!;
}
