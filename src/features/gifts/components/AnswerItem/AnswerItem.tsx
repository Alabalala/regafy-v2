import { ContextMenu } from "@/shared/components/ContextMenu/ContextMenu";
import { AnswerContextHelper } from "../../services/AnswerContextHelper";
import { deleteAnswer } from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { useGiftStore } from "../../stores/giftStore";

interface Props {
	answer: string;
	id: string;
	canEdit: boolean;
}

export const AnswerItem = ({ answer, id, canEdit }: Props) => {
	const supabase = createClient();
	const { gifts, setGifts } = useGiftStore();
	const onDelete = async () => {
		await deleteAnswer(id, supabase);
		const newGifts = gifts.map((g) => {
			return {
				...g,
				questions: g.questions.map((q) => {
					return {
						...q,
						answers: q.answers.filter((a) => String(a.id) !== String(id)),
					};
				}),
			};
		});
		setGifts(newGifts);
	};

	return (
		<div className="w-full flex flex-row justify-between px-5 bg-tertiary-50 dark:bg-tertiary-50-dark border-2 rounded-md p-2">
			<div className="flex flex-row gap-2">
				⮑ <p>{answer}</p>
			</div>
			{canEdit && (
				<ContextMenu helperFunction={() => AnswerContextHelper(id, onDelete)} />
			)}
		</div>
	);
};
