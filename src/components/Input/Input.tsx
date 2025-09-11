import { InputType } from "../../../.next/types/forms";
import AddDocumentSVG from "../SVGs/AddDocumentSVG";

interface Props {
	value: string | number;
	input: InputType;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
	required?: boolean;
}

export default function Input({ value, input, onChange }: Props) {
	const commonProps = {
		name: input.name,
		value,
		onChange,
		placeholder: input.placeholder,
		required: input.required ?? false,
		disabled: input.disabled ?? false,
	};

	if (input.type === "textarea") {
		return (
			<textarea
				className={"border-2 rounded-md p-2"}
				{...commonProps}
			/>
		);
	}

	if (input.type === "select") {
		return (
			<select {...commonProps}>
				{input.options?.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
					>
						{opt.label}
					</option>
				))}
			</select>
		);
	}

	if (input.type === "file") {
		return (
			<label
				htmlFor={"fileInput"}
				className={"flex flex-col gap-2 border-2 border-dashed p-10"}
			>
				<input
					id={"fileInput"}
					className={"hidden"}
					type={input.type}
					{...commonProps}
					accept={input.accept ?? ""}
				/>
				<div className={"mx-auto flex flex-col gap-2 justify-center items-center"}>
					<AddDocumentSVG
						height={"40px"}
						width={"40px"}
					/>
					<p>Add picture</p>
				</div>
			</label>
		);
	}

	return (
		<input
			className={"border-2 rounded-md p-2"}
			type={input.type}
			{...commonProps}
			accept={input.accept ?? ""}
		/>
	);
}
