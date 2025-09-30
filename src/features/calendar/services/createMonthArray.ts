export const createMonthArray = (month: number, year: number) => {
	const daysInMonth = (month: number, year: number) => {
		return new Date(year, month, 0).getDate();
	};

	const lastDayPrevMonth = daysInMonth(month, year);
	const numberOfDays = daysInMonth(month + 1, year);
	const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
	const monthArray = [];

	for (let i = 1; i <= numberOfDays + firstWeekday; i++) {
		if (i <= firstWeekday) {
			monthArray.push({ day: lastDayPrevMonth - firstWeekday + i, type: "prev" });
		} else {
			monthArray.push({ day: i - firstWeekday, type: "current" });
		}
	}
	const remainingCells = 7 - (monthArray.length % 7);

	if (remainingCells < 7) {
		for (let i = 1; i <= remainingCells; i++) {
			monthArray.push({ day: i, type: "next" });
		}
	}

	return monthArray;
};
