"use client";

import { useState } from "react";
import {
	LOGIN_FORM_INITIAL_DATA,
	LOGIN_FORM_INPUTS,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";
import { validateLoginForm } from "../../services/validateLoginForm";
import { set } from "zod";

const LoginForm = () => {
	const [formData, setFormData] = useState<LoginFormTypes>(
		LOGIN_FORM_INITIAL_DATA,
	);
	const [errors, setErrors] = useState<FieldErrors>({});
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

	const onSubmit = () => {
		setIsLoading(true);
		const validationResult = validateLoginForm(formData);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{LOGIN_FORM_INPUTS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name as keyof LoginFormTypes]}
						error={!!errors[input.name]?.length}
					/>
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			<div className={"flex justify-center"}>
				<Button
					disabled={isLoading}
					type={"button"}
					onClick={onSubmit}
				>
					Log in
				</Button>
			</div>
		</form>
	);
};

export default LoginForm;
