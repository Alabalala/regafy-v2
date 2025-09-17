import { SupabaseClient } from "@supabase/supabase-js";
import { deleteQuestion } from "./supabase";
import { Database } from "@/shared/types/database.types";

export const QuestionContextMenu = (
	questionId: string,
	onDelete: () => void,
) => {
	return [
		{
			label: "Delete question",
			onClick: onDelete,
		},
	];
};
