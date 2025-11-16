import { NextLink } from "@/shared/components/Link";
import { getTranslations } from "next-intl/server";

export default async function HelpPage() {
	const t = await getTranslations("help");
	const tButton = await getTranslations("buttons");

	return (
		<div className="flex flex-col gap-5 items-center">
			<h1 className="text-xl font-bold">{t("title")}</h1>
			<p>{t("description")}</p>
			<NextLink href={"mailto:regafy.info@gmail.com"}>
				{tButton("sendEmail")}
			</NextLink>
		</div>
	);
}
