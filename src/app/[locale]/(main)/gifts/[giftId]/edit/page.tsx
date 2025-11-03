import { getCurrentUser } from "@/features/auth/services/supabase";
import GiftForm from "@/features/gifts/components/GiftForm";
import { getSingleGift } from "@/features/home/services/supabase";
import H1WithExit from "@/shared/components/H1WithExit";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const EditGift = async ({ params }: { params: { giftId: string } }) => {
	const id = (await params).giftId;
	const supabase = await createClient();
	const gift = await getSingleGift(id, supabase);
	if (!id || !gift) return <LoadingComponent />;
	const user = await getCurrentUser(supabase);
	const t = await getTranslations("gifts.form");
	if (gift.added_by !== user.id) {
		redirect(getPath("Gifts"));
	}

	return (
		<div className={"flex flex-col gap-5"}>
			<H1WithExit href={getPath("Gifts")}>{t("editGift")}</H1WithExit>
			<GiftForm
				type={"update"}
				gift={gift}
			></GiftForm>
		</div>
	);
};

export default EditGift;
