import { maxLength } from "zod";

export const EVENT_FORM_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "text",
		required: true,
		maxLength: 30,
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		required: false,
		maxLength: 500,
	},
	{
		name: "date",
		label: "Date",
		type: "date",
		required: true,
	},
	{
		name: "image",
		label: "Event image",
		type: "file",
		required: false,
	},
];

export const INITIAL_EVENT_FORM_DATA = {
	title: "",
	description: "",
	date: "",
	created_by: "",
	event_image_link: "",
};

export const FILE_INPUT_INITIAL_VALUES = {
	file: null,
	preview: null,
};

export const COMMENT_FORM_FIELDS = {
	name: "newComment",
	type: "textarea",
	required: true,
	placeholder: "Write a comment",
	fullWidth: true,
	label: "Comment",
	maxLength: 300,
};
