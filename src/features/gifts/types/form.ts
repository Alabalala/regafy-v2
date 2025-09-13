export interface GiftFormData {
	title: string;
	price: string;
	description: string;
	userId: string;
	createdById: string;
}

export interface FormDataWithFileType extends GiftFormData {
	image: File | null;
	rating: string;
}
