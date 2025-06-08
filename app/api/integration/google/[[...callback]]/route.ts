import { type Credentials, OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const oAuth2Client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export async function GET(request: Request) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	// const scope = url.searchParams.get("scope");

	if (!code) {
		return redirect("/404");
	}

	const { tokens } = (await oAuth2Client.getToken(code)) as {
		tokens: Credentials & { refresh_token_expires_in?: number };
	};

	if (
		!tokens.access_token ||
		!tokens.expiry_date ||
		!tokens.refresh_token ||
		!tokens.refresh_token_expires_in
	) {
		return new Response("No access token received", { status: 400 });
	}

	const cookieStore = await cookies();
	cookieStore.set("g_access_token", tokens.access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: new Date(tokens.expiry_date),
		path: "/",
	});

	cookieStore.set("g_refresh_token", tokens.refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: new Date(Date.now() + tokens.refresh_token_expires_in * 1000),
	});

	redirect("/");
}
