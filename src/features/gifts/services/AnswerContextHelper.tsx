export const AnswerContextHelper = (id: string, onDelete: () => void) => {
	return [
		{
			labelKey: "delete",
			onClick: onDelete,
		},
	];
};
