"use client";
import { Button } from "@/shared/components/Button";
import { Event } from "@/shared/types/supabase/supabase";
import { useEffect, useState } from "react";
import { WEEKDAYS } from "../../constants/calendar";
import { createMonthArray } from "../../services/createMonthArray";
import { EventsGroupedByDateType, normalisedEvent } from "../../types/events";
import { set } from "zod";
import EventsList from "../EventList";
import EventCard from "../EventCard";
import { getPrettyDate } from "../../services/getPrettyDate";
import { NextLink } from "@/shared/components/Link";
import { getPath } from "@/shared/services/getPath";
import { padNumber } from "../../services/padNumber";

interface Props {
	events: EventsGroupedByDateType;
}

const Calendar = ({ events }: Props) => {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [monthArray, setMonthArray] = useState(createMonthArray(month, year));
	const [chosenDate, setChosenDate] = useState({ day: 0, type: "" });
	const [isFading, setIsFading] = useState(false);
	const [chosenDayEvents, setChosenDayEvents] = useState<normalisedEvent[]>([]);

	useEffect(() => {
		if (events && chosenDate.type === "current") {
			const dateKey = new Date(year, month, chosenDate.day).toDateString();
			setChosenDayEvents(events[year]?.[dateKey] ?? []);
		}
	}, [events, chosenDate]);

	useEffect(() => {
		setMonthArray(createMonthArray(month, year));
	}, [month, year]);

	const today = new Date();

	const changeMonth = (direction: "forward" | "back") => {
		setChosenDate({ day: 0, type: "" });
		setIsFading(true);
		setTimeout(() => {
			if (direction === "forward") {
				if (month + 1 > 11) {
					setYear((y) => y + 1);
					setMonth(0);
				} else {
					setMonth((m) => m + 1);
				}
			} else {
				if (month - 1 < 0) {
					setYear((y) => y - 1);
					setMonth(11);
				} else {
					setMonth((m) => m - 1);
				}
			}
			setIsFading(false);
		}, 200);
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex gap-5 flex-col p-4 border-2 rounded-md bg-tertiary dark:bg-tertiary-dark">
				<div className="flex flex-row justify-around items-center">
					<div className="bg-secondary dark:bg-secondary-dark px-3 py-2 rounded-md border-2">
						<Button
							onClick={() => changeMonth("back")}
							isPlain
						>
							&lt;
						</Button>
					</div>
					<div className="w-full">
						<p className="text-center font-bold">
							{new Date(year, month, 1).toLocaleDateString("en-GB", {
								month: "long",
								year: "numeric",
							})}
						</p>
					</div>
					<div className="bg-secondary dark:bg-secondary-dark px-3 py-2 rounded-md border-2">
						<Button
							onClick={() => changeMonth("forward")}
							isPlain
						>
							&gt;
						</Button>
					</div>
				</div>
				<div
					className={`grid grid-cols-7 justify-items-center transition-opacity duration-200 ${
						isFading ? "opacity-0" : "opacity-100"
					}`}
				>
					{" "}
					{WEEKDAYS.map((weekday) => (
						<div
							className="font-semibold"
							key={weekday}
						>
							{weekday}
						</div>
					))}
					{monthArray.map((day) => {
						const isToday =
							day.type === "current" &&
							day.day === today.getDate() &&
							month === today.getMonth() &&
							year === today.getFullYear();

						const dayDate = new Date(year, month, day.day).toDateString();

						const hasEvent =
							day.type === "current" && events[year]?.[dayDate]?.length > 0;

						return (
							<Button
								disabled={day.type !== "current"}
								isPlain
								key={`${day.type}-${day.day}`}
								onClick={() => setChosenDate({ day: day.day, type: day.type })}
							>
								<div
									className={`w-10 h-10 flex relative items-center justify-center rounded-md border-2
                                        ${isToday && "bg-accent dark:bg-accent-dark border-2 rounded-md"}
                                        ${chosenDate.day === day.day && chosenDate.type === day.type ? "border-black dark:border-white rounded-md border-2  bg-tertiary-50 dark:bg-tertiary-50-dark" : "border-2 border-transparent"} 
                                        ${day.type !== "current" && "opacity-30"} 
                                        `}
									key={`${day.type}-${day.day}`}
								>
									<div>{day.day}</div>
									{hasEvent && (
										<div className="absolute top-1 right-1 w-2 h-2 bg-red-500 dark:bg-red-950 rounded-full border-1" />
									)}
								</div>
							</Button>
						);
					})}
				</div>
			</div>

			<div>
				{chosenDate.type === "current" && chosenDayEvents.length > 0 && (
					<div className="flex flex-col gap-3 bg-tertiary dark:bg-tertiary-dark border-2 rounded-md p-4">
						<p>
							Events on {getPrettyDate(new Date(year, month, chosenDate.day), "en-UK")}
						</p>
						{chosenDayEvents.map((e) => (
							<EventCard
								key={e.id}
								event={e}
							/>
						))}
						<div className="w-full flex justify-center">
							<NextLink
								variant="secondary"
								href={`${getPath("New event")}?date=${year}-${padNumber(month + 1)}-${padNumber(chosenDate.day)}`}
							>
								New event
							</NextLink>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Calendar;
