"use client";
import EditSVG from "@/shared/components/SVGs/EditSVG";
import Image from "next/image";
import React from "react";
import { ValidateProfileImage } from "../../services/validateProfileImage";
import { createClient } from "@/shared/services/supabase/client";
import { useUser } from "@/features/auth/hooks/useUser";
import { getOptimizedImageUrl } from "@/shared/services/getOptimisedImageUrl";
import { useProfileStore } from "../../store/profileStore";
import { Profile } from "../../types/supabase.types";
import { useToastStore } from "@/shared/stores/toastStore";
import ClientToaster from "@/shared/components/ClientToaster";
import { uploadImageFile } from "@/shared/services/supabase/globals";
import { addImageToProfile } from "../../services/supabase";

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
	const { setMessage } = useToastStore();

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (canEdit === false) {
			return;
		}
		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const result = await ValidateProfileImage(file);

		if (result.success && user) {
			try {
				const imageLink = await uploadImageFile(
					user.id,
					file,
					supabase,
					"profile-images",
				);
				await addImageToProfile(imageLink, user.id, supabase);
				const newProfile = {
					...profile,
					profileImage: `${imageLink}`,
				};
				setProfile(newProfile as Profile);
				setMessage("Profile image updated!");
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
			<ClientToaster />
			<input
				disabled={!canEdit}
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
