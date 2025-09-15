export function getTimeAgo(date: Date) {
	const createdDate = new Date(date).getTime();
	console.log(createdDate);
	const today = new Date().getTime();
	const timeDifference = today - createdDate;

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (months > 4) {
		return "> 4 months";
	} else if (days >= 30) {
		return `${months} months`;
	} else if (hours >= 24) {
		return `${days} days`;
	} else if (minutes >= 60) {
		return `${hours} hours`;
	} else if (seconds >= 60) {
		return `${minutes} min`;
	} else {
		return "just now";
	}
}
