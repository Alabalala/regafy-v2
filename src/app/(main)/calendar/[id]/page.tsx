import EventComment from "@/features/calendar/components/Comment";
import CommentsList from "@/features/calendar/components/CommentsList";
import EventDate from "@/features/calendar/components/EventDate";
import EventInfo from "@/features/calendar/components/EventInfo";
import {
	getEventComments,
	getSingleEvent,
} from "@/features/calendar/services/supabase";
import FriendsList from "@/features/friends/components/friendsList";

import { getProfile } from "@/features/profile/services/supabase";
import { ContextMenu } from "@/shared/components/ContextMenu";
import { NextLink } from "@/shared/components/Link";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import Link from "next/link";

const EventPage = async ({ params }: { params: { id: string } }) => {
	const supabase = await createClient();

	const { id } = await params;
	const event = await getSingleEvent(Number(id), supabase);
	const createdByProfile = await getProfile(event.created_by, supabase);
	const comments = await getEventComments(Number(id), supabase);
	if (!event) return <LoadingComponent />;

	return (
		<div className="flex flex-col gap-5">
			<EventInfo
				canEdit
				event={event}
			></EventInfo>
			<EventDate date={event.date}></EventDate>

			<div className="flex flex-row gap-2">
				<NextLink
					variant="secondary"
					href={getPath("Edit event", String(event.id))}
				>
					Edit event
				</NextLink>
				<NextLink
					variant="delete"
					href={getPath("Edit event", String(event.id))}
				>
					Delete event
				</NextLink>
			</div>

			<EventComment
				isDescription
				message={event.description}
				profileImage={createdByProfile.profileImage}
				profileName={createdByProfile.name}
			></EventComment>

			<hr />
			<h2 className="text-xl font-bold">Guests</h2>
			<FriendsList friends={event.guests}></FriendsList>
			<hr />
			<CommentsList comments={comments}></CommentsList>
		</div>
	);
};

export default EventPage;
