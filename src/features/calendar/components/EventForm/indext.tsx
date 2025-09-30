"use client";

import { useEffect, useState } from "react";
import { EventFormData, EventFormPayload } from "../../types/events";
import {
	EVENT_FORM_FIELDS,
	FILE_INPUT_INITIAL_VALUES,
	INITIAL_EVENT_FORM_DATA,
} from "../../constants/form";
import { FieldErrors, FileInputDataType } from "@/shared/types/forms";
import FileInput from "@/shared/components/FileInput";
import Input from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import FriendsList from "@/features/friends/components/friendsList";
import { Profile } from "@/features/profile/types/supabase.types";
import FriendsPanel from "@/features/friends/components/FriendsPanel";
import { eventFormSchema } from "../../schemas/eventFormSchema";
import { Event } from "@/shared/types/supabase/supabase";
import { validateEventForm } from "../../services/validateEventForm";
import {
	addImageToEvent,
	createEvent,
	updateEvent,
	uploadEventImageFile,
} from "../../services/supabase";
import { createClient } from "@/shared/services/supabase/client";
import { useRouter } from "next/navigation";
import { getPath } from "@/shared/services/getPath";
import { useUser } from "@/features/auth/hooks/useUser";
import LoadingComponent from "@/shared/components/loadingModule";

interface Props {
	event?: Event;
	friends: Profile[];
}

const EventForm = ({ event, friends }: Props) => {
	const toEventFormData = (event: Event): EventFormData => {
		return {
			title: event.title,
			description: event.description,
			date: event.date,
			created_by: event.created_by,
		};
	};
	const [formData, setFormData] = useState<EventFormData>(
		INITIAL_EVENT_FORM_DATA,
	);
	const [guests, setGuests] = useState<Profile[]>([]);
	const [file, setFile] = useState<FileInputDataType>(FILE_INPUT_INITIAL_VALUES);

	const [formError, setFormError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FieldErrors>({});
	const supabase = createClient();
	const router = useRouter();
	const [user] = useUser();

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
			setFormData(toEventFormData(event));
			setGuests(event.guests);
		}
	}, [event]);

	if (!user) return <LoadingComponent />;

	if (event && event.created_by !== user.id) {
		router.push(getPath("Event", String(event.id)));
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
			const file = files[0] ?? null;
			fieldValue = file;

			setFile((prev) => ({
				...prev,
				file,
				preview: file ? URL.createObjectURL(file) : null,
			}));
		}

		setErrors({ ...errors, [name]: [] });
		setFormData({ ...formData, [name]: fieldValue });

		const result = eventFormSchema
			.pick({ [name]: true })
			.safeParse({ [name]: fieldValue });
		if (!result.success) {
			setErrors({
				...errors,
				[name]: result.error.issues.map((issue) => issue.message),
			});
			return;
		}
	};

	const onSubmit = async () => {
		setIsLoading(true);
		const formPayload: EventFormPayload = {
			...formData,
			image: file.file,
			guests: guests.map((guest) => guest.id),
			created_by: user.id,
		};

		const validationResult = validateEventForm(formPayload);
		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setFormError("Some fields are invalid");
			setIsLoading(false);
			return;
		}
		setErrors({});
		setFormError("");

		try {
			if (event) {
				const deletedGuests = event.guests
					.filter((g) => !guests.some((guest) => guest.id === g.id))
					.map((g) => g.id);
				const newGuests = guests
					.filter((guest) => !event.guests.some((g) => g.id === guest.id))
					.map((guest) => guest.id);
				const {
					image: event_image_link,
					guests: formGuests,
					...eventWithoutImage
				} = formPayload;
				await updateEvent(
					event.id,
					eventWithoutImage,
					newGuests,
					deletedGuests,
					supabase,
				);
				if (file.file) {
					const imageLink = await uploadEventImageFile(
						event.id,
						file.file,
						supabase,
					);
					if (imageLink) {
						addImageToEvent(event.id, imageLink, supabase);
					}
				}
				router.push(getPath("Event", String(event.id)));
			} else {
				const newEvent = await createEvent(formPayload, supabase);
				if (newEvent && file.file) {
					const imageLink = await uploadEventImageFile(
						newEvent.id,
						file.file,
						supabase,
					);
					if (imageLink) {
						addImageToEvent(newEvent.id, imageLink, supabase);
					}
				}
				router.push(getPath("Event", String(newEvent.id)));
			}
		} catch (err) {
			console.log(err);
			setFormError((err as Error).message);
			setIsLoading(false);
			return;
		}
	};

	const onFriendClick = (guest: Profile) => {
		if (guests.includes(guest)) {
			setGuests((guests) => guests.filter((g) => g.id !== guest.id));
			return;
		} else {
			setGuests((guests) => [...guests, guest]);
		}
	};

	return (
		<form className={"flex flex-col gap-4"}>
			{EVENT_FORM_FIELDS.map((input) => (
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
							value={formData[input.name as keyof EventFormData]}
							error={!!errors[input.name]?.length}
						/>
					)}
					<div className="text-red-500 text-sm">{errors[input.name]?.[0]}</div>
				</div>
			))}
			<FriendsPanel
				isEvent
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
					isEvent
				></FriendsList>
			</div>
			{formError && <div className="text-red-500 text-sm">{formError}</div>}
			<div className={"flex justify-center"}>
				<Button
					onClick={onSubmit}
					disabled={isLoading}
					loading={isLoading}
					loadingText={"Saving..."}
				>
					Save event
				</Button>
			</div>
		</form>
	);
};

export default EventForm;
