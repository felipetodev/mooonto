import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
	CURRENCY_COOKIE_KEY,
	CURRENCY_SELECTOR,
	DEFAULT_CURRENCY,
} from "./lib/constants";

export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();

	const country = req.headers.get("x-vercel-ip-country");
	const city = req.headers.get("x-vercel-ip-city");
	// const browserLang = req.headers.get("accept-language")?.split(",")[0];

	const hasCustomCurrency = req.cookies.get(CURRENCY_COOKIE_KEY);

	const res = NextResponse.rewrite(url);

	if (!hasCustomCurrency) {
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
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
