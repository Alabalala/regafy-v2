import { Gift } from "@/shared/types/supabase/supabase";

export interface GiftFormData {
	title: string;
	price: string;
	description?: string;
	rating: string;
}

export type GiftFormNoFile = Omit<GiftFormData, "image">;

export interface FormDataWithFileType extends GiftFormData {
	image: File | null;
}

export interface FormPayloadType extends GiftFormData {
	added_by: string;
	profile_id: string;
}

export type AnswerFormType = {
	answer: string;
};

export type QuestionFormType = {
	question: string;
};
