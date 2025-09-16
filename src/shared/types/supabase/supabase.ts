import { Database } from "../../../shared/types/database.types";

export type AnswerWithRow = Database["public"]["Tables"]["answers"]["Row"];

export type QuestionWithAnswers =
	Database["public"]["Tables"]["questions"]["Row"] & {
		answers: AnswerWithRow[];
	};

export type Questions = Database["public"]["Tables"]["questions"]["Row"];
export type Gift = Database["public"]["Tables"]["gifts"]["Row"] & {
	profiles: { name: string } | null;
	questions: QuestionWithAnswers[];
};
