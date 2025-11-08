import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";

import { createNotificationAction } from "@/shared/actions/createNotification";
import { Gift, QuestionWithAnswers } from "@/shared/types/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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
	giftOwnerId: string;
}

const QuestionForm = ({
	userId,
	giftId,
	gifts,
	setGifts,
	giftOwnerId,
}: Props) => {
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
	const t = useTranslations("gifts.post.Q&A");
	const tButtons = useTranslations("buttons");
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
			if (giftOwnerId !== userId) {
				await createNotificationAction([giftOwnerId], "question", userId, giftId);
			}
		} catch (error) {
			setError("root", { type: "serve r", message: "Failed to add answer" });
			return;
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col gap-5"
		>
			{QUESTION_INPUT_FIELDS.map((input) => {
				const fieldName = input.name as keyof QuestionFormType;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{t(input.labelKey)}</p>

						<Input
							{...register(fieldName)}
							input={input}
							currentValue={watch(fieldName) || ""}
							error={!!errors[fieldName]}
							placeholder={t(input.placeholderKey)}
						/>
						<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
					</div>
				);
			})}
			<div className="flex justify-center">
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={tButtons("adding")}
				>
					{tButtons("submit")}
				</Button>
			</div>
		</form>
	);
};
export default QuestionForm;
