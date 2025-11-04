export const QuestionContextMenu = (
	questionId: string,
	onDelete: () => void,
) => {
	return [
		{
			labelKey: "delete",
			onClick: onDelete,
		},
	];
};
