import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
	locales: ["en", "es"],
	defaultLocale: "en",
	localePrefix: "always",
	localeCookie: {
		name: "NEXT_LOCALE",
		maxAge: 60 * 60 * 24 * 3650,
	},
});

export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);
