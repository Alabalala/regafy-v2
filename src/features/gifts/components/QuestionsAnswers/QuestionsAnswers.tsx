import { QuestionWithAnswers } from "@/shared/types/supabase/supabase";
import QuestionForm from "../QuestionForm/QuestionForm";
import { QuestionItem } from "../QuestionItem/QuestionItem";
import { AnswerItem } from "../AnswerItem/AnswerItem";
import AnswerForm from "../AnswerForm/AnswerForm";

interface Props {
	questions: QuestionWithAnswers[];
	createdBy: string;
	userId: string;
	giftId: string;
}

const QuestionsAnswers = ({
	questions,

	createdBy,
	userId,
	giftId,
}: Props) => {
	if (questions.length === 0)
		return (
			<div className="flex flex-col items-center gap-2 w-full">
				<p>No questions yet </p>
				{createdBy !== userId && (
					<QuestionForm
						userId={userId}
						giftId={giftId}
					></QuestionForm>
				)}
			</div>
		);

	return (
		<div className={"flex flex-col gap-2"}>
			<p className={"font-bold"}>Questions</p>
			{questions.map((q, index) => {
				if (q.content) {
					return (
						<div
							className="flex flex-col gap-2"
							key={q.id}
						>
							<p>{`Question ${index + 1}`}</p>
							<QuestionItem question={q.content}></QuestionItem>
							{q.answers.length > 0 ? (
								<AnswerItem answer={q.answers[0].content}></AnswerItem>
							) : (
								<div>
									{createdBy === userId && (
										<AnswerForm questionId={String(q.id)}></AnswerForm>
									)}
								</div>
							)}
						</div>
					);
				}
			})}
			<div>
				{questions.length < 3 && createdBy !== userId && (
					<QuestionForm
						userId={userId}
						giftId={giftId}
					></QuestionForm>
				)}
			</div>
		</div>
	);
};

export default QuestionsAnswers;
