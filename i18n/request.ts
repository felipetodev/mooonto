import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "@/lib/constants";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
	const currencyCookie = (await cookies()).get(CURRENCY_COOKIE_KEY);
	const currency = currencyCookie?.value || DEFAULT_CURRENCY;

	const locale =
		CURRENCY_SELECTOR.find((c) => c.currency === currency)?.locale || "es";

	return {
		locale,
		messages: (await import(`../public/common/${locale.toLowerCase()}.json`))
			.default,
	};
});
