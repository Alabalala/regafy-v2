export default function getNextBirthday(birthday: string): Date {
	const date = new Date(birthday);
	const today = new Date();
	const currentYear = today.getFullYear();

	let nextBirthday = new Date(currentYear, date.getMonth(), date.getDate());
	if (nextBirthday < today) {
		nextBirthday = new Date(currentYear + 1, date.getMonth(), date.getDate());
	}
	return nextBirthday;
}
