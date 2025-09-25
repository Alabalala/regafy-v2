"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import {
	FILE_INPUT_INITIAL_VALUES,
	GIFT_FORM_FIELDS,
	GIFT_FORM_INITIAL_VALUES,
} from "@/features/gifts/constants/form";
import { giftFormScheme } from "@/features/gifts/services/giftFormScheme";
import { validateGiftForm } from "@/features/gifts/services/validateGiftForm";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { FieldErrors, FileInputDataType } from "@/shared/types/forms";
import { SingleGift } from "@/shared/types/supabase/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../../shared/components/Button";
import FileInput from "../../../../shared/components/FileInput";
import Input from "../../../../shared/components/Input";
import {
	addImageToGift,
	createGift,
	updateGift,
	uploadImageFile,
} from "../../services/supabase";
import { FormDataWithFileType, GiftFormData } from "../../types/form";
import StarRateInput from "../StarRateInput";

const GiftForm = ({ gift }: { gift?: SingleGift }) => {
	const toGiftFormData = (gift: SingleGift): GiftFormData => {
		return {
			title: gift.title,
			description: gift.description ?? "",
			price: gift.price?.toString() ?? "",
		};
	};
	const [formData, setFormData] = useState<GiftFormData>(
		GIFT_FORM_INITIAL_VALUES,
	);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const [errors, setErrors] = useState<FieldErrors>({});
	const [formError, setFormError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [rating, setRating] = useState<string>("1");
	const [user] = useUser();
	const params = useParams();
	const { id: friendId } = params;
	const { giftId } = params;
	const supabase = createClient();
	const router = useRouter();
	const normalisedFriendId = Array.isArray(friendId) ? friendId[0] : friendId;
	const normalisedGiftId = Array.isArray(giftId) ? giftId[0] : giftId;

	useEffect(() => {
		if (gift && gift.image_link) {
			setFile((prev) => ({
				...prev,
				preview: gift.image_link,
			}));
		}
	}, [gift]);

	useEffect(() => {
		if (gift?.rating) {
			setRating(gift.rating.toString());
		}
	}, [gift]);

	useEffect(() => {
		if (gift) {
			setFormData(toGiftFormData(gift));
		}
	}, [gift]);

	if (!user) {
		return <LoadingComponent />;
	}

	const onChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type, files } = e.target as HTMLInputElement;
		const normalisedValue = value.replace(/^ +/, "");
		let fieldValue: string | File | null = normalisedValue;

		if (type === "file" && files) {
			const file = files[0];
			fieldValue = file;

			setFile((prev) => ({
				...prev,
				file,
				preview: file ? URL.createObjectURL(file) : null,
			}));
		}

		setFormData({
			...formData,
			[name]: fieldValue,
		});

		const result = giftFormScheme
			.pick({ [name]: true })
			.safeParse({ [name]: fieldValue });

		setErrors((prev) => ({
			...prev,
			[name]: result.success
				? []
				: result.error.issues.map((issue) => issue.message),
		}));
	};

	const onSubmit = async () => {
		setIsLoading(true);
		const formDataWithFile: FormDataWithFileType = {
			...formData,
			image: file.file,
			rating: rating,
		};

		const validationResult = validateGiftForm(formDataWithFile);
		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setIsLoading(false);
			return;
		}

		setErrors({});

		const {
			image,
			rating: stringRating,
			...formDataWithoutFile
		} = formDataWithFile;
		const normalisedGiftData = {
			...formDataWithoutFile,
			added_by: user.id,
			profile_id: Array.isArray(friendId) ? friendId[0] : (friendId ?? user.id),
			rating: Number(stringRating),
		};

		try {
			if (normalisedGiftId) {
				await updateGift(normalisedGiftData, normalisedGiftId, supabase);
				if (image) {
					try {
						const newImageLink = await uploadImageFile(
							normalisedGiftId,
							image,
							supabase,
						);
						await addImageToGift(normalisedGiftId, newImageLink, supabase);
					} catch (uploadErr) {
						setFormError(
							"Something went wrong. Please try again: " +
								(uploadErr as Error).message,
						);
					}
				}
			} else {
				const newGift = await createGift(normalisedGiftData, supabase);
				if (newGift && image) {
					try {
						const newImageLink = await uploadImageFile(newGift.id, image, supabase);
						await addImageToGift(newGift.id, newImageLink, supabase);
					} catch (uploadErr) {
						setFormError(
							"Something went wrong. Please try again: " +
								(uploadErr as Error).message,
						);
					}
				}
			}
		} catch (err) {
			setFormError(
				"Something went wrong. Please try again: " + (err as Error).message,
			);
		} finally {
			setIsLoading(false);
			if (friendId) {
				router.push(getPath("Friend profile", normalisedFriendId));
			} else {
				router.push(getPath("Gifts"));
			}
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{GIFT_FORM_FIELDS.map((input) => (
				<div
					key={input.name}
					className={"flex flex-col gap-2"}
				>
					<p className={"font-bold"}>{input.label}</p>
					{input.type === "file" ? (
						<FileInput
							setFile={setFile}
							onChange={onChange}
							input={input}
							preview={file.preview ?? ""}
							error={!!errors[input.name]?.length}
						></FileInput>
					) : (
						<Input
							onChange={onChange}
							input={input}
							value={formData[input.name as keyof GiftFormData]}
							error={!!errors[input.name]?.length}
						/>
					)}
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}

			{!friendId && (
				<div className={"flex flex-col gap-2"}>
					<p className={"font-bold"}>Rate how much you want this gift</p>
					<StarRateInput
						rating={rating}
						setRating={setRating}
					/>
				</div>
			)}
			<div className={"flex justify-center"}>
				<Button
					onClick={onSubmit}
					disabled={isLoading}
					loading={isLoading}
					loadingText={"Saving..."}
				>
					Save gift
				</Button>
			</div>
			{formError && <div className="text-red-500 text-sm">{formError}</div>}
		</form>
	);
};

export default GiftForm;
