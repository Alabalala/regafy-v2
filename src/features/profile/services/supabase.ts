import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { ProfileFormData } from "../types/form.types";

//Create a profile for the auth user
export async function createProfile(
	formData: ProfileFormData,
	supabase: SupabaseClient<Database>,
	id: string,
) {
	const { name, userName, birthday } = formData;

	const { data, error } = await supabase
		.from("profiles")
		.insert({ id, name, userName, birthday })
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function updateProfile(
	formData: ProfileFormData,
	profileId: string,
	supabase: SupabaseClient<Database>,
) {
	const { name, userName, birthday } = formData;

	const { data, error } = await supabase
		.from("profiles")
		.update({ name, userName, birthday, updated_at: new Date().toISOString() })
		.eq("id", profileId)
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function getProfile(
	userId: string,
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) throw error;

	return data;
}

export const checkIfFriends = async (
	userId: string,
	friendId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("friends")
		.select("*")
		.eq("user_id", userId)
		.eq("friend_id", friendId);

	if (error) throw error;
	return data.length > 0;
};

export const deleteFriend = async (
	userId: string,
	friendId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { error } = await supabase
		.from("friends")
		.delete()
		.or(
			`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`,
		);

	if (error) throw error;
};

export const getFriendRequest = async (
	userId: string,
	profileId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("friend_request")
		.select("*")
		.or(
			`and(sender_id.eq.${userId},receiver_id.eq.${profileId}),and(sender_id.eq.${profileId},receiver_id.eq.${userId})`,
		)
		.eq("status", "pending")
		.maybeSingle();

	if (error) throw error;
	return data;
};

export const getAllFriendRequests = async (
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("friend_request")
		.select(
			`*,
	  sender:profiles!friend_request_sender_id_fkey1(*)`,
		)
		.eq("receiver_id", userId)
		.eq("status", "pending");

	if (error) throw error;
	return data;
};

export const sendFriendRequest = async (
	friendId: string,
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("friend_request")
		.insert({ sender_id: userId, receiver_id: friendId })
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const cancelFriendRequest = async (
	userId: string,
	friendId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { error } = await supabase
		.from("friend_request")
		.delete()
		.eq("sender_id", userId)
		.eq("receiver_id", friendId);
};

export const acceptFriendRequest = async (
	userId: string,
	friendId: string,
	requestId: number,
	supabase: SupabaseClient<Database>,
) => {
	const { error: requestError } = await supabase
		.from("friend_request")
		.update({ status: "accepted" })
		.eq("id", requestId);
	if (requestError) throw requestError;

	const { error } = await supabase.from("friends").insert([
		{ user_id: userId, friend_id: friendId },
		{ user_id: friendId, friend_id: userId },
	]);

	if (error) throw error;
};

//Image

export async function addImageToProfile(
	profileImage: string,
	profileId: string,
	supabase: SupabaseClient<Database>,
) {
	const { error } = await supabase
		.from("profiles")
		.update({ profileImage: profileImage })
		.eq("id", profileId);

	if (error) throw error;
}
