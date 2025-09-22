"use client";
import { Profile } from "@/features/profile/components/Profile/Profile";
import useProfile from "@/features/profile/store/hooks/useProfile";

const ProfilePage = () => {
	const [profile] = useProfile();
	if (!profile) return <p>Loading...</p>;

	return (
		<div>
			<h1 className="text-xl font-bold">Profile</h1>
			<Profile profile={profile}></Profile>
		</div>
	);
};

export default ProfilePage;
