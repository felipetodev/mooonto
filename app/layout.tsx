import { Toaster } from "@/components/ui/sonner";
import { delaGothicOne, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
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
		<ClerkProvider
			appearance={{
				elements: {
					// auth button
					rootBox: "!w-full",
					userButtonAvatarBox: "h-5 w-5",
					userButtonAvatarImage: "h-5 w-5",
					userButtonTrigger:
						"!h-10 !p-0 !w-full flex !justify-start hover:!bg-sidebar-accent group-data-[collapsible=icon]:hover:!bg-transparent !px-2 group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!bg-transparent group-data-[collapsible=icon]:!border-none transition-colors focus-visible:!ring-secondary focus-visible:!ring-[2px] !text-white hover:!text-foreground",
					userButtonBox: "!flex-row-reverse !gap-2 items-center",
					userButtonOuterIdentifier: "text-sm font-medium truncate",
					userButtonPopoverFooter: "!hidden",
				},
			}}
		>
			<html lang="es">
				<body
					className={cn(
						"min-h-screen bg-[#1A1A18] font-sans antialiased",
						fontSans.variable,
						delaGothicOne.variable,
					)}
				>
					<NextIntlClientProvider>
						{children}
						<Toaster position="top-center" richColors />
					</NextIntlClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
