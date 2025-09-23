export interface InputType {
	name: string;
	type: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	accept?: string;
	options?: { value: string; label: string }[];
	fullWidth?: boolean;
}

export interface FileInputDataType {
	file: File | null;
	preview?: string | null;
}

export type FieldErrors = Record<string, string[] | undefined>;

export type ValidationResult =
	| { success: true }
	| { success: false; errors: FieldErrors };
