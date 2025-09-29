import { ValidationResult } from "@/shared/types/forms";
import z from "zod";
import { eventFormSchema } from "../schemas/eventFormSchema";
import { EventFormPayload } from "../types/events";

export const validateEventForm = (
	formData: EventFormPayload,
): ValidationResult => {
	const result = eventFormSchema.safeParse(formData);

	if (!result.success) {
		const { fieldErrors } = z.flattenError(result.error);
		return {
			success: false,
			errors: fieldErrors,
		};
	}

	return {
		success: true,
	};
};
