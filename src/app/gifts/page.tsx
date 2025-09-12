import GiftListClient from "@/features/gifts/components/GiftListClient/GiftListClient";
import { getCurrentUser } from "@/shared/utils/supabase/auth";
import { getGifts } from "@/features/gifts/services/supabase";
import { createClient } from "@/shared/utils/supabase/server";

export default async function Gifts({}) {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const gifts = await getGifts(user.id, supabase);

	return (
		<main>
			<div>
				<h1 className={"text-xl font-bold"}>My gifts</h1>
			</div>

			<GiftListClient gifts={gifts}></GiftListClient>
		</main>
	);
}
