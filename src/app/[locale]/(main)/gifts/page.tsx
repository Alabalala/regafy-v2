import { getCurrentUser } from "@/features/auth/services/supabase";
import GiftListClient from "@/features/gifts/components/UserGiftList";

import { getGifts } from "@/features/gifts/services/supabase";
import { createClient } from "@/shared/services/supabase/server";
import { getTranslations } from "next-intl/server";

export default async function Gifts({}) {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const gifts = await getGifts(user.id, supabase);
	const t = await getTranslations("gifts");

	return (
		<main>
			<div>
				<h1 className={"text-xl font-bold"}>{t("myGifts")}</h1>
			</div>

			<GiftListClient gifts={gifts}></GiftListClient>
		</main>
	);
}
