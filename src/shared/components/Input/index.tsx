import { InputType } from "@/shared/types/forms";

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
	error: boolean;
}

export default function Input({
	value,
	input,
	onChange,
	error = false,
}: Props) {
	const commonProps = {
		name: input.name,
		value,
		onChange,
		placeholder: input.placeholder,
		required: input.required ?? false,
		disabled: input.disabled ?? false,
	};

	const commonStyle = `border-2 rounded-md p-2 focus:outline-accent ${error && "border-red-600 focus:border-red-800"} ${input.fullWidth && "w-full"}`;

	if (input.type === "textarea") {
		return (
			<textarea
				rows={5}
				className={commonStyle}
				{...commonProps}
			/>
		);
	}

	if (input.type === "select") {
		return (
			<select
				{...commonProps}
				className={commonStyle}
			>
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
			className={commonStyle}
			type={input.type}
			{...commonProps}
			accept={input.accept ?? ""}
		/>
	);
}
