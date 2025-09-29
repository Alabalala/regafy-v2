"use client";
import { Event } from "@/shared/types/supabase/supabase";
import EventImage from "../EventImage";

interface Props {
	event: Event;
	canEdit?: boolean;
	sided?: boolean;
}

const EventInfo = ({ event, canEdit, sided }: Props) => {
	return (
		<div
			className={`flex ${sided ? "flex-row gap-2" : "flex-col"} justify-center items-center`}
		>
			<EventImage
				small={sided}
				canEdit={canEdit}
				eventImage={event.event_image_link}
				eventId={event.id}
			></EventImage>
			<div className={`${sided ? "flex flex-col" : ""}`}>
				<div className={`font-bold ${sided && "text-sm"}`}>{event.title}</div>
			</div>
		</div>
	);
};

export default EventInfo;
