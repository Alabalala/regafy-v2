"use server";

import { createClient } from "@/shared/services/supabase/server";
import { validateForm } from "@/shared/services/validateData";
import { giftFormScheme } from "../schema/giftForm";

import { addAnswer, createGift } from "../services/supabase";
import { AnswerFormType, FormPayloadType } from "../types/form";
import { answerSchema } from "../schema/answerSchema";

export const newAnswerAction = async (
	formData: AnswerFormType,
	questionId: string,
) => {
	const supabase = await createClient();
	const result = validateForm(answerSchema, formData);
	if (!result.success)
		return { success: false, errors: { root: "Invalid data." } };

	const { answer } = formData;
	try {
		const newAnswer = await addAnswer(answer, questionId, supabase);

		return { success: true, data: newAnswer };
	} catch (error) {
		return {
			success: false,
			errors: {
				root: (error as Error).message ?? "There's been an error, try again later.",
			},
		};
	}
};
