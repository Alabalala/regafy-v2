export function createAssignments(guestIds: string[]) {
	if (guestIds.length < 2) {
		throw new Error("At least two members are required for Secret Santa!");
	}

	const givers = [...guestIds];
	let receivers: string[];

	do {
		receivers = [...guestIds];
		for (let i = receivers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[receivers[i], receivers[j]] = [receivers[j], receivers[i]];
		}
	} while (givers.some((giver, i) => giver === receivers[i]));

	return givers.map((giver, i) => ({
		user_id: giver,
		assignee_id: receivers[i],
	}));
}
