"use client";
import { Comments } from "@/shared/types/supabase/supabase";
import EventComment from "../Comment";
import { useEffect, useState } from "react";
import { useUser } from "@/features/auth/hooks/useUser";
import Input from "@/shared/components/Input";
import { COMMENT_FORM_FIELDS } from "../../constants/form";
import { Button } from "@/shared/components/Button";
import { ValidateCommentForm } from "../../services/validateCommentForm";
import { createEventComment } from "../../services/supabase";
import { useParams } from "next/navigation";
import { createClient } from "@/shared/services/supabase/client";
import LoadingComponent from "@/shared/components/loadingModule";

interface Props {
	comments: Comments[];
}

const CommentsList = ({ comments }: Props) => {
	const [commentsList, setCommentsList] = useState(comments);
	const [newComment, setNewComment] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [commentError, setCommentError] = useState(false);
	const [user] = useUser();
	const [loading, setLoading] = useState(false);
	const params = useParams();

	const { id } = params;
	const supabase = createClient();

	useEffect(() => {
		setCommentsList(comments);
	}, [comments]);

	if (!user) return <LoadingComponent />;

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target as HTMLInputElement;
		if (newComment === "") {
			setErrorMessage("");
		}

		setNewComment(value);
		const result = ValidateCommentForm(e.target.value);
		if (!result.success) {
			setCommentError(true);
			setErrorMessage(result.errors[name]?.[0] ?? "");
			return;
		}

		setCommentError(false);
		setErrorMessage("");
	};

	const onSubmit = async () => {
		setLoading(true);
		const result = ValidateCommentForm(newComment);

		if (!result.success) {
			setCommentError(true);
			setErrorMessage(result.errors[newComment]?.[0] ?? "");
			setLoading(false);
		}

		try {
			const comment = await createEventComment(
				Number(id),
				newComment,
				user.id,
				supabase,
			);
			setCommentsList([...commentsList, comment]);
			setNewComment("");
		} catch (err) {
			setErrorMessage("There's been a problem. Try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<h2 className="text-xl font-bold">Comments</h2>
			{commentsList.length === 0 && <p>No comments yet</p>}
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
			<h3 className="font-semibold">New comment</h3>
			<div className="flex flex-col gap-2 items-end">
				<div className="relative w-full">
					<Input
						onChange={onChange}
						value={newComment}
						input={COMMENT_FORM_FIELDS}
						error={commentError}
					></Input>
				</div>
				{errorMessage && <p className="text-red-600">{errorMessage}</p>}
				<Button
					onClick={onSubmit}
					variant="primary"
					loading={loading}
				>
					Add comment
				</Button>
			</div>
		</div>
	);
};

export default CommentsList;
