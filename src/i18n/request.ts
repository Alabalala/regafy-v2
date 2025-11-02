import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;
	if (
		!locale ||
		!routing.locales.includes(locale as (typeof routing.locales)[number])
	) {
		locale = routing.defaultLocale;
	}

	const messages = {
		// Import from your feature folders
		burgerMenu: (await import(`@/shared/messages/${locale}/burgerMenu.json`))
			.default,
		buttons: (await import(`@/shared/messages/${locale}/buttons.json`)).default, // etc. - add all your feature translation files
	};

	return {
		locale,
		messages,
	};
});
