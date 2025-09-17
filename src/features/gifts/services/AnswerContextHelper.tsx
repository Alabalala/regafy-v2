export const AnswerContextHelper = (id: string, onDelete: () => void) => {
	return [
		{
			label: "Delete",
			onClick: onDelete,
		},
	];
};
