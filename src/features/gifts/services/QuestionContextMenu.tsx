import { SupabaseClient } from "@supabase/supabase-js";
import { deleteQuestion } from "./supabase";
import { Database } from "@/shared/types/database.types";

export const QuestionContextMenu = (
	questionId: string,
	onDelete: (questionId: string) => void,
	supabase: SupabaseClient<Database>,
) => {
	return [
		{
			label: "Delete question",
			onClick: async () => {
				await deleteQuestion(questionId, supabase);
				onDelete(questionId);
			},
		},
	];
};
