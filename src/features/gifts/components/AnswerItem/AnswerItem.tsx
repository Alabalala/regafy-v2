export const AnswerItem = ({ answer }: { answer: string }) => {
	return (
		<div className="w-full flex flex-row gap-2 px-5 bg-tertiary-50 dark:bg-tertiary-50-dark border-2 rounded-md p-2">
			⮑ <p>{answer}</p>
		</div>
	);
};
