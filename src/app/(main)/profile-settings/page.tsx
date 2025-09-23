import { ProfileSettings } from "@/features/profile/components/ProfileSettings/ProfileSettings";

const ProfileSettingsPage = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-xl font-bold uppercase">Profile settings</h1>
			<ProfileSettings></ProfileSettings>
		</div>
	);
};

export default ProfileSettingsPage;
