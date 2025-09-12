export interface InputType {
	name: string;
	type: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	accept?: string;
	options?: { value: string; label: string }[];
}

export interface FileInputDataType {
	file: File | null;
	preview: string | null;
}
