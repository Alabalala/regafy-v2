import { createClient } from "./server";

//Create a profile for the auth user
export async function createProfile(formData, supabase) {
	const { name, userName, avatar, birthday } = formData;

	const { error: profilesError } = await supabase
		.from("profiles")
		.insert({ name: name, userName: userName, avatar: avatar, birthday });

	profilesError && console.error(profilesError);
}

export async function updateProfile(formData, supabase) {
	const { name, userName, avatar, id, birthday } = formData;

	const { error: profilesError } = await supabase
		.from("profiles")
		.update({ name, userName, avatar, birthday })
		.eq("id", id);

	profilesError && console.error(profilesError);
}

//Get profile info
export async function getProfile(userId, supabase) {
	const { data: profileData, error: profileError } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (profileError) {
		console.error("Profile error: ", profileError);
	}

	return profileData;
}

export async function checkUsername(username, supabase) {
	const { data, error } = await supabase
		.from("profiles")
		.select("userName")
		.eq("userName", username)
		.single();

	if (error && error.code !== "PGRST116") {
		console.error("Error checking: ", profileError);
		return { exists: false, error };
	}

	return { exists: !!data };
}

//FRIENDS

//Get your friends
export async function getFriends(userId, supabase) {
	const { data, error: friendsError } = await supabase
		.from("friends")
		.select("friend_id")
		.eq("user_id", userId);

	if (friendsError) {
		console.error("Friends error: ", friendsError);
	}

	return data;
}

//Get friends profiles by using user Id
export async function getFriendsProfile(userId, supabase) {
	const { data, error } = await supabase
		.from("friends")
		.select(
			`
 friend_id,
      friend:profiles!friends_friend_id_fkey(id, name, userName, avatar, birthday)
    `,
		)
		.eq("user_id", userId);

	if (error) {
		console.error("Error fetching friends' profiles: ", error);
		return [];
	}

	// Extract and return the profiles
	return data.map((friend) => friend.friend);
}

export async function findUser(userName, supabase) {
	const { data, error } = await supabase
		.from("profiles")
		.select("id, name, userName, avatar")
		.ilike("userName", userName)
		.limit(1);

	if (error) {
		console.error(error);
	}

	return data;
}

export async function checkIfFriends(userId, friendId, supabase) {
	const friends = await getFriends(userId, supabase);
	return friends.some((friend) => friend.friend_id === friendId);
}

//FRIEND REQUESTS
//Bring requests with profiles
export async function getRequests(userId, supabase) {
	try {
		const { data, error } = await supabase
			.from("friend_request")
			.select(
				`
        sender_id,
        status,
        created_at,
        sender:profiles!friend_request_sender_id_fkey1(name, userName, avatar)
      `,
			)
			.eq("receiver_id", userId)
			.eq("status", "pending")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching friend requests:", error);
			return [];
		}

		return data;
	} catch (catchError) {
		console.error("Unexpected error in getRequests:", catchError);
		return [];
	}
}

export async function checkRequestStatus(
	currentUserId,
	targetUserId,
	supabase,
) {
	const { data, error } = await supabase
		.from("friend_request")
		.select("sender_id, receiver_id, status")
		.or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
		.or(`sender_id.eq.${targetUserId},receiver_id.eq.${targetUserId}`);

	if (error) {
		console.error("Error checking friend request status: ", error);
		return null;
	}

	const outgoingRequest = data.find(
		(req) => req.sender_id === currentUserId && req.receiver_id === targetUserId,
	);

	const incomingRequest = data.find(
		(req) => req.sender_id === targetUserId && req.receiver_id === currentUserId,
	);

	return { outgoingRequest, incomingRequest };
}

export async function sendFriendRequest(senderId, receiverId, supabase) {
	const { error } = await supabase
		.from("friend_request")
		.insert({ sender_id: senderId, receiver_id: receiverId });

	if (error) {
		console.log(error);
	}
}

export async function addFriend(senderId, receiverId, supabase) {
	try {
		// Insert friendship in both directions
		const { error: friendError } = await supabase.from("friends").insert([
			{ friend_id: senderId, user_id: receiverId },
			{ friend_id: receiverId, user_id: senderId },
		]);

		// Update friend request status
		const { error: requestUpdateError } = await supabase
			.from("friend_request")
			.update({ status: "accepted" })
			.eq("sender_id", senderId)
			.eq("receiver_id", receiverId);

		// Check for any errors
		if (friendError1) {
			console.error("Error adding friend (direction 1):", friendError1);
			return false;
		}

		if (requestUpdateError) {
			console.error("Error updating friend request status:", requestUpdateError);
			return false;
		}
	} catch (error) {
		console.error("Unexpected error in addFriend:", error);
		return false;
	}
}

export async function rejecFriendRequest(senderId, receiverId, supabase) {
	const { error } = await supabase
		.from("friend_request")
		.update({ status: "rejected" })
		.eq("sender_id", senderId)
		.eq("receiver_id", receiverId);

	if (error) {
		console.log(error);
	}
}

export async function deleteFriend(userId, friendId, supabase) {
	const { error } = await supabase
		.from("friends")
		.delete()
		.eq("user_id", userId)
		.eq("friend_id", friendId);

	if (error) {
		console.error("Error deleting sender -> receiver relationship:", error);
	}

	const { error2 } = await supabase
		.from("friends")
		.delete()
		.eq("user_id", friendId)
		.eq("friend_id", userId);

	if (error2) {
		console.error("Error deleting receiver -> sender relationship:", error2);
	}

	const { error3 } = await supabase
		.from("friend_request")
		.delete()
		.or(`sender_id.eq.${friendId},receiver_id.eq.${friendId}`)
		.or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

	if (error3) {
		console.error("Error deleting receiver -> sender relationship:", error2);
	}
}

// GROUPS
export async function getUserGroups(userId, supabase) {
	const { data, error } = await supabase
		.from("group_members")
		.select(
			`
      *,
      groups(
        *,
        profiles(*)
      )
      `,
		)
		.eq("user_id", userId);

	if (error) {
		console.error("Error fetching data:", error);
	} else {
		const flattenedData = data.map((member) => {
			const flattened = { ...member, ...member.groups };
			delete flattened.groups;
			return flattened;
		});

		return flattenedData;
	}
}

export async function getGroupInfo(groupId, supabase) {
	const { data, error } = await supabase
		.from("groups")
		.select(
			`
      *,
      group_members(
      *,
       profiles(*)
      )
      `,
		)
		.eq("id", groupId)
		.single();

	if (error) {
		console.error("Error fetching data:", error);
	}
	return data;
}

export async function getGroupMembers(groupId, supabase) {
	const { data, error } = await supabase
		.from("group_members")
		.select("user_id")
		.eq("group_id", groupId);

	if (error) {
		console.error("Error fetching data:", error);
	}

	return data;
}

export async function addNewMember(userId, groupId, supabase) {
	const { data, error } = await supabase
		.from("group_members")
		.insert({ group_id: groupId, user_id: userId });

	if (error) {
		console.error("Error adding member: ", error);
	}

	return data;
}

export async function createGroup(formData, userId, supabase) {
	const { name, description, avatar: coverPhoto } = formData;

	const { error, data } = await supabase
		.from("groups")
		.insert({
			name: name,
			description: description,
			cover_photo: coverPhoto,
			creator: userId,
		})
		.select("*");

	const group = data?.[0];

	const { error: memberError } = await supabase
		.from("group_members")
		.insert({ group_id: group.id, user_id: userId });

	error && console.error(error);
	memberError && console.error(memberError);

	return data?.[0];
}

export async function leaveGroup(userId, groupId, supabase) {
	const { error } = await supabase
		.from("group_members")
		.delete()
		.eq("user_id", userId)
		.eq("group_id", groupId);
	console.error("Error leaving group:", error);
	throw new Error("Error leaving group:", error);
}

export async function updateGroup(formData, supabase) {
	const { name, description, avatar, id } = formData;

	const { error, data } = await supabase
		.from("groups")
		.update({ name, description, cover_photo: avatar })
		.eq("id", id);

	if (error) {
		console.error("Error updating group:", error);
	}

	return data;
}

export async function deleteGroup(groupId, supabase) {
	const { error } = await supabase.from("groups").delete().eq("id", groupId);

	const { error: errorMembers } = await supabase
		.from("group_members")
		.delete()
		.eq("group_id", groupId);

	if (error) {
		console.error("Error deleting group:", error);
		throw new Error("Error deleting group:", error);
	}
	if (errorMembers) {
		console.error("Error deleting members:", errorMembers);
		throw new Error("Error deleting members:", errorMembers);
	}
}

//EVENTS
export async function getGroupEvents(groupId, supabase) {
	const { data, error } = await supabase
		.from("group_event")
		.select("*")
		.eq("group_id", groupId)
		.order("date", { ascending: true });

	if (error) {
		console.error("Error fetching data:", error);
	}

	return data;
}

export async function createEvent(groupId, userId, formData, supabase) {
	const { name, description, date } = formData;

	const { error, data } = await supabase
		.from("group_event")
		.insert({ name, description, date, group_id: groupId, created_by: userId })
		.select();

	if (error) {
		console.error("Error fetching data:", error);
	}

	return data;
}

export async function updateEvent(formData, supabase) {
	const { name, description, date, id } = formData;

	const { error, data } = await supabase
		.from("group_event")
		.update({ name, description, date })
		.eq("id", id);

	if (error) {
		console.error("Error updating data:", error);
	}

	return data;
}

export async function getEventInfo(eventId, supabase) {
	const { data, error } = await supabase
		.from("group_event")
		.select("*")
		.eq("id", eventId)
		.single();

	if (error) {
		console.error("Error fetching data:", error);
	}

	return data;
}

export async function deleteEvent(eventId, supabase) {
	const { error: secretFriendError } = await supabase
		.from("event_secret_friend")
		.delete()
		.eq("event_id", eventId);

	if (secretFriendError) {
		console.error("Error deleting secret friend:", secretFriendError);
	}

	const { error } = await supabase
		.from("group_event")
		.delete()
		.eq("id", eventId);

	if (error) {
		console.error("Error deleting event:", error);
	}
}

//SECRET FRIEND
export async function addAssignment(eventId, assignments, supabase) {
	const { error } = await supabase.from("event_secret_friend").insert(
		assignments.map((assignment) => ({
			user_id: assignment.giver,
			assignee_id: assignment.receiver,
			event_id: eventId,
		})),
	);

	if (error) {
		console.error("Error fetching data:", error);
	}

	const { error: eventErro } = await supabase
		.from("group_event")
		.update({
			hasSecretFriend: true,
		})
		.eq("id", eventId);

	if (eventErro) {
		console.log(eventErro);
	}
}

export async function getAssigment(userId, eventId, supabase) {
	const { error, data } = await supabase
		.from("event_secret_friend")
		.select("assignee_id")
		.eq("event_id", eventId)
		.eq("user_id", userId)
		.single();

	if (error) {
		console.error("Error fetching data:", error);
	}

	return data;
}

//Messages
export async function getMessages(userId, supabase) {
	const { error, data } = await supabase
		.from("messages")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching messages:", error);
	}

	return data;
}

export async function getNewMessages(userId, supabase) {
	const { error, data } = await supabase
		.from("messages")
		.select("*")
		.eq("user_id", userId)
		.eq("read", false)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching new messages:", error);
	}

	return data;
}

export async function getOldMessages(userId, supabase) {
	const { error, data } = await supabase
		.from("messages")
		.select("*")
		.eq("user_id", userId)
		.eq("read", true)
		.order("created_at", { ascending: false })
		.limit(5);

	if (error) {
		console.error("Error fetching old messages:", error);
	}

	return data;
}

export async function readMessage(messageId, supabase) {
	const { error, data } = await supabase
		.from("messages")
		.update({ read: true })
		.eq("id", messageId);

	if (error) {
		console.error("Error fetching messages:", error);
	}
}

export async function countNewMessages(userId, supabase) {
	const { count, error } = await supabase
		.from("messages")
		.select("*", { count: "exact" }) // Enable count
		.eq("read", false) // Filter for unread messages
		.eq("user_id", userId); // Filter for the specific user

	if (error) {
		console.error("Error counting messages:", error);
	}

	return count;
}

//IMAGES
export async function uploadImageFile(giftId, file, supabase) {
	const fileName = giftId;
	const { data, error } = await supabase.storage
		.from("gift-images")
		.upload(fileName, file, {
			cacheControl: "no-store",
			upsert: true,
		});

	if (error) {
		console.error("Error uploading image:", error);
		return null;
	}

	const publicUrl = supabase.storage.from("gift-images").getPublicUrl(fileName)
		.data.publicUrl;

	return publicUrl;
}

export async function addGiftImage(giftId, image_link, supabase) {
	const { error, data } = await supabase
		.from("gifts")
		.update({ image_link })
		.eq("id", giftId);

	if (error) {
		console.error("Error updating data:", error);
	}

	return data;
}
