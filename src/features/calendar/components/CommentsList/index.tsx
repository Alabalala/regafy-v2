"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import { Button } from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import LoadingComponent from "@/shared/components/loadingModule";
import { Comments } from "@/shared/types/supabase/supabase";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createCommentAction } from "../../actions/createComment";
import { COMMENT_FORM_FIELDS } from "../../constants/form";
import EventComment from "../Comment";

interface Props {
	comments: Comments[];
	guestIds: string[];
}

const CommentsList = ({ comments, guestIds }: Props) => {
	const [commentsList, setCommentsList] = useState(comments);
	const {
		register,
		watch,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: { comment: "" },
	});
	const comment = watch("comment");
	const [errorMessage, setErrorMessage] = useState("");

	const [user] = useUser();
	const params = useParams();

	const { id } = params;
	const t = useTranslations("events.event");
	const tButtons = useTranslations("buttons");
	const tErrors = useTranslations("errors");

	useEffect(() => {
		setCommentsList(comments);
	}, [comments]);

	if (!user) return <LoadingComponent />;

	const onSubmit = async (data: { comment: string }) => {
		const { comment } = data;
		try {
			const commentResult = await createCommentAction(
				comment,
				Number(id),
				user.id,
				guestIds,
			);
			if (commentResult.data) {
				setCommentsList([...commentsList, commentResult.data]);
				reset();
			}
		} catch (err) {
			setErrorMessage(tErrors("generic"));
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<h2 className="text-xl font-bold">{t("comments")}</h2>
			{commentsList.length === 0 && <p>{t("noComments")}</p>}
			<div className="flex flex-col gap-5">
				{commentsList.map((comment) => (
					<EventComment
						messageTime={comment.created_at}
						key={comment.id}
						message={comment.content}
						profileImage={comment.profiles.profileImage}
						profileName={comment.profiles.name}
						isOwner={comment.profiles.id === user?.id}
					/>
				))}
			</div>
			<h3 className="font-semibold">{t("formComment.comment")}</h3>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-2 items-end"
			>
				<div className="relative w-full">
					<Input
						currentValue={comment}
						error={!!errors.comment}
						placeholder={t("formComment.commentPlaceholder")}
						{...register("comment")}
						input={COMMENT_FORM_FIELDS}
					></Input>
				</div>
				{errorMessage && <p className="text-red-600">{errorMessage}</p>}
				<Button
					type="submit"
					variant="primary"
					loading={isSubmitting}
				>
					{tButtons("addComment")}
				</Button>
			</form>
		</div>
	);
};

export default CommentsList;
