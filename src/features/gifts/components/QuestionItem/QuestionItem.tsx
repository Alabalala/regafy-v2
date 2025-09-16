export const QuestionItem = ({ question }: { question: string }) => {
	return (
		<div className="w-full px-5 ml-0 mr-auto bg-tertiary dark:bg-tertiary-dark border-2 rounded-md p-2">
			<p>{question}</p>
		</div>
	);
};
