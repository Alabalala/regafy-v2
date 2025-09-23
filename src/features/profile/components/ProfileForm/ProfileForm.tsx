"use client";
import Input from "../../../../shared/components/Input/Input";
import { useState } from "react";
import { Button } from "../../../../shared/components/Button/Button";
import { FieldErrors } from "@/shared/types/forms";
import { useUser } from "@/features/auth/hooks/useUser";
import { useRouter } from "next/navigation";

import { createClient } from "@/shared/services/supabase/client";
import { getPath } from "@/shared/services/getPath";
import {
	INITIAL_PROFILE_FORM_DATA,
	PROFILE_FORM_INPUTS,
} from "../../constants/form";
import { ProfileFormSchema } from "../../schemas/profileFormSchema";
import { Profile } from "../../types/supabase.types";
import { ValidateProfileFormData } from "../../services/validateProfileFormData";
import { ProfileFormData } from "../../types/form.types";
import { createProfile, updateProfile } from "../../services/supabase";
import { useProfileStore } from "../../store/profileStore";

interface Props {
	profile: Profile | null;
	setIsFormOpen: (value: boolean) => void;
}

const ProfileForm = ({ profile, setIsFormOpen }: Props) => {
	const [formData, setFormData] = useState<ProfileFormData>(() => {
		return profile
			? {
					name: profile.name,
					userName: profile.userName,
					birthday: profile.birthday,
				}
			: INITIAL_PROFILE_FORM_DATA;
	});
	const [errors, setErrors] = useState<FieldErrors>({});
	const [formError, setFormError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const { setProfile } = useProfileStore();
	const supabase = createClient();
	const router = useRouter();

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target as HTMLInputElement;
		const normalisedValue = value.replace(/^ +/, "");

		setFormData({
			...formData,
			[name]: normalisedValue,
		});

		const result = ProfileFormSchema.pick({ [name]: true }).safeParse({
			[name]: normalisedValue,
		});

		setErrors((prev) => ({
			...prev,
			[name]: result.success
				? []
				: result.error.issues.map((issue) => issue.message),
		}));
	};

	const onSubmit = async () => {
		setIsLoading(true);

		const validationResult = ValidateProfileFormData(formData);
		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		try {
			if (profile) {
				await updateProfile(formData, profile.id, supabase);
			} else {
				await createProfile(formData, supabase);
			}
		} catch (err) {
			setFormError(
				"Something went wrong. Please try again: " + (err as Error).message,
			);
		} finally {
			setIsLoading(false);
			if (!profile) {
				router.push(getPath("Home"));
			} else if (profile) {
				setProfile({
					...profile,
					...formData,
				});
				setIsFormOpen(false);
			}
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			<p className={"font-bold"}>Change your profile details</p>
			{PROFILE_FORM_INPUTS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name as keyof ProfileFormData]}
						error={!!errors[input.name]?.length}
					/>
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			<div className={"flex justify-center"}>
				<Button
					onClick={onSubmit}
					disabled={isLoading}
					loading={isLoading}
					loadingText={"Saving..."}
				>
					Save changes
				</Button>
			</div>
			<div className={"flex justify-center"}>
				<Button
					isPlain
					variant="secondary"
					onClick={() => setIsFormOpen(false)}
					disabled={isLoading}
					loadingText={"Saving..."}
				>
					Cancel
				</Button>
			</div>
			{formError && <div className="text-red-500 text-sm">{formError}</div>}
		</form>
	);
};

export default ProfileForm;
