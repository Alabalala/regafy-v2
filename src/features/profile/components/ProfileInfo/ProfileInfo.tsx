import { Profile } from "../../types/supabase.types";
import ProfileImage from "../ProfileImage/ProfileImage";

const ProfileInfo = ({ profile }: { profile: Profile }) => {
	console.log(profile);
	return (
		<div className="flex flex-col justify-center items-center">
			<ProfileImage
				canEdit
				profileImage={profile.profileImage}
			></ProfileImage>
			<div className="font-bold">{profile.name}</div>
			<div className="font-light">@{profile.userName}</div>
		</div>
	);
};

export default ProfileInfo;
