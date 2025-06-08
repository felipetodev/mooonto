import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface PopupAuthConfig {
	width?: number;
	height?: number;
	pollingInterval?: number;
	timeoutDuration?: number;
}

interface PopupAuthHook {
	openAuthPopup: (authUrl: string, config?: PopupAuthConfig) => Promise<void>;
}

export const usePopupAuth = (): PopupAuthHook => {
	const router = useRouter();

	const openAuthPopup = useCallback(
		async (authUrl: string, config: PopupAuthConfig = {}): Promise<void> => {
			const {
				width = 900,
				height = 620,
				pollingInterval = 1000,
				timeoutDuration = 180000, // 3 minutes
			} = config;

			return new Promise((resolve, reject) => {
				let cleanup: (() => void) | null = null;

				const popup = window.open(
					authUrl,
					"google-auth",
					`left=${(screen.width - width) / 2},top=${(screen.height - height) / 2},width=${width},height=${height},personalbar=0,toolbar=0,scrollbars=0,resizable=0`,
				);

				if (!popup) {
					// ask for permission to open popup
					return toast.error(
						"Please allow popups for this website to continue with the authentication process.",
					);
				}

				let isResolved = false;

				const pollForCompletion = () => {
					const startTime = Date.now();

					const interval = setInterval(() => {
						try {
							// Check if popup was closed by user
							if (popup.closed) {
								clearInterval(interval);
								if (!isResolved) {
									cleanup?.();
									console.warn("Integration access cancelled by user");
								}
								return;
							}

							// Check for timeout
							if (Date.now() - startTime > timeoutDuration) {
								clearInterval(interval);
								popup.close();
								cleanup?.();
								console.warn("Authentication timeout");
								return;
							}

							// Check if authentication was successful
							const currentUrl = popup.location.href;
							const baseUrl = window.location.origin;

							if (currentUrl === `${baseUrl}/` || currentUrl === baseUrl) {
								isResolved = true;
								clearInterval(interval);
								popup.close();
								cleanup?.();
								router.refresh();
								resolve();
							} else if (currentUrl.includes("/404")) {
								isResolved = true;
								clearInterval(interval);
								popup.close();
								cleanup?.();
								console.warn("Integration access cancelled by user");
							}
						} catch {}
					}, pollingInterval);

					return interval;
				};

				const interval = pollForCompletion();

				// Setup cleanup function
				cleanup = () => {
					clearInterval(interval);
					if (!popup.closed) {
						popup.close();
					}
					window.removeEventListener("beforeunload", handleUnload);
				};

				const handleUnload = () => {
					cleanup?.();
				};

				window.addEventListener("beforeunload", handleUnload);
			});
		},
		[router],
	);

	return { openAuthPopup };
};
