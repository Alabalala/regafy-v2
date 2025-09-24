import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";

import { useState } from "react";
import { QUESTION_INPUT_FIELDS } from "../../constants/form";
import { validateQuestionForm } from "../../services/validateQuestionForm";
import { ValidationError } from "next/dist/compiled/amphtml-validator";
import { addGiftQuestion } from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { useGiftStore } from "../../stores/giftStore";
import { Gift } from "@/shared/types/supabase/supabase";

interface Props {
	userId: string;
	giftId: string;
}

const QuestionForm = ({ userId, giftId }: Props) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<ValidationError>([]);
	const supabase = createClient();
	const { setGifts, gifts } = useGiftStore();
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const targetValue = e.target.value;
		const normalisedValue = targetValue.replace(/^ +/, "");
		setValue(normalisedValue);
	};

	const onSubmit = async () => {
		setLoading(true);
		setError(false);
		setErrorMessage([]);
		const validationResult = validateQuestionForm(value);

		if (!validationResult.success) {
			setError(true);
			setErrorMessage(validationResult.errors[0]);
			setLoading(false);
			return;
		}

		setError(false);
		setErrorMessage([]);

		try {
			const question = await addGiftQuestion(value, giftId, userId, supabase);
			const normalisedQuestion = { ...question, answers: [] };

			const newGifts: Gift[] = gifts.map((g) => {
				return g.id === giftId
					? { ...g, questions: [...g.questions, normalisedQuestion] }
					: g;
			});
			setGifts(newGifts);
		} catch (error) {
			setError(true);
			setErrorMessage("There's been a problem. Try again later.");
			return;
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="w-full flex flex-col items-center gap-5">
			<div className="flex flex-row items-center gap-2">
				{QUESTION_INPUT_FIELDS.map((input) => (
					<Input
						error={error}
						key={input.name}
						value={value}
						input={input}
						onChange={handleChange}
					/>
				))}
				<Button
					onClick={onSubmit}
					variant="primary"
					disabled={loading}
					loading={loading}
					loadingText="Sending"
				>
					Submit
				</Button>
			</div>
			{errorMessage && <p className="text-red-600">{errorMessage}</p>}
		</form>
	);
};
export default QuestionForm;
