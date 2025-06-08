import type { Metadata } from "next";
import { DashboardProviders as Provider } from "./components/providers";

export const metadata: Metadata = {
	title: "Mooonto | Dashboard",
};

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Provider>
			<main className="flex min-h-screen flex-1 flex-col text-[#F7F4F0]">
				{children}
			</main>
		</Provider>
	);
}
