import { Database } from "../../../shared/types/database.types";

export type AnswerWithRow = Database["public"]["Tables"]["answers"]["Row"];

export type QuestionWithAnswers =
	Database["public"]["Tables"]["questions"]["Row"] & {
		answers: AnswerWithRow[];
	};

export type Questions = Database["public"]["Tables"]["questions"]["Row"];
export type Gift = Database["public"]["Tables"]["gifts"]["Row"] & {
	profiles: Database["public"]["Tables"]["profiles"]["Row"];
	questions: QuestionWithAnswers[];
	owner?: Database["public"]["Tables"]["profiles"]["Row"];
};

export type SingleGift = Database["public"]["Tables"]["gifts"]["Row"];

export type Event = Database["public"]["Tables"]["events"]["Row"] & {
	guests: Database["public"]["Tables"]["profiles"]["Row"][];
	secret_friends: SecretFriendType[];
};

export type Comments = Database["public"]["Tables"]["event_comments"]["Row"] & {
	profiles: Database["public"]["Tables"]["profiles"]["Row"];
};

export type SecretFriendType =
	Database["public"]["Tables"]["event_secret_friend"]["Row"];
