import { NavBar } from "@/components/navbar";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<NavBar />
			<main className="flex min-h-[calc(100vh-64px)] flex-1 flex-col text-[#F7F4F0]">
				{children}
			</main>
		</>
	);
}
