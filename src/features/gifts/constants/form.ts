import { maxLength } from "zod";

export const GIFT_FORM_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "text",
		required: true,
		placeholder: "E. g. Shoes",
		maxLength: 30,
		fullWidth: true,
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		required: false,
		placeholder: "Here you can write as much as you want",
		maxLength: 400,
		fullWidth: true,
	},
	{
		name: "price",
		label: "Price",
		type: "string",
		required: true,
		placeholder: "Help people know how much it will cost",
		fullWidth: true,
	},
	{
		name: "image",
		label: "Image",
		type: "file",
		required: false,
		accept: "image/*",
		fullWidth: true,
	},
];

export const GIFT_FORM_INITIAL_VALUES = {
	title: "",
	description: "",
	price: "",
	image: null,
	profile_id: "",
	added_by: "",
};

export const FILE_INPUT_INITIAL_VALUES = {
	file: null,
	preview: null,
};

export const QUESTION_INPUT_FIELDS = [
	{
		text: "",
		name: "question",
		type: "text",
		required: true,
		placeholder: "Your question here",
		fullWidth: true,
		maxLength: 100,
	},
];

export const QUESTION_INITIAL_VALUES = {
	answer: "",
};

export const ANSWER_INPUT_FIELDS = [
	{
		text: "",
		name: "answer",
		type: "text",
		required: true,
		placeholder: "Your answer here",
		fullWidth: true,
		maxLength: 100,
	},
];

export const ANSWER__INITIAL_VALUES = {
	answer: "",
};
