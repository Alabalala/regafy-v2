import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/shared/services/supabase/updateSession";

export async function middleware(request: NextRequest) {
	const authResponse = await updateSession(request);
	if (authResponse?.status === 302) return authResponse;

	const pathname = request.nextUrl.pathname;
	if (pathname === "/") {
		const acceptLanguage = request.headers.get("accept-language");
		const userLang = acceptLanguage?.split(",")[0].split("-")[0]; // e.g. "es" from "es-ES"
		const supportedLocales = ["en", "es", "fr"];
		const locale = supportedLocales.includes(userLang ?? "") ? userLang : "en";

		const url = request.nextUrl.clone();
		url.pathname = `/${locale}`;
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
