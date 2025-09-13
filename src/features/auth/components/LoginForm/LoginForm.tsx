"use client";

import { useState } from "react";
import {
	LOGIN_FORM_INITIAL_DATA,
	LOGIN_FORM_INPUTS,
} from "../../constants/forms";
import { FieldErrors } from "@/shared/types/forms";
import Input from "@/shared/components/Input/Input";
import { Button } from "@/shared/components/Button/Button";

const GiftForm = () => {
	const [formData, setFormData] = useState<LoginFormTypes>(
		LOGIN_FORM_INITIAL_DATA,
	);
	const [errors, setErrors] = useState<FieldErrors>({});

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

	const onSubmit = () => {};

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

			<p className={"font-bold"}>Rate how much you want this gift</p>

			<div className={"flex justify-center"}>
				<Button
					type={"button"}
					onClick={onSubmit}
				>
					Save gift
				</Button>
			</div>
		</form>
	);
};

export default GiftForm;
