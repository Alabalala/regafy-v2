import { getLocale } from "next-intl/server";
import { getPrettyDate } from "../../services/getPrettyDate";
import { EventsGroupedByDateType } from "../../types/events";
import EventCard from "../EventCard";

interface Props {
	events: EventsGroupedByDateType;
}

const EventsList = async ({ events }: Props) => {
	const today = new Date();
	const currentYear = new Date().getFullYear();
	const locale = await getLocale();
	return (
		<div>
			<div className="text-lg flex flex-col gap-6">
				{Object.entries(events).map(([year, days]) => {
					return (
						<div
							className={"flex flex-col gap-3"}
							key={year}
						>
							{Number(year) > Number(currentYear) && (
								<h2 className="font-bold border-2 p-2 bg-secondary dark:bg-secondary-dark">
									{year}
								</h2>
							)}
							{Object.entries(days).map(([dayName, events]) => {
								return (
									<div
										className={" flex flex-col gap-3"}
										key={dayName}
									>
										<div className="font-semibold">
											{new Date(dayName) === today
												? "Today"
												: getPrettyDate(new Date(dayName), locale)}
										</div>
										<div className={"flex flex-col gap-3"}>
											{events.map((e) => {
												return (
													<EventCard
														key={e.id}
														event={e}
													/>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EventsList;
