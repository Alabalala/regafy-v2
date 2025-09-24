import { getCurrentUser } from "@/features/auth/services/supabase";
import GiftListClient from "@/features/gifts/components/UserGiftList";

import { getGifts } from "@/features/gifts/services/supabase";
import { createClient } from "@/shared/services/supabase/server";

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
