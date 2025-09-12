import { InputType } from "../../../.next/types/forms";

interface Props {
	value: string;
	input: InputType;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => void;
	required?: boolean;
	preview?: string;
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
				rows={5}
				className={"border-2 rounded-md p-2 "}
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

	return (
		<input
			className={"border-2 rounded-md p-2"}
			type={input.type}
			{...commonProps}
			accept={input.accept ?? ""}
		/>
	);
}
