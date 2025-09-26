import { getCurrentUser } from "@/features/auth/services/supabase";
import EventsList from "@/features/calendar/components/EventList/index";
import getNextBirthday from "@/features/calendar/services/getNextBirthday";
import { getEvents } from "@/features/calendar/services/supabase";
import { getFriendsWithProfile } from "@/features/friends/services/supabase";
import { NextLink } from "@/shared/components/Link";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/server";

const CalendarPage = async () => {
	const supabase = await createClient();
	const user = await getCurrentUser(supabase);
	let friends;
	let events;

	try {
		friends = await getFriendsWithProfile(user.id, supabase);
		events = await getEvents(user.id, supabase);
	} catch (err) {
		console.error(err);
	}

	if (!user || !friends || !events) return <LoadingComponent />;

	const normalisedFriends = friends.map((friend) => {
		const nextBirthday = getNextBirthday(friend.birthday);
		return {
			type: "birthday",
			id: friend.id,
			title: `${friend.name}'s birthday`,
			image: friend.profileImage,
			date: nextBirthday,
		};
	});
	const normalisedEvents = events
		.map((event) => ({
			type: "event",
			id: event.id,
			title: event.title,
			image: event.event_image_link,
			date: event.date,
		}))
		.filter((event) => new Date(event.date) > new Date());

	const allEvents = [...normalisedFriends, ...normalisedEvents].sort((a, b) => {
		const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
		if (diff !== 0) return diff;
		return a.title.localeCompare(b.title);
	});

	const eventsGroupedByDate = allEvents.reduce(
		(acc, event) => {
			const year = new Date(event.date).getFullYear();
			const dayKey = new Date(event.date).toDateString();
			if (!acc[year]) acc[year] = {};
			if (!acc[year][dayKey]) acc[year][dayKey] = [];
			acc[year][dayKey].push(event);
			return acc;
		},
		{} as Record<number, Record<string, (typeof allEvents)[0][]>>,
	);

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-xl font-bold ">CALENDAR</h1>

			<EventsList events={eventsGroupedByDate}></EventsList>
			<NextLink
				variant="primary"
				floating
				href={getPath("New event")}
			>
				New event
			</NextLink>
		</div>
	);
};

export default CalendarPage;
