"use client";
import EditSVG from "@/shared/components/SVGs/EditSVG";
import Image from "next/image";
import React from "react";
import { ValidateProfileImage } from "../../services/validateProfileImage";
import { updateProfileImage } from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { useUser } from "@/features/auth/hooks/useUser";
import { getOptimizedImageUrl } from "@/shared/services/getOptimisedImageUrl";
import { useProfileStore } from "../../store/profileStore";
import { Profile } from "../../types/supabase.types";

interface Props {
	profileImage: string | null;
	canEdit?: boolean;
	small?: boolean;
	xs?: boolean;
}

const ProfileImage = ({
	profileImage,
	canEdit = false,
	small,
	xs = false,
}: Props) => {
	const supabase = createClient();
	const [user] = useUser();
	const { profile, setProfile } = useProfileStore();

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const result = await ValidateProfileImage(file);

		if (result.success && user) {
			try {
				const imageLink = await updateProfileImage(file, user.id, supabase);
				const newProfile = {
					...profile,
					profileImage: `${imageLink}?t=${Date.now()}`,
				};
				setProfile(newProfile as Profile);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<label
			className="relative"
			htmlFor="profileImage"
		>
			<input
				type="file"
				name="profileImage"
				id="profileImage"
				accept="image/*"
				onChange={onChange}
				className="sr-only"
			></input>
			{canEdit && (
				<div className="absolute z-20 bottom-0 right-0 cursor-pointer bg-secondary p-1 rounded-full border-2">
					<EditSVG
						width="15"
						height="15"
					></EditSVG>
				</div>
			)}
			<div
				className={`relative overflow-clip ${
					xs ? "w-6 h-6" : small ? "w-10 h-10" : "w-20 h-20"
				} bg-background-100 dark:bg-background-dark-100 rounded-full border-2`}
			>
				<Image
					alt="Profile image"
					src={
						profileImage
							? getOptimizedImageUrl(profileImage)
							: "/illustrations/caddy.webp"
					}
					fill
					sizes="100px"
					className="object-cover object-center rounded-full"
				></Image>
			</div>
		</label>
	);
};

export default ProfileImage;
