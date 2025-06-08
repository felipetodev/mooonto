import { useEffect, useState } from "react";

function getDevice({
	mobileBreakPoint = 640,
}: { mobileBreakPoint?: number }): "mobile" | "tablet" | "desktop" | null {
	if (typeof window === "undefined") return null;

	return window.matchMedia("(min-width: 1024px)").matches
		? "desktop"
		: window.matchMedia(`(min-width: ${mobileBreakPoint}px)`).matches
			? "tablet"
			: "mobile";
}

export function useMediaQuery({
	mobileBreakPoint,
}: { mobileBreakPoint?: number } = {}) {
	const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
		getDevice({ mobileBreakPoint }),
	);

	useEffect(() => {
		const checkDevice = () => {
			setDevice(getDevice({ mobileBreakPoint }));
		};

		// Initial detection
		checkDevice();

		// Listener for windows resize
		window.addEventListener("resize", checkDevice);

		// Cleanup listener
		return () => {
			window.removeEventListener("resize", checkDevice);
		};
	}, []);

	return {
		device,
		isMobile: device === "mobile",
	};
}
