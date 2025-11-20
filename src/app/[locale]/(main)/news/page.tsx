import { getNews } from "@/features/news/services/supabase";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function NewsPage() {
	const supabase = await createClient();
	const news = await getNews(supabase);
	const t = await getTranslations("news");
	const locale = await getLocale();
	const localisedNews = news.map((news) => ({
		...news,
		title: locale === "en" ? news.title_en : news.title_es,
		body: locale === "en" ? news.body_en : news.body_es,
		CTA: locale === "en" ? news.CTA_en : news.CTA_es,
	}));

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-xl font-bold">{t("news")}</h1>

			<div className="flex flex-col gap-5">
				{localisedNews.map((news) => (
					<div
						className="max-w-[600px] mx-auto border-2 border-black dark:border-white rounded-md bg-background-50 dark:bg-background-dark-50 overflow-hidden"
						key={news.id}
					>
						<div className="w-full h-[100px] relative">
							<Image
								src={news.image}
								alt={news.title}
								fill
								className="object-cover"
							/>
						</div>
						<div className="flex flex-col items-center gap-5 p-4">
							<h2 className="text-lg font-bold">{news.title}</h2>
							<p>{news.body}</p>
							<NextLink href={getPath(news.CTA_link)}>{getPath(news.CTA)}</NextLink>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
