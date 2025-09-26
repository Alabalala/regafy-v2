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
