import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { delaGothicOne, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

export const metadata: Metadata = {
	title: "Mooonto",
	description:
		"Mooonto es una herramienta para creativos autónomos, freelance o empleados que ayuda a calcular el valor/hora de su trabajo en base en tus propios datos y costos de vida.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
					delaGothicOne.variable,
				)}
			>
				<NextIntlClientProvider>
					<NavBar />
					<main className="flex min-h-[calc(100vh-64px)] flex-1 flex-col text-[#F7F4F0]">
						{children}
					</main>
					<Toaster position="top-center" richColors />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
