"use client";
import {
	GIFT_FORM_FIELDS,
	GIFT_FORM_INITIAL_VALUES,
	FILE_INPUT_INITIAL_VALUES,
} from "@/constants/forms";
import Input from "../Input/Input";
import { useEffect, useState } from "react";
import FileInput from "../FileInput/FileInput";
import { FileInputDataType, GiftFormData } from "../../../.next/types/forms";

const GiftForm = () => {
	const [formData, setFormData] = useState<GiftFormData>(
		GIFT_FORM_INITIAL_VALUES,
	);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;

		if (type === "file" && files) {
			const file = files[0];
			setFormData({
				...formData,
				[name]: file,
			});
			setFile((prev) => ({
				...prev,
				file,
				preview: file ? URL.createObjectURL(file) : null,
			}));
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
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
						></FileInput>
					) : (
						<Input
							onChange={onChange}
							input={input}
							value={formData[input.name as keyof GiftFormData]}
						/>
					)}
				</div>
			))}
		</form>
	);
};

export default GiftForm;
