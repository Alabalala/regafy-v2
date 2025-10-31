import GiftForm from "@/features/gifts/components/GiftForm";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import { getProfile } from "@/features/profile/services/supabase";
import { Profile } from "@/features/profile/types/supabase.types";
import H1WithExit from "@/shared/components/H1WithExit";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";

interface Props {
	params: Promise<{ [key: string]: string }>;
}

export default async function FriendProfile({ params }: Props) {
	const id = (await params).id;
	const supabase = await createClient();
	let profile: Profile | null = null;

	try {
		profile = await getProfile(id, supabase);
	} catch (err) {
		console.log(err);
	}
	if (!id || !profile) return <LoadingComponent />;

	return (
		<div className="flex flex-col gap-4">
			<H1WithExit href={getPath("Friend profile", id)}>
				New gift for {profile.name}
			</H1WithExit>
			<div className="w-fit">
				<ProfileInfo
					sided
					profile={profile}
				/>
			</div>
			<GiftForm></GiftForm>
		</div>
	);
}
