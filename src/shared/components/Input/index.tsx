import { InputType } from "@/shared/types/forms";
import { InputHTMLAttributes } from "react";

interface Props
	extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	input: InputType;
	error: boolean;
	preview?: string;
	currentValue: string;
}

export default function Input({
	input,
	error = false,
	currentValue,
	...rhfProps
}: Props) {
	const commonStyle = `border-2 rounded-md p-2 focus:outline-accent ${error && "border-red-600 focus:border-red-800"} ${input.fullWidth && "w-full"}`;
	const commonProps = {
		placeholder: input.placeholder,
		disabled: input.disabled ?? false,
	};
	if (input.type === "textarea") {
		return (
			<div className="relative w-full">
				<textarea
					rows={5}
					className={`${input.maxLength && "pb-10"} ${commonStyle}`}
					{...commonProps}
					{...rhfProps}
				/>
				{input.maxLength && (
					<div
						className={`text-xs absolute bottom-2 right-2 -translate-y-1/2 ${(currentValue?.length || 0) > input.maxLength && "text-red-600"}`}
					>
						{currentValue?.length || 0}/{input.maxLength}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="relative w-full">
			<input
				className={`${(input.type === "text" || input.type === "password") && "pr-12"} ${commonStyle}`}
				type={input.type}
				accept={input.accept ?? ""}
				{...commonProps}
				{...rhfProps}
			/>
			{input.maxLength && (
				<div
					className={`text-xs absolute top-1/2 right-2 -translate-y-1/2 ${(currentValue?.length || 0) > input.maxLength && "text-red-600"}`}
				>
					{currentValue?.length || 0}/{input.maxLength}
				</div>
			)}
		</div>
	);
}
