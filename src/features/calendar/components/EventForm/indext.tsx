"use client";

import { useUser } from "@/features/auth/hooks/useUser";
import FriendsList from "@/features/friends/components/friendsList";
import FriendsPanel from "@/features/friends/components/FriendsPanel";
import { Profile } from "@/features/profile/types/supabase.types";
import { Button } from "@/shared/components/Button";
import FileInput from "@/shared/components/FileInput";
import Input from "@/shared/components/Input";
import LoadingComponent from "@/shared/components/loadingModule";
import { getPath } from "@/shared/services/getPath";
import { createClient } from "@/shared/services/supabase/client";
import { useToastStore } from "@/shared/stores/toastStore";
import { FileInputDataType } from "@/shared/types/forms";
import { Event } from "@/shared/types/supabase/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createEventAction } from "../../actions/createEvent";
import { updateEventAction } from "../../actions/updateEvent";
import {
	EVENT_FORM_FIELDS,
	FILE_INPUT_INITIAL_VALUES,
	INITIAL_EVENT_FORM_DATA,
} from "../../constants/form";
import { eventFormSchema } from "../../schemas/eventFormSchema";
import { ValidateEventImage } from "../../services/validateEventImage";
import { EventFormData, EventFormPayload } from "../../types/events";

interface Props {
	event?: Event;
	friends: Profile[];
	type: "create" | "update";
}

const EventForm = ({ event, type, friends }: Props) => {
	const toEventFormData = (event: Event): EventFormData => {
		return {
			title: event.title,
			description: event.description,
			date: event.date,
		};
	};

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm<EventFormData>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: event ? toEventFormData(event) : INITIAL_EVENT_FORM_DATA,
	});

	const [guests, setGuests] = useState<Profile[]>([]);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);
	const [fileError, setFileError] = useState<string>("");
	const router = useRouter();
	const [user] = useUser();
	const searchParams = useSearchParams();
	const date = searchParams.get("date");
	const { setMessage } = useToastStore();

	useEffect(() => {
		if (event && event.event_image_link) {
			setFile((prev) => ({
				...prev,
				preview: event.event_image_link,
			}));
		}
	}, [event]);

	useEffect(() => {
		if (event) {
			setGuests(event.guests);
		}
	}, [event]);

	useEffect(() => {
		if (date) {
			setValue("date", date);
		}
	}, [date, setValue]);

	useEffect(() => {
		if (event && user && event.created_by !== user.id) {
			router.push(getPath("Event", String(event.id)));
		}
	}, [event, user, router]);

	if (!user) return <LoadingComponent />;

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const file = files?.[0] ?? null;
		const result = ValidateEventImage(file!);

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

	const onSubmit = async (data: EventFormData) => {
		const formPayload: EventFormPayload = {
			...data,
			guests: guests.map((guest) => guest.id),
			created_by: user.id,
		};

		if (type === "create") {
			const createResult = await createEventAction(formPayload);

			if (createResult.success) {
				setMessage("Event created!");
				router.push(getPath("Event", String(createResult.data?.id)));
			} else {
				setError("root", {
					type: "server",
					message: createResult.errors?.root?.[0] ?? "",
				});
			}
		}

		if (type === "update" && event) {
			const updateResult = await updateEventAction(
				formPayload,
				event.guests,
				event.id,
			);
			if (updateResult.success) {
				setMessage("Event updated!");
				router.push(getPath("Event", String(event.id)));
			} else {
				setError("root", {
					type: "server",
					message: updateResult.errors?.root?.[0] ?? "",
				});
			}
		}
	};

	const onFriendClick = (guest: Profile) => {
		setGuests((prev) =>
			prev.some((g) => g.id === guest.id)
				? prev.filter((g) => g.id !== guest.id)
				: [...prev, guest],
		);
	};

	return (
		<form
			className={"flex flex-col gap-4"}
			onSubmit={handleSubmit(onSubmit)}
		>
			{EVENT_FORM_FIELDS.map((input) => {
				const fieldName = input.name as keyof EventFormData;
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
			<FriendsPanel
				type="event"
				friends={friends}
				onClick={onFriendClick}
				guests={guests}
			></FriendsPanel>
			<div>
				<p className={"text-xl font-bold"}>Guests</p>
				<FriendsList
					friends={guests}
					onClick={onFriendClick}
					guests={guests}
					type="event"
				></FriendsList>
			</div>
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

export default EventForm;
