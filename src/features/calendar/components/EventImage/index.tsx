"use client";
import EditSVG from "@/shared/components/SVGs/EditSVG";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { addImageToEvent } from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";

import { getOptimizedImageUrl } from "@/shared/services/getOptimisedImageUrl";
import { useToastStore } from "@/shared/stores/toastStore";
import { validateImage } from "@/shared/services/validateImage";
import { uploadImageFile } from "@/shared/services/supabase/globals";

interface Props {
	eventImage?: string | null;
	eventId: number;
	canEdit?: boolean;
	small?: boolean;
	xs?: boolean;
}

const EventImage = ({
	eventImage,
	eventId,
	canEdit = false,
	small,
	xs = false,
}: Props) => {
	const supabase = createClient();
	const [image, setImage] = useState("");
	const { setMessage } = useToastStore();
	useEffect(() => {
		if (eventImage) {
			setImage(eventImage);
		}
	}, [eventImage]);

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}

		const file = e.target.files[0];
		const result = await validateImage(file);

		if (result.success) {
			try {
				const imageLink = await uploadImageFile(
					eventId,
					file,
					supabase,
					"event-images",
				);
				await addImageToEvent(eventId, imageLink, supabase);
				setImage(imageLink);
				setMessage("Event image updated!");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<label
			className="relative"
			htmlFor="eventImage"
		>
			<input
				type="file"
				name="eventImage"
				id="eventImage"
				accept="image/*"
				onChange={onChange}
				className="sr-only"
			></input>
			{canEdit && (
				<div className="absolute z-10 bottom-0 right-0 cursor-pointer bg-secondary p-1 rounded-full border-2">
					<EditSVG
						width="15"
						height="15"
					></EditSVG>
				</div>
			)}
			<div
				className={`relative overflow-clip ${
					xs ? "w-6 h-6" : small ? "w-10 h-10" : "w-20 h-20"
				} bg-background-100 dark:bg-background-dark-100 rounded-full border-2`}
			>
				<Image
					alt="Profile image"
					src={
						image ? `${getOptimizedImageUrl(image)}` : "/illustrations/caddy.webp"
					}
					fill
					sizes="100px"
					className="object-cover object-center rounded-full"
				></Image>
			</div>
		</label>
	);
};

export default EventImage;
