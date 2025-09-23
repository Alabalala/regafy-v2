import GiftListClient from "@/features/gifts/components/GiftListClient/GiftListClient";
import { getGifts } from "@/features/gifts/services/supabase";
import ProfileBirthday from "@/features/profile/components/ProfileBirthday/ProfileBirthday";
import ProfileInfo from "@/features/profile/components/ProfileInfo/ProfileInfo";
import { getProfile } from "@/features/profile/services/supabase";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button/Button";
import { createClient } from "@/shared/services/supabase/server";
import { Gift } from "@/shared/types/supabase/supabase";

interface Props {
	params: Promise<{ [key: string]: string }>;
}

export default async function FriendProfile({ params }: Props) {
	const id = (await params).id;
	const supabase = await createClient();
	let profile: Profile | null = null;
	let gifts: Gift[] = [];
	try {
		profile = await getProfile(id, supabase);
		gifts = await getGifts(id, supabase);
	} catch (err) {
		console.log(err);
	}
	if (!id || !profile) return <p>Loading...</p>;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<ProfileInfo profile={profile} />
				<ProfileBirthday birthday={profile.birthday}></ProfileBirthday>
			</div>

			<div>
				<h2 className="text-xl font-bold">Gift list</h2>
				<GiftListClient
					friendId={id}
					gifts={gifts}
				></GiftListClient>
			</div>
			<hr />
			<div className="w-fit mx-auto my-auto">
				<Button variant="delete">Delete friend</Button>
			</div>
		</div>
	);
}
