"use client";

import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useToastStore } from "@/shared/stores/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePasswordAction } from "../../actions/updatePassword";
import {
	INITIAL_UPDATE_PASSWORD_FORM_DATA,
	UPDATE_PASSWORD_FORM_INPUTS,
} from "../../constants/forms";
import { updatePasswordFormSchema } from "../../schemas/updatePassword";
import { UpdatePasswordFormTypes } from "../../types/forms";

const UpdatePasswordForm = () => {
	const [supabaseToast, setsupabaseToast] = useState<string | undefined>("");
	const { setMessage } = useToastStore();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<UpdatePasswordFormTypes>({
		resolver: zodResolver(updatePasswordFormSchema),
		defaultValues: INITIAL_UPDATE_PASSWORD_FORM_DATA,
	});

	const onSubmit = async (data: UpdatePasswordFormTypes) => {
		const result = await updatePasswordAction(data);
		if (!result.success) {
			if (result.errors?.root) {
				setsupabaseToast(result.errors?.root);
			}
			return;
		} else if (result.success) {
			setMessage("Password changed successfully");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={"flex flex-col gap-4"}
		>
			{UPDATE_PASSWORD_FORM_INPUTS.map((input) => {
				const fieldName = input.name as keyof UpdatePasswordFormTypes;
				return (
					<div
						key={input.name}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{input.label}</p>
						<Input
							{...register(fieldName)}
							input={input}
							currentValue={watch(fieldName) || ""}
							error={!!errors[fieldName]}
						/>
						<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
					</div>
				);
			})}

			{supabaseToast && (
				<div className="text-red-500 text-sm">{supabaseToast}</div>
			)}

			<div className={"flex justify-center"}>
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={"Saving..."}
				>
					Update email
				</Button>
			</div>
		</form>
	);
};

export default UpdatePasswordForm;
