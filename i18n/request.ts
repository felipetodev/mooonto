import { getCurrencyCookie } from "@/lib/utils.server";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	const { locale } = await getCurrencyCookie();

	return {
		locale,
		messages: (await import(`../public/common/${locale.toLowerCase()}.json`))
			.default,
	};
});
