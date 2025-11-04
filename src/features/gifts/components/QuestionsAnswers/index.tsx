import { Gift, QuestionWithAnswers } from "@/shared/types/supabase/supabase";
import QuestionForm from "../QuestionForm";
import { QuestionItem } from "../QuestionItem";
import { AnswerItem } from "../AnswerItem";
import AnswerForm from "../AnswerForm";
import { useTranslations } from "next-intl";

interface Props {
	questions: QuestionWithAnswers[];
	createdBy: string;
	userId: string;
	giftId: string;
	gifts: Gift[];
	setGifts: (gifts: Gift[]) => void;
}

const QuestionsAnswers = ({
	questions,
	createdBy,
	userId,
	giftId,
	gifts,
	setGifts,
}: Props) => {
	const t = useTranslations("gifts.post.Q&A");
	if (questions.length === 0)
		return (
			<div className="flex flex-col items-center gap-2 w-full">
				<p>{t("noQuestions")}</p>
				{createdBy !== userId && (
					<QuestionForm
						gifts={gifts}
						setGifts={setGifts}
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
							<p>{`${t("question")} ${index + 1}`}</p>
							<QuestionItem
								id={String(q.id)}
								question={q.content}
								canEdit={createdBy === userId || userId === q.asked_by}
							></QuestionItem>
							{q.answers.length > 0 ? (
								<AnswerItem
									gifts={gifts}
									setGifts={setGifts}
									id={String(q.answers[0].id)}
									answer={q.answers[0].content}
									canEdit={createdBy === userId}
								></AnswerItem>
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
						gifts={gifts}
						setGifts={setGifts}
						userId={userId}
						giftId={giftId}
					></QuestionForm>
				)}
			</div>
		</div>
	);
};

export default QuestionsAnswers;
