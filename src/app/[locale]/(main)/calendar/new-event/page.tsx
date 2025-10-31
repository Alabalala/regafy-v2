import { getCurrentUser } from "@/features/auth/services/supabase";
import EventForm from "@/features/calendar/components/EventForm/indext";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import H1WithExit from "@/shared/components/H1WithExit";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";

const NewEventPage = async () => {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	const friends = await getFriendsWithProfile(user.id, supabase);

	return (
		<div className={"flex flex-col gap-5"}>
			<H1WithExit href={getPath("Calendar")}>New event</H1WithExit>
			<EventForm
				type={"create"}
				friends={friends}
			></EventForm>
		</div>
	);
};

export default NewEventPage;
