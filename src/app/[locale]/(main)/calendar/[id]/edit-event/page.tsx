import { getCurrentUser } from "@/features/auth/services/supabase";
import EventForm from "@/features/calendar/components/EventForm/indext";
import { getSingleEvent } from "@/features/calendar/services/supabase";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import H1WithExit from "@/shared/components/H1WithExit";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";
import { getTranslations } from "next-intl/server";

const EditEventPage = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const supabase = await createClient();
	const event = await getSingleEvent(Number(id), supabase);
	const friends = await getFriendsWithProfile(event.created_by, supabase);
	const t = await getTranslations("events.form");
	return (
		<div>
			<H1WithExit href={getPath("Event", id)}>{t("editEvent")}</H1WithExit>
			<EventForm
				type={"update"}
				friends={friends}
				event={event}
			></EventForm>
		</div>
	);
};

export default EditEventPage;
