import { ContextMenu } from "@/shared/components/ContextMenu/ContextMenu";
import { QuestionContextMenu } from "../../services/QuestionContextMenu";
import { createClient } from "@/shared/services/supabase/client";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";

interface Props {
	question: string;
	id: string;
	canEdit: boolean;
}

export const QuestionItem = ({ question, id, canEdit }: Props) => {
	const { setGifts, gifts } = useGiftStore();
	const onDelete = () => {
		const newGifts: Gift[] = gifts.map((g) => {
			return {
				...g,
				questions: g.questions.filter((q) => String(q.id) === String(id)),
			};
		});
		setGifts(newGifts);
	};
	const supabase = createClient();
	return (
		<div className="w-full flex flex-row justify-between px-5 ml-0 mr-auto bg-tertiary dark:bg-tertiary-dark border-2 rounded-md p-2">
			<p>{question}</p>
			{canEdit && (
				<ContextMenu
					helperFunction={() => QuestionContextMenu(id, onDelete, supabase)}
				></ContextMenu>
			)}
		</div>
	);
};
