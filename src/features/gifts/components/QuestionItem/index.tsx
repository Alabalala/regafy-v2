import { ContextMenu } from "@/shared/components/ContextMenu";
import { QuestionContextMenu } from "../../services/QuestionContextMenu";
import { createClient } from "@/shared/services/supabase/client";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";
import { deleteQuestion } from "../../services/supabase";

interface Props {
	question: string;
	id: string;
	canEdit: boolean;
}

export const QuestionItem = ({ question, id, canEdit }: Props) => {
	const { setGifts, gifts } = useGiftStore();
	const supabase = createClient();
	const onDelete = async () => {
		await deleteQuestion(id, supabase);
		const newGifts: Gift[] = gifts.map((g) => {
			return {
				...g,
				questions: g.questions.filter((q) => String(q.id) === String(id)),
			};
		});
		setGifts(newGifts);
	};
	return (
		<div className="w-full flex flex-row justify-between px-5 ml-0 mr-auto bg-tertiary dark:bg-tertiary-dark border-2 rounded-md p-2">
			<p>{question}</p>
			{canEdit && (
				<ContextMenu
					helperFunction={() => QuestionContextMenu(id, onDelete)}
				></ContextMenu>
			)}
		</div>
	);
};
