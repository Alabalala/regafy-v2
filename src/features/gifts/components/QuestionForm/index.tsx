import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";

import { Gift, QuestionWithAnswers } from "@/shared/types/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newQuestionAction } from "../../actions/newQuestion";
import {
	QUESTION_INITIAL_VALUES,
	QUESTION_INPUT_FIELDS,
} from "../../constants/form";
import { questionSchema } from "../../schema/questionSchema";
import { QuestionFormType } from "../../types/form";

interface Props {
	userId: string;
	giftId: string;
	gifts: Gift[];
	setGifts: (gifts: Gift[]) => void;
}

const QuestionForm = ({ userId, giftId, gifts, setGifts }: Props) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<QuestionFormType>({
		resolver: zodResolver(questionSchema),
		defaultValues: QUESTION_INITIAL_VALUES,
	});

	const onSubmit = async (data: QuestionFormType) => {
		try {
			const result = await newQuestionAction(data, giftId, userId);
			if (!result.data) return;
			const normalisedQuestion: QuestionWithAnswers = {
				id: result.data.id!,
				gift_id: result.data.gift_id!,
				asked_by: result.data.asked_by!,
				content: result.data.content!,
				created_at: result.data.created_at!,
				answers: [],
			};

			const newGifts: Gift[] = gifts.map((g) => {
				return g.id === giftId
					? { ...g, questions: [...g.questions, normalisedQuestion] }
					: g;
			});
			setGifts(newGifts);
		} catch (error) {
			setError("root", { type: "serve r", message: "Failed to add answer" });
			return;
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col items-center gap-5"
		>
			<div className="flex flex-row items-center gap-2">
				{QUESTION_INPUT_FIELDS.map((input) => {
					const fieldName = input.name as keyof QuestionFormType;
					return (
						<div
							key={fieldName}
							className={"flex flex-col gap-2"}
						>
							<p className={"font-bold"}>{input.label}</p>

							<Input
								{...register(fieldName)}
								input={input}
								currentValue={watch(fieldName) || ""}
								error={!!errors[fieldName]}
							/>
							<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
						</div>
					);
				})}
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={"Adding answer..."}
				>
					Submit
				</Button>
			</div>
		</form>
	);
};
export default QuestionForm;
