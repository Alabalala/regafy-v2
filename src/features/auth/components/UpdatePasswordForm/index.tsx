"use client";

import { useState } from "react";
import {
	INITIAL_UPDATE_PASSWORD_FORM_DATA,
	UPDATE_PASSWORD_FORM_INPUTS,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";
import { updatePassword } from "../../services/supabase";
import { UpdatePasswordFormTypes } from "../../types/forms";
import { validateUpdatePasswordForm } from "../../services/validatePasswordUpdateForm";

const UpdatePasswordForm = () => {
	const [formData, setFormData] = useState<UpdatePasswordFormTypes>(
		INITIAL_UPDATE_PASSWORD_FORM_DATA,
	);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [supabaseToast, setsupabaseToast] = useState<string | undefined>("");
	const [isLoading, setIsLoading] = useState(false);

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
	};

	const onSubmit = async () => {
		setIsLoading(true);
		const validationResult = validateUpdatePasswordForm(formData);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		try {
			await updatePassword(formData.password);
		} catch (err) {
			setsupabaseToast(
				"Something went wrong. Please try again: " + (err as Error).message,
			);
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
			setsupabaseToast("Password updated!");
			setFormData(INITIAL_UPDATE_PASSWORD_FORM_DATA);
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{UPDATE_PASSWORD_FORM_INPUTS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name as keyof UpdatePasswordFormTypes]}
						error={!!errors[input.name]?.length}
					/>
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			{supabaseToast && (
				<div className="text-red-500 text-sm">{supabaseToast}</div>
			)}
			<p className={"text-sm"}>
				Password must be 6–30 characters and include at least one uppercase letter,
				one lowercase letter, one number, and one special character (!@#$%^&*).
			</p>

			<div className={"flex justify-center"}>
				<Button
					loading={isLoading}
					loadingText="Changing password"
					type={"button"}
					onClick={onSubmit}
				>
					Change password
				</Button>
			</div>
		</form>
	);
};

export default UpdatePasswordForm;
