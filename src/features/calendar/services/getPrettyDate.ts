export function getPrettyDate(date: Date, locale: string = "en-UK"): string {
	return date.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
	});
}
