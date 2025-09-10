import { getCurrentUser } from "@/utils/supabase/auth";
import { getGifts } from "@/utils/supabase/gifts";
import { createClient } from "@/utils/supabase/server";

export default async function Gifts({}) {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const gifts = await getGifts(user.id, supabase);

	console.log(user);

	return (
		<main>
			<div>
				<h1 className={"text-xl font-bold"}>My gifts</h1>
			</div>

			<div className={"flex"}></div>
		</main>
	);
}
