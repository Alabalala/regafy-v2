"use client";
import {
	GIFT_FORM_FIELDS,
	GIFT_FORM_INITIAL_VALUES,
	FILE_INPUT_INITIAL_VALUES,
} from "@/constants/forms";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import FileInput from "../FileInput/FileInput";
import {
	FieldErrors,
	FileInputDataType,
	FormDataWithFileType,
	GiftFormData,
} from "../../../.next/types/forms";
import { Button } from "../Button/Button";
import { validateGiftForm } from "@/utils/formValidation/validateGiftForm";
import { giftFormScheme } from "@/utils/formValidation/giftFormScheme";

const GiftForm = () => {
	const [formData, setFormData] = useState<GiftFormData>(
		GIFT_FORM_INITIAL_VALUES,
	);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const [errors, setErrors] = useState<FieldErrors>({});

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;
		console.log("name ", name);
		const normalisedValue = value.replace(/^ +/, "");
		let fieldValue: string | File | null = normalisedValue;

		if (type === "file" && files) {
			const file = files[0];
			fieldValue = file;

			setFile((prev) => ({
				...prev,
				file,
				preview: file ? URL.createObjectURL(file) : null,
			}));
		}

		setFormData({
			...formData,
			[name]: fieldValue,
		});

		const result = giftFormScheme
			.pick({ [name]: true })
			.safeParse({ [name]: fieldValue });

		setErrors((prev) => ({
			...prev,
			[name]: result.success
				? []
				: result.error.issues.map((issue) => issue.message),
		}));
	};

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const onSubmit = () => {
		const formDataWithFile: FormDataWithFileType = {
			...formData,
			image: file.file,
		};

		const validationResult = validateGiftForm(formDataWithFile);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			return;
		}

		setErrors({});
		try {
			console.log("Form submitted:", formDataWithFile);
		} catch (err) {
			console.error("Unexpected error:", err);
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{GIFT_FORM_FIELDS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					{input.type === "file" ? (
						<FileInput
							setFile={setFile}
							onChange={onChange}
							input={input}
							preview={file.preview ?? ""}
							error={!!errors[input.name]?.length}
						></FileInput>
					) : (
						<Input
							onChange={onChange}
							input={input}
							value={formData[input.name as keyof GiftFormData]}
							error={!!errors[input.name]?.length}
						/>
					)}
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}
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
