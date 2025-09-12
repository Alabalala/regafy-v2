export interface GiftFormData {
	title: string;
	price: string;
	description: string;
	userId: string;
	createdById: string;
}

export interface FormDataWithFileType extends GiftFormData {
	image: File | null;
}

export type FieldErrors = Record<string, string[] | undefined>;

export type ValidationResult =
	| { success: true }
	| { success: false; errors: FieldErrors };
