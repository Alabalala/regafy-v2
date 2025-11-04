import GiftForm from "@/features/gifts/components/GiftForm";
import H1WithExit from "@/shared/components/H1WithExit";
import { getPath } from "@/shared/services/getPath";
import { getTranslations } from "next-intl/server";
//todo fix new gift for friend
const NewGift = async () => {
	const t = await getTranslations("gifts.form");
	return (
		<div className={"flex flex-col gap-5"}>
			<H1WithExit href={getPath("Gifts")}>{t("newGift")}</H1WithExit>
			<GiftForm type={"create"}></GiftForm>
		</div>
	);
};

export default NewGift;
