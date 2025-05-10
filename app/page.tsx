import { AdsLayout } from "@/components/ads-layout";
import { Footer } from "@/components/footer";
import { MainForm } from "@/components/forms/form";
import { MainHero } from "@/components/main-hero";
import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "@/lib/constants";
import { cookies } from "next/headers";

export default async function Home() {
	const currencyCookie = (await cookies()).get(CURRENCY_COOKIE_KEY);
	const currency = currencyCookie?.value || DEFAULT_CURRENCY;

	const intlConfig = CURRENCY_SELECTOR.find((c) => c.currency === currency)!;

	return (
		<>
			<MainHero />
			<AdsLayout>
				<MainForm intlConfig={intlConfig} />
			</AdsLayout>
			<Footer />
		</>
	);
}
