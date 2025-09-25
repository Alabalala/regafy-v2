import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../shared/types/database.types";
import { FormDataWithFileType, GiftFormNoFile } from "../types/form";
import { Gift } from "@/shared/types/supabase/supabase";

export async function getGifts(
	userId: string,
	supabase: SupabaseClient<Database>,
): Promise<Gift[]> {
	const { data, error } = await supabase
		.from("gifts")
		.select(
			`
      *,
   	profiles!gifts_added_by_fkey(*),
    owner:profiles!gifts_profile_id_fkey(*),
    questions!questions_gift_id_fkey(
      *,
      answers!answers_question_id_fkey(*)
    )
		)
    `,
		)
		.eq("profile_id", userId)
		.order("rating", { ascending: false });

	if (error) throw error;

	return (data as unknown as Gift[]) ?? [];
}

export async function createGift(
	giftData: GiftFormNoFile,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("gifts")
		.insert(giftData)
		.select("*")
		.single();

	if (error) throw error;
	return data;
}

export async function updateGift(
	formData: GiftFormNoFile,
	giftId: string,
	supabase: SupabaseClient<Database>,
) {
	const { title, price, rating, description } = formData;

	const { error, data } = await supabase
		.from("gifts")
		.update({ title, description, price, rating })
		.eq("id", giftId)
		.select("*");

	if (error) throw error;

	return data;
}
export async function reserveGift(
	giftId: string,
	supabase: SupabaseClient<Database>,
	isReserved: boolean,
	reservedById?: string,
) {
	const { error, data } = await supabase
		.from("gifts")
		.update({
			reserved: isReserved,
			reserved_by: isReserved ? reservedById : null,
		})
		.eq("id", giftId);

	if (error) {
		console.error("Error reserving gift:", error);
	}
}

export async function deleteGift(giftId, supabase) {
	const { data, error } = await supabase.from("gifts").delete().eq("id", giftId);

	if (error) throw error;

	return data;
}

export async function addGiftQuestion(
	question: string,
	giftId: string,
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("questions")
		.insert({ content: question, gift_id: giftId, asked_by: userId })
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function addAnswer(
	answer: string,
	questionId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("answers")
		.insert({ content: answer, question_id: Number(questionId) })
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function deleteQuestion(
	questionId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("questions")
		.delete()
		.eq("id", Number(questionId));

	if (error) throw error;

	return data;
}

export async function deleteAnswer(
	answerId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("answers")
		.delete()
		.eq("id", Number(answerId));

	if (error) throw error;

	return data;
}

export async function uploadImageFile(
	giftId: string,
	file: File,
	supabase: SupabaseClient<Database>,
) {
	const fileName = giftId;
	const { error } = await supabase.storage
		.from("gift-images")
		.upload(fileName, file, {
			cacheControl: "no-store",
			upsert: true,
		});

	if (error) throw error;

	const publicUrl = supabase.storage.from("gift-images").getPublicUrl(fileName)
		.data.publicUrl;

	return publicUrl;
}

export async function addImageToGift(
	giftId: string,
	image_link: string,
	supabase: SupabaseClient<Database>,
) {
	const { error, data } = await supabase
		.from("gifts")
		.update({ image_link })
		.eq("id", giftId)
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function deleteImageFromGift(
	giftId: string,
	supabase: SupabaseClient<Database>,
) {
	const { error, data } = await supabase
		.from("gifts")
		.update({ image_link: null })
		.eq("id", giftId)
		.select("*")
		.single();
	if (error) throw error;
	return data;
}
