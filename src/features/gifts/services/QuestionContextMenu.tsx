export const QuestionContextMenu = (
	questionId: string,
	onDelete: () => void,
) => {
	return [
		{
			label: "Delete question",
			onClick: onDelete,
		},
	];
};
