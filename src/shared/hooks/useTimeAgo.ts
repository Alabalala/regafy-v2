"use client";
import { useLocale, useTranslations } from "next-intl";

export function useTimeAgo(date: string) {
	const t = useTranslations("timeAgo");
	const locale = useLocale();

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const created = new Date(date).getTime();
	const now = Date.now();
	const diff = now - created;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

	if (months > 4) return t("moreThan4Months");
	if (seconds < 60) return t("justNow");
	if (months >= 1) return rtf.format(-months, "month");
	if (days >= 1) return rtf.format(-days, "day");
	if (hours >= 1) return rtf.format(-hours, "hour");
	if (minutes >= 1) return rtf.format(-minutes, "minute");
	return rtf.format(-seconds, "second");
}
