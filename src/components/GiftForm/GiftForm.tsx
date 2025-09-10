"use client";
import { GIFT_FORM_FIELDS, GIFT_FORM_INITIAL_VALUES } from "@/constants/forms";
import Input from "../Input/Input";
import { useState } from "react";

const GiftForm = () => {
	const [formData, setFormData] = useState<Record<string, string>>({
		...GIFT_FORM_INITIAL_VALUES,
	});

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{GIFT_FORM_FIELDS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					<Input
						onChange={onChange}
						input={input}
						value={formData[input.name]}
					/>
				</div>
			))}
		</form>
	);
};

export default GiftForm;
