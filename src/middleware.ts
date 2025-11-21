import { updateSession } from "@/shared/services/supabase/updateSession";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
	const intlResponse = intlMiddleware(request) as NextResponse;
	const authResponse = await updateSession(request);
	if (authResponse.status === 307 || authResponse.status === 302) {
		return authResponse;
	}

	const localeCookie = request.cookies.get("NEXT_LOCALE");
	if (!localeCookie) {
		const acceptLang = request.headers.get("accept-language");
		const supportedLocales = ["en", "es"];
		const preferredLocale = acceptLang
			? acceptLang
					.split(",")
					.map((l) => l.split(";")[0])[0]
					.split("-")[0]
			: "en";

		const locale = supportedLocales.includes(preferredLocale)
			? preferredLocale
			: "en";
		intlResponse.cookies.set("NEXT_LOCALE", locale);
	}

	authResponse.cookies.getAll().forEach((cookie) => {
		intlResponse.cookies.set(cookie.name, cookie.value);
	});

	return intlResponse;
}

export const config = {
	matcher: [
		"/",
		"/((?!_next/static|_next/image|favicon.ico|\\.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
