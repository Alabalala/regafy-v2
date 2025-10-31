"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import { FILE_INPUT_INITIAL_VALUES } from "@/features/gifts/constants/form";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { uploadImageFile } from "@/shared/services/supabase/globals";
import { validateImage } from "@/shared/services/validateImage";
import { useToastStore } from "@/shared/stores/toastStore";
import { FileInputDataType } from "@/shared/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../shared/components/Button";
import FileInput from "../../../../shared/components/FileInput";
import Input from "../../../../shared/components/Input";
import createProfileAction from "../../actions/createProfile";
import {
	INITIAL_PROFILE_FORM_DATA,
	PROFILE_FORM_INPUTS,
} from "../../constants/form";
import { ProfileFormSchema } from "../../schemas/profileFormSchema";
import { addImageToProfile } from "../../services/supabase";
import { ProfileFormData } from "../../types/form.types";
import { Profile } from "../../types/supabase.types";
import updateProfileAction from "../../actions/updateProfile";
import { useProfileStore } from "../../store/profileStore";
import CloseSVG from "@/shared/components/SVGs/CloseSVG";

interface Props {
	profile?: Profile;
	type: "create" | "update";
	setIsProfileFormOpen: (isOpen: boolean) => void;
}

const ProfileForm = ({ profile, type, setIsProfileFormOpen }: Props) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: profile ? profile : INITIAL_PROFILE_FORM_DATA,
	});
	const [user] = useUser();
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const supabase = createClient();
	const router = useRouter();
	const { setMessage } = useToastStore();
	const [fileError, setFileError] = useState<string>("");
	const { setProfile } = useProfileStore();
	useEffect(() => {
		if (profile && profile.profileImage) {
			setFile((prev) => ({
				...prev,
				preview: profile.profileImage,
			}));
		}
	}, [profile]);

	if (!user) {
		return <LoadingComponent />;
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const file = files?.[0] ?? null;
		const result = validateImage(file!);

		setFileError("");

		if (!file) {
			setFile({ file: null, preview: null });
			return;
		}
		if (!result.success) {
			setFileError(result.errors.file?.[0] ?? "");
			return;
		}

		setFile({
			file,
			preview: file ? URL.createObjectURL(file) : null,
		});
	};

	const onSubmit = async (data: ProfileFormData) => {
		if (type === "create") {
			const createResult = await createProfileAction(data, user.id);
			try {
				if (createResult.success) {
					const image = await uploadImageFile(
						user.id,
						file.file!,
						supabase,
						"profile-images",
					);
					if (image) {
						await addImageToProfile(image, user.id, supabase);
					} else {
						setError("root", {
							type: "server",
							message: "Failed to upload image",
						});
					}
					router.push(getPath("Home"));
				} else {
					setError("root", {
						type: "server",
						message: createResult.errors?.root?.[0] ?? "",
					});
				}
			} catch (err) {
				setError("root", { type: "server", message: "Failed to create profile" });
			}
		}

		if (type === "update" && profile) {
			const updateResult = await updateProfileAction(data, user.id);
			if (!updateResult.success) {
				setError("root", {
					type: "server",
					message: updateResult.errors?.root?.[0] ?? "",
				});
				return;
			}

			let updatedProfile = {
				...updateResult.data,
				profileImage: profile.profileImage,
			};

			if (file.file) {
				const img = await uploadImageFile(
					user.id,
					file.file!,
					supabase,
					"gift-images",
				);
				await addImageToProfile(img, user.id, supabase);
				updatedProfile = {
					...updatedProfile,
					profileImage: img,
				};
			}
			setProfile(updatedProfile);
			setMessage("Profile updated!");
			setIsProfileFormOpen(false);
		}
	};

	return (
		<form
			className={"flex flex-col gap-4"}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-row justify-between">
				<h3 className={" font-bold uppercase"}>
					{type === "create" ? "Create profile" : "Update profile"}
				</h3>
				<Button
					isPlain
					onClick={() => setIsProfileFormOpen(false)}
				>
					<CloseSVG></CloseSVG>
				</Button>
			</div>
			{PROFILE_FORM_INPUTS.map((input) => {
				const fieldName = input.name as keyof ProfileFormData;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{input.label}</p>

						{input.type === "file" ? (
							<div className="flex flex-col gap-2">
								<FileInput
									onChange={handleFileChange}
									setFile={setFile}
									input={input}
									preview={file.preview ?? ""}
									error={!!fileError}
								/>
								{fileError && <div className="text-red-500 text-sm">{fileError}</div>}
							</div>
						) : (
							<Input
								{...register(fieldName)}
								input={input}
								currentValue={watch(fieldName) || ""}
								error={!!errors[fieldName]}
							/>
						)}
						<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
					</div>
				);
			})}

			{errors.root && (
				<div className="text-red-500 text-sm">{errors.root.message}</div>
			)}
			<div className={"flex justify-center"}>
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={"Saving..."}
				>
					Save profile
				</Button>
			</div>
		</form>
	);
};

export default ProfileForm;
