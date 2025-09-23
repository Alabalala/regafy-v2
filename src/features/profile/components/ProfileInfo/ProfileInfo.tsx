import { Profile } from "../../types/supabase.types";
import ProfileImage from "../ProfileImage/ProfileImage";

interface Props {
	profile: Profile;
	canEdit?: boolean;
	sided?: boolean;
}

const ProfileInfo = ({ profile, canEdit, sided }: Props) => {
	return (
		<div
			className={`flex ${sided ? "flex-row gap-1" : "flex-col"} justify-center items-center`}
		>
			<ProfileImage
				small={sided}
				canEdit={canEdit}
				profileImage={profile.profileImage}
			></ProfileImage>
			<div className={`${sided ? "flex flex-col" : ""}`}>
				<div className={`font-bold ${sided && "text-sm"}`}>{profile.name}</div>
				<div className={`font-light ${sided && "text-sm"}`}>
					@{profile.userName}
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
