import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../shared/types/database.types";
import { FormDataWithFileType } from "../types/form";

export async function getGifts(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("gifts")
		.select(
			`
      *,
      profiles!gifts_added_by_fkey(name),
	  questions!questions_gift_id_fkey(
      *,
      answers!answers_question_id_fkey(*)
    )
		)
    `,
		)
		.eq("profile_id", userId);

	if (error) throw error;

	return data;
}

// export async function getGiftInfo(giftId, supabase) {
// 	const { data, error } = await supabase
// 		.from("gifts")
// 		.select("*")
// 		.eq("id", giftId)
// 		.single();

// 	if (error) {
// 		console.log(error);
// 	}

// 	return data;
// }

export async function createGift(
	giftData: FormDataWithFileType,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("gifts")
		.insert(giftData)
		.select("*");

	if (error) {
		console.log(error);
	}

	return data;
}

export async function createFriendGift(giftData, supabase) {
	const { data, error } = await supabase
		.from("gifts")
		.insert(giftData)
		.select("*");

	if (error) {
		console.log(error);
	}

	return data;
}

export async function updateGift(formData, supabase) {
	const {
		name,
		price,
		comments,
		shop_link: shopLink,
		size,
		id,
		image_link,
	} = formData;

	const { error, data } = await supabase
		.from("gifts")
		.update({ name, price, comments, shop_link: shopLink, size, image_link })
		.eq("id", id)
		.select("*");

	if (error) {
		console.error("Error updating gift:", error);
	}

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

export async function updateGiftPositions(gifts, supabase) {
	try {
		const updates = await Promise.all(
			gifts.map(({ id, position }) =>
				supabase.from("gifts").update({ position }).eq("id", id),
			),
		);

		const errors = updates.filter(({ error }) => error);
		if (errors.length > 0) {
			console.error("Errors updating some gifts:", errors);
			return { success: false, errors };
		}

		console.log("All gifts updated successfully");
		return { success: true };
	} catch (err) {
		console.error("Unexpected error:", err);
		return { success: false, error: err };
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
