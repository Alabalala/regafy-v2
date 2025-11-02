"use client";
import { useLocale, useTranslations } from "next-intl";

export function useTimeAgo(date: string) {
	const t = useTranslations("timeAgo");
	const locale = useLocale();

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const created = new Date(date).getTime();
	const now = Date.now();
	const diff = created - now;

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (Math.abs(months) > 4) return t("moreThan4Months");
	if (Math.abs(seconds) < 60) return t("justNow");
	if (Math.abs(months) >= 1) return rtf.format(months, "month");
	if (Math.abs(days) >= 1) return rtf.format(days, "day");
	if (Math.abs(hours) >= 1) return rtf.format(hours, "hour");
	if (Math.abs(minutes) >= 1) return rtf.format(minutes, "minute");
	return rtf.format(seconds, "second");
}
