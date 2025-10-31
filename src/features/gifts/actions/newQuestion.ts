"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";

import { questionSchema } from "../schema/questionSchema";
import { addGiftQuestion } from "../services/supabase";
import { QuestionFormType } from "../types/form";

export const newQuestionAction = async (
	formData: QuestionFormType,
	giftId: string,
	userId: string,
) => {
	const supabase = await createClient();
	const result = validateForm(questionSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { question } = formData;
	try {
		const newQuestion = await addGiftQuestion(question, giftId, userId, supabase);

		return { success: true, data: newQuestion };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
