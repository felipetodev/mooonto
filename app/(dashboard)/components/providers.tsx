"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DashboardProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	useEffect(() => {
		if (
			window.location.pathname === "/dashboard" &&
			new URLSearchParams(window.location.search).size > 0
		) {
			router.replace("/dashboard");
		}
	}, []);

	return <>{children}</>;
}
