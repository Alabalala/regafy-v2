import { Database } from "@/shared/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Assigments, EventFormData, EventFormPayload } from "../types/events";
import { SecretFriendType } from "@/shared/types/supabase/supabase";

export const getEvents = async (
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("event_guests")
		.select(
			`
		events!event_guests_event_id_fkey (
			*
		)
		`,
		)
		.eq("guest_id", userId)
		.order("created_at", { ascending: false });

	if (error) throw error;

	const { data: createdByMeEvents, error: createdByMeEventsError } =
		await supabase
			.from("events")
			.select(`*`)
			.eq("created_by", userId)
			.order("created_at", { ascending: false });

	if (createdByMeEventsError) throw createdByMeEventsError;

	const events = [
		...(data?.map((d) => d.events) ?? []),
		...(createdByMeEvents ?? []),
	];

	return events;
};

export const getSingleEvent = async (
	eventId: number,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("events")
		.select(
			`
      *,
      guests:event_guests (
        profile:profiles (*)
      ),
      secret_friends:event_secret_friend (*)
    `,
		)
		.eq("id", eventId)
		.single();

	if (error) throw error;

	return {
		...data,
		guests: data.guests.map((g) => g.profile),
	};
};

export const createEvent = async (
	event: EventFormPayload,
	supabase: SupabaseClient<Database>,
) => {
	const { guests, ...eventData } = event;
	const { data: newEventData, error: eventError } = await supabase
		.from("events")
		.insert(eventData)
		.select("*")
		.single();

	if (eventError) throw eventError;

	try {
		await addGuestsToEvent(newEventData.id, guests, supabase);
	} catch (guestError) {
		throw guestError;
	}

	return newEventData;
};

export const deleteEvent = async (
	eventId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("events")
		.delete()
		.eq("id", Number(eventId));

	if (error) throw error;

	return data;
};

export const updateEvent = async (
	eventId: number,
	event: EventFormData,
	newGuests: string[],
	deletedGuests: string[],
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("events")
		.update(event)
		.eq("id", Number(eventId))
		.select("*")
		.single();

	if (error) {
		console.error("updating event error:", error);
		throw error;
	}

	try {
		await addGuestsToEvent(eventId, newGuests, supabase);
		await deleteGuestFromEvent(eventId, deletedGuests, supabase);
	} catch (guestError) {
		throw guestError;
	}

	return data;
};

export const addImageToEvent = async (
	eventId: number,
	event_image_link: string,
	supabase: SupabaseClient<Database>,
) => {
	const { error, data } = await supabase
		.from("events")
		.update({ event_image_link })
		.eq("id", eventId)
		.select("*")
		.single();
	if (error) throw error;
	return data;
};

export const addGuestsToEvent = async (
	eventId: number,
	guests: string[],
	supabase: SupabaseClient<Database>,
) => {
	const { error, data } = await supabase
		.from("event_guests")
		.insert(guests.map((guest) => ({ event_id: eventId, guest_id: guest })))
		.select("*");

	if (error) {
		console.error("adding friends error:", error);
		throw error;
	}
	return data;
};

export const deleteGuestFromEvent = async (
	eventId: number,
	guests: string[],
	supabase: SupabaseClient<Database>,
) => {
	const { error } = await supabase
		.from("event_guests")
		.delete()
		.eq("event_id", eventId)
		.in("guest_id", guests)
		.select("*");

	if (error) {
		console.error("deleting friends error:", error);
		throw error;
	}
};

export const getEventComments = async (
	eventId: number,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("event_comments")
		.select("*, profiles(*)")
		.eq("event_id", eventId)
		.order("created_at", { ascending: true });

	if (error) throw error;

	return data;
};

export const createEventComment = async (
	eventId: number,
	content: string,
	userId: string,
	supabase: SupabaseClient<Database>,
) => {
	const { data, error } = await supabase
		.from("event_comments")
		.insert({ event_id: eventId, content, user_id: userId })
		.select("*, profiles(*)")
		.single();

	if (error) throw error;

	return data;
};

// assigments

export async function addAssignment(
	eventId: number,
	assignments: Assigments[],
	supabase: SupabaseClient<Database>,
) {
	const { data, error } = await supabase
		.from("event_secret_friend")
		.insert(
			assignments.map((assignment) => ({
				user_id: assignment.user_id,
				assignee_id: assignment.assignee_id,
				event_id: eventId,
			})),
		)
		.select();

	if (error) throw error;

	const { error: updatingEventError } = await supabase
		.from("events")
		.update({ hasSecretFriend: true })
		.eq("id", eventId);

	if (updatingEventError) throw updatingEventError;

	return data as SecretFriendType[];
}

export const updateAssigments = async (
	eventId: number,
	assignments: Assigments[],
	supabase: SupabaseClient<Database>,
) => {
	const { error: deleteError } = await supabase
		.from("event_secret_friend")
		.delete()
		.eq("event_id", eventId);

	if (deleteError) throw deleteError;

	const { data, error } = await supabase
		.from("event_secret_friend")
		.insert(
			assignments.map((assignment) => ({
				user_id: assignment.user_id,
				assignee_id: assignment.assignee_id,
				event_id: eventId,
			})),
		)
		.select();

	if (error) throw error;

	return data as SecretFriendType[];
};
