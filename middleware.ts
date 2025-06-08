import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "@/lib/constants";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
	if (isProtectedRoute(req)) await auth.protect();

	const url = req.nextUrl.clone();

	const country = req.headers.get("x-vercel-ip-country");
	const city = req.headers.get("x-vercel-ip-city");
	// const browserLang = req.headers.get("accept-language")?.split(",")[0];

	const currencyCookie = req.cookies.get(CURRENCY_COOKIE_KEY);

	const res = NextResponse.rewrite(url);

	if (!currencyCookie) {
		[
			[
				CURRENCY_COOKIE_KEY,
				CURRENCY_SELECTOR.find((c) => c.locale === country)?.currency ||
					DEFAULT_CURRENCY,
			],
			["country", country || "unknown"],
			["city", city || "unknown"],
		].forEach(([key, value]) => {
			res.cookies.set(key, value);
		});
	}

	return res;
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/((?!api|trpc|_next|.*\\..*).*)",
	],
};
