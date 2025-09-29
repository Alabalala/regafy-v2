import CalendarSVG from "@/shared/components/SVGs/calendarSVG";

const EventDate = ({ date }: { date: string }) => {
	const newDate = new Date(date).toLocaleDateString("en-GB");

	return (
		<div className="border-2 w-3/4 mx-auto p-2 rounded bg-background-50 dark:bg-background-dark-50">
			<div className="flex flex-row gap-5 w-fit mx-auto items-center">
				<CalendarSVG
					className="w-8 h-8"
					filled
				></CalendarSVG>
				<div className="flex flex-col items-center">
					<div className="font-bold">Date</div>
					<div>{newDate}</div>
				</div>
			</div>
		</div>
	);
};

export default EventDate;
