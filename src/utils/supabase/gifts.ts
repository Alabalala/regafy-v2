import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";
import { FormDataWithFileType, GiftFormData } from "../../../.next/types/forms";

export async function getGifts(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("gifts")
		.select(
			`
      *,
      profiles!gifts_added_by_fkey(name)
    `,
		)
		.eq("profile_id", userId)
		.order("position", { ascending: true });

	if (error) throw error;

	return data;
}

export async function getGiftInfo(giftId, supabase) {
	const { data, error } = await supabase
		.from("gifts")
		.select("*")
		.eq("id", giftId)
		.single();

	if (error) {
		console.log(error);
	}

	return data;
}

export async function createGift(
	giftData: FormDataWithFileType,
	supabase: SupabaseClient<Database>,
) {
	const { data: maxPositionData, error: maxPositionError } = await supabase
		.from("gifts")
		.select("position")
		.eq("profile_id", giftData.userId)
		.order("position", { ascending: false })
		.limit(1);

	if (maxPositionError) {
		console.log(maxPositionError);
		return;
	}

	// Set the position for the new gift
	const newPosition =
		maxPositionData.length > 0 ? maxPositionData[0].position + 1 : 1;

	// Add the calculated position to giftData
	giftData = { ...giftData, position: newPosition };

	// Insert the new gift with the updated position
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
export async function reserveGift(giftId, userId, supabase) {
	const { error, data } = await supabase
		.from("gifts")
		.update({ reserved: true, reserved_by: userId })
		.eq("id", giftId)
		.select("*");

	if (error) {
		console.error("Error reserving gift:", error);
	}

	return data;
}
export async function unreserveGift(giftId, supabase) {
	const { error, data } = await supabase
		.from("gifts")
		.update({ reserved: false, reserved_by: null })
		.eq("id", giftId)
		.select("*");

	if (error) {
		console.error("Error unreserving gift:", error);
	}

	return data;
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
