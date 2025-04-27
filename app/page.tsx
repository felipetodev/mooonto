import { AdsLayout } from "@/components/ads-layout";
import { Footer } from "@/components/footer";
import { MainForm } from "@/components/forms/form";
import { MainHero } from "@/components/main-hero";
import { CURRENCY_COOKIE_KEY, CURRENCY_SELECTOR } from "@/lib/constants";
import { cookies } from "next/headers";

export default async function Home() {
	const hasCustomCurrency = (await cookies()).get(CURRENCY_COOKIE_KEY)?.value;
	const currency = hasCustomCurrency ? JSON.parse(hasCustomCurrency) : "CLP";

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
