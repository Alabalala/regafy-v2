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
