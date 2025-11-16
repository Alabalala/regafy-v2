"use client";
import ProfileForm from "@/features/profile/components/ProfileForm";
import useProfile from "@/features/profile/store/hooks/useProfile";
import { useSearchParams } from "next/navigation";

const CreateProfilePage = () => {
	const [profile] = useProfile();
	const searchParams = useSearchParams();
	const type = searchParams.get("type");

	return (
		<div>
			<ProfileForm
				{...(profile && { profile })}
				type={type === "create" ? "create" : "update"}
			></ProfileForm>
		</div>
	);
};

export default CreateProfilePage;
