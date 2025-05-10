import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useCookies(
	key: string,
	initialValue: string,
	opts?: Cookies.CookieAttributes,
): [string, (value: string) => void] {
	const [storedValue, setStoredValue] = useState<string>(() => {
		// Retrieve from Cookies
		const item = Cookies.get(key);
		return item || initialValue;
	});

	useEffect(() => {
		// Update state if the cookie changes
		const handleStorageChange = () => {
			const item = Cookies.get(key);
			if (item) {
				setStoredValue(item);
			}
		};

		// Add listener for storage changes
		window.addEventListener("storage", handleStorageChange);

		// Cleanup
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [key]);

	const setValue = (value: string) => {
		// Save state
		setStoredValue(value);
		// Save to Cookies
		Cookies.set(key, value, opts);
	};

	return [storedValue, setValue];
}
