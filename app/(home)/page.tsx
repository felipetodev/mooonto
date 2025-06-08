import { AdsLayout } from "@/components/ads-layout";
import { Footer } from "@/components/footer";
import { MainForm } from "@/components/forms/form";
import { MainHero } from "@/components/main-hero";
import { getCurrencyCookie } from "@/lib/utils.server";

export default async function Home() {
	const intlConfig = await getCurrencyCookie();

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
