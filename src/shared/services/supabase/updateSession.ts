import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// IMPORTANT: Avoid writing any logic between createServerClient and
	// supabase.auth.getClaims(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: Don't remove getClaims()
	const { data, error } = await supabase.auth.getClaims();
	const user = data?.claims;

	const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
	const locale = pathSegments[0];
	const pathWithoutLocale = "/" + pathSegments.slice(1).join("/");

	const isAuthPage =
		pathWithoutLocale === "/login" || pathWithoutLocale === "/sign-up";
	if (!user && !isAuthPage) {
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}/login`;
		return NextResponse.redirect(url);
	}

	if (user && isAuthPage) {
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}`;
		return NextResponse.redirect(url);
	}
	return supabaseResponse;
}
