import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";

import { Gift } from "@/shared/types/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newAnswerAction } from "../../actions/newAnswser";
import {
	ANSWER_INITIAL_VALUES,
	ANSWER_INPUT_FIELDS,
} from "../../constants/form";
import { answerSchema } from "../../schema/answerSchema";
import { useGiftStore } from "../../stores/giftStore";
import { AnswerFormType } from "../../types/form";
import { useTranslations } from "next-intl";
import { createNotificationAction } from "@/shared/actions/createNotification";

interface Props {
	questionId: string;
	giftId: string;
	questionOwnerId: string;
	userId: string;
}
//TODO add delete functions - fix forms
const AnswerForm = ({ questionId, giftId, questionOwnerId, userId }: Props) => {
	const { setGifts, gifts } = useGiftStore();
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<AnswerFormType>({
		resolver: zodResolver(answerSchema),
		defaultValues: ANSWER_INITIAL_VALUES,
	});
	const t = useTranslations("gifts.post.Q&A");
	const tButtons = useTranslations("buttons");
	const onSubmit = async (data: AnswerFormType) => {
		try {
			const result = await newAnswerAction(data, questionId);
			if (!result.data) return;
			const newGifts: Gift[] = gifts.map((g) => {
				return {
					...g,
					questions: g.questions.map((q) => {
						return String(q.id) === String(questionId)
							? { ...q, answers: [...q.answers, result?.data] }
							: q;
					}),
				};
			});
			setGifts(newGifts);
			await createNotificationAction([questionOwnerId], "answer", userId, giftId);
		} catch (error) {
			setError("root", { type: "server", message: "Failed to add answer" });
			return;
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col gap-5 "
		>
			{ANSWER_INPUT_FIELDS.map((input) => {
				const fieldName = input.name as keyof AnswerFormType;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{t(input.labelKey)}</p>

						<Input
							placeholder={t(input.placeholderKey)}
							{...register(fieldName)}
							input={input}
							currentValue={watch(fieldName) || ""}
							error={!!errors[fieldName]}
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
export default AnswerForm;
