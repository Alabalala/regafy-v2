export type normalisedEvent = {
	type: string;
	id: string | number;
	title: string;
	image?: string | null;
	date: Date | string;
};

export type EventsGroupedByDateType = {
	[year: number]: {
		[day: string]: normalisedEvent[];
	};
};

export type EventFormData = {
	title: string;
	description: string;
	date: string;
	created_by: string;
};

export type EventFormPayload = EventFormData & {
	guests: string[];
	image?: File | null;
};

export type Assigments = {
	assignee_id: string;
	user_id: string;
};
