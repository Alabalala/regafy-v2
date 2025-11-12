import { getCurrentUser } from "@/features/auth/services/supabase";
import EventComment from "@/features/calendar/components/Comment";
import CommentsList from "@/features/calendar/components/CommentsList";
import EventDate from "@/features/calendar/components/EventDate";
import EventInfo from "@/features/calendar/components/EventInfo";
import SecretFriend from "@/features/calendar/components/SecretFriend";
import {
	getEventComments,
	getSingleEvent,
} from "@/features/calendar/services/supabase";
import FriendsList from "@/features/friends/components/friendsList";

import { getProfile } from "@/features/profile/services/supabase";
import ClientToaster from "@/shared/components/ClientToaster";
import { NextLink } from "@/shared/components/Link";
import LoadingComponent from "@/shared/components/loadingModule";
import Modal from "@/shared/components/Modal";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import { getTranslations } from "next-intl/server";

const EventPage = async ({ params }: { params: { id: string } }) => {
	const supabase = await createClient();

	const { id } = await params;
	const event = await getSingleEvent(Number(id), supabase);
	const createdByProfile = await getProfile(event.created_by, supabase);
	const comments = await getEventComments(Number(id), supabase);
	if (!event) return <LoadingComponent />;
	const user = await getCurrentUser(supabase);
	const t = await getTranslations("events");
	const tButtons = await getTranslations("buttons");
	const guestIds = event.guests.map((g) => {
		return g.id;
	});
	return (
		<div className="flex flex-col gap-5">
			<EventInfo
				canEdit
				event={event}
			></EventInfo>
			<ClientToaster />
			<EventDate date={event.date}></EventDate>
			<div className="flex flex-row gap-2 justify-around">
				<NextLink
					shrink
					variant="secondary"
					href={getPath("Edit event", String(event.id))}
				>
					{tButtons("editEvent")}
				</NextLink>
				<Modal
					modalTitle={t("event.modal.deleteModalTitle")}
					modalContent={t("event.modal.deleteModalMessage")}
					buttons={{
						initial: {
							text: tButtons("deleteEvent"),
							variant: "delete",
							shrink: true,
						},
						leftButton: {
							text: tButtons("cancel"),
							isPlain: true,
							isCancel: true,
						},
						rightButton: {
							text: tButtons("confirmDelete"),
							apiRoute: "/api/events/delete/" + String(event.id),
							method: "DELETE",
							variant: "delete",
						},
					}}
					redirect={getPath("Calendar")}
				></Modal>
			</div>
			<EventComment
				isDescription
				message={event.description}
				profileImage={createdByProfile.profileImage}
				profileName={createdByProfile.name}
				messageTime={event.created_at}
			></EventComment>
			<hr />
			<h2 className="text-xl font-bold">{t("event.guests")}</h2>
			<FriendsList friends={event.guests}></FriendsList>
			<hr />
			<SecretFriend
				hasSecretFriend={event.hasSecretFriend}
				isUserCreator={user.id === event.created_by}
				secretFriend={event.secret_friends}
				eventId={event.id}
				guests={event.guests}
				userId={user.id}
			></SecretFriend>
			<hr />
			<CommentsList
				guestIds={guestIds}
				comments={comments}
			></CommentsList>
		</div>
	);
};

export default EventPage;
