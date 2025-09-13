"use client";
import {
	GIFT_FORM_FIELDS,
	GIFT_FORM_INITIAL_VALUES,
	FILE_INPUT_INITIAL_VALUES,
} from "@/features/gifts/constants/form";
import Input from "../../../../shared/components/Input/Input";
import { useEffect, useState } from "react";
import FileInput from "../../../../shared/components/FileInput/FileInput";
import { Button } from "../../../../shared/components/Button/Button";
import { validateGiftForm } from "@/features/gifts/services/validateGiftForm";
import { giftFormScheme } from "@/features/gifts/services/giftFormScheme";
import {
	FieldErrors,
	FormDataWithFileType,
	GiftFormData,
} from "../../types/form";
import { FileInputDataType } from "@/shared/types/forms";
import StarRateInput from "../StarRateInput/StarRateInput";
import { createGift } from "../../services/supabase";
import { createClient } from "@/shared/utils/supabase/server";

const GiftForm = () => {
	const [formData, setFormData] = useState<GiftFormData>(
		GIFT_FORM_INITIAL_VALUES,
	);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [rating, setRating] = useState<string>("1");

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

	const onSubmit = async () => {
		const formDataWithFile: FormDataWithFileType = {
			...formData,
			image: file.file,
			rating: rating,
		};

		const validationResult = validateGiftForm(formDataWithFile);

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			return;
		}

		setErrors({});

		const test_user_id = "742c65a7-0bc5-4e81-a17a-ee20efe03f21";
		const test_profile_id = "742c65a7-0bc5-4e81-a17a-ee20efe03f21";

		const giftData = {
			...formDataWithFile,
			user_id: test_user_id,
			profile_id: test_profile_id,
		};
		// const supabase = await createClient();

		//TODO
		try {
			// const success = await createGift(giftData, supabase);
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

			<p className={"font-bold"}>Rate how much you want this gift</p>
			<StarRateInput
				rating={rating}
				setRating={setRating}
			/>
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
