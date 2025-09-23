"use client";

import { useState } from "react";
import {
	CHANGE_EMAIL_FORM_INPUTS,
	INITIAL_CHANGE_EMAIL_FORM_DATA,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";
import { validateUpdateEmailForm } from "../../services/validateEmailUpdateForm";
import { updateEmail } from "../../services/supabase";
import { UpdateEmailFormTypes } from "../../types/forms";

const UpdateEmailForm = () => {
	const [formData, setFormData] = useState<UpdateEmailFormTypes>(
		INITIAL_CHANGE_EMAIL_FORM_DATA,
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
		const validationResult = validateUpdateEmailForm(formData);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		try {
			await updateEmail(formData.email);
		} catch (err) {
			setsupabaseToast(
				"Something went wrong. Please try again: " + (err as Error).message,
			);
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
			setsupabaseToast("Email updated!");
			setFormData(INITIAL_CHANGE_EMAIL_FORM_DATA);
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{CHANGE_EMAIL_FORM_INPUTS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name as keyof UpdateEmailFormTypes]}
						error={!!errors[input.name]?.length}
					/>
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			{supabaseToast && (
				<div className="text-red-500 text-sm">{supabaseToast}</div>
			)}

			<div className={"flex justify-center"}>
				<Button
					loading={isLoading}
					loadingText="Changing email"
					type={"button"}
					onClick={onSubmit}
				>
					Change email
				</Button>
			</div>
		</form>
	);
};

export default UpdateEmailForm;
