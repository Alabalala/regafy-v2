import { Gift } from "@/shared/types/supabase/supabase";

export interface GiftFormData {
	title: string;
	price: string;
	description: string;
}

export interface FormDataWithFileType extends GiftFormData {
	image: File | null;
	rating: string;
}

export type GiftFormNoFile = Omit<
	Gift,
	| "id"
	| "created_at"
	| "image_link"
	| "questions"
	| "profiles"
	| "reserved"
	| "reserved_by"
>;
