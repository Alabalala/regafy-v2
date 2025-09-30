export function getPrettyDate(
	date: Date,
	locale: string = "en-UK",
	fullTime: boolean = false,
): string {
	return date.toLocaleDateString(locale, {
		day: "numeric",
		month: fullTime ? "short" : "long",
		year: fullTime ? "2-digit" : undefined,
		hour: fullTime ? "numeric" : undefined,
		minute: fullTime ? "numeric" : undefined,
	});
}
