"use client";
import { useUser } from "@/features/auth/hooks/useUser";
import {
	FILE_INPUT_INITIAL_VALUES,
	GIFT_FORM_FIELDS,
	GIFT_FORM_INITIAL_VALUES,
} from "@/features/gifts/constants/form";
import { giftFormScheme } from "@/features/gifts/services/giftFormScheme";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { FileInputDataType } from "@/shared/types/forms";
import { SingleGift } from "@/shared/types/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../shared/components/Button";
import FileInput from "../../../../shared/components/FileInput";
import Input from "../../../../shared/components/Input";
import { createGiftAction } from "../../actions/createGift";
import { updateGiftAction } from "../../actions/updateGifts";
import { addImageToGift } from "../../services/supabase";
import { FormPayloadType, GiftFormData } from "../../types/form";
import StarRateInput from "../StarRateInput";
import { validateImage } from "@/shared/services/validateImage";
import { uploadImageFile } from "@/shared/services/supabase/globals";

interface Props {
	gift?: SingleGift;
	type: "create" | "update";
}

const GiftForm = ({ gift, type }: Props) => {
	const toGiftFormData = (gift: SingleGift): GiftFormData => {
		return {
			title: gift.title,
			description: gift.description ?? "",
			price: gift.price?.toString() ?? "",
			rating: gift.rating.toString() ?? "1",
		};
	};

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<GiftFormData>({
		resolver: zodResolver(giftFormScheme),
		defaultValues: gift ? toGiftFormData(gift) : GIFT_FORM_INITIAL_VALUES,
	});

	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const [user] = useUser();
	const params = useParams();
	const { id: friendId } = params;
	const supabase = createClient();
	const router = useRouter();
	const { setMessage } = useToastStore();
	const [fileError, setFileError] = useState<string>("");
	useEffect(() => {
		if (gift && gift.image_link) {
			setFile((prev) => ({
				...prev,
				preview: gift.image_link,
			}));
		}
	}, [gift]);

	if (!user) {
		return <LoadingComponent />;
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const file = files?.[0] ?? null;
		const result = validateImage(file!);

		setFileError("");

		if (!file) {
			setFile({ file: null, preview: null });
			return;
		}
		if (!result.success) {
			setFileError(result.errors.file?.[0] ?? "");
			return;
		}

		setFile({
			file,
			preview: file ? URL.createObjectURL(file) : null,
		});
	};

	const onSubmit = async (data: GiftFormData) => {
		const formPayload: FormPayloadType = {
			...data,
			added_by: user.id,
			profile_id: Array.isArray(friendId) ? friendId[0] : (friendId ?? user.id),
		};

		if (type === "create") {
			const createResult = await createGiftAction(formPayload);
			try {
				if (createResult.success && createResult.data?.id) {
					if (file.file) {
						const img = await uploadImageFile(
							createResult.data.id,
							file.file,
							supabase,
							"gift-images",
						);
						await addImageToGift(createResult.data.id, img, supabase);
					}
					setMessage("Gift created!");
					const path = friendId
						? getPath("Profile", String(friendId))
						: getPath("Gifts");

					router.push(path);
				}
			} catch (err) {
				setError("root", { type: "server", message: "Failed to create gift" });
			}
		}

		if (type === "update" && gift) {
			const updateResult = await updateGiftAction(formPayload, gift.id);
			if (updateResult.success) {
				if (file.file) {
					const img = await uploadImageFile(
						gift.id,
						file.file!,
						supabase,
						"gift-images",
					);
					await addImageToGift(gift.id, img, supabase);
				}
				setMessage("Gift updated!");
				router.push(getPath("Gift", String(gift.id)));
			} else {
				setError("root", {
					type: "server",
					message: updateResult.errors?.root?.[0] ?? "",
				});
			}
		}
	};

	return (
		<form
			className={"flex flex-col gap-4"}
			onSubmit={handleSubmit(onSubmit)}
		>
			{GIFT_FORM_FIELDS.map((input) => {
				const fieldName = input.name as keyof GiftFormData;
				return (
					<div
						key={fieldName}
						className={"flex flex-col gap-2"}
					>
						<p className={"font-bold"}>{input.label}</p>

						{input.type === "file" ? (
							<div className="flex flex-col gap-2">
								<FileInput
									onChange={handleFileChange}
									setFile={setFile}
									input={input}
									preview={file.preview ?? ""}
									error={!!fileError}
								/>
								{fileError && <div className="text-red-500 text-sm">{fileError}</div>}
							</div>
						) : (
							<Input
								{...register(fieldName)}
								input={input}
								currentValue={watch(fieldName) || ""}
								error={!!errors[fieldName]}
							/>
						)}
						<div className="text-red-500 text-sm">{errors[fieldName]?.message}</div>
					</div>
				);
			})}

			{!friendId && (
				<div className={"flex flex-col gap-2"}>
					<p className={"font-bold"}>Rate how much you want this gift</p>
					<StarRateInput
						watch={watch}
						setValue={setValue}
					/>
				</div>
			)}
			{errors.root && (
				<div className="text-red-500 text-sm">{errors.root.message}</div>
			)}
			<div className={"flex justify-center"}>
				<Button
					type="submit"
					disabled={isSubmitting}
					loading={isSubmitting}
					loadingText={"Saving..."}
				>
					Save event
				</Button>
			</div>
		</form>
	);
};

export default GiftForm;
