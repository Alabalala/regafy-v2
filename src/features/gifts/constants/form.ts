import { maxLength } from "zod";

export const GIFT_FORM_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "text",
		required: true,
		placeholder: "E. g. Shoes",
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		required: false,
		placeholder: "Here you can write as much as you want",
	},
	{
		name: "price",
		label: "Price",
		type: "string",
		required: true,
		placeholder: "Help people know how much it will cost",
	},
	{
		name: "image",
		label: "Image",
		type: "file",
		required: false,
		accept: "image/*",
	},
];

export const GIFT_FORM_INITIAL_VALUES = {
	title: "",
	description: "",
	price: "",
	image: null,
	userId: "",
	createdById: "",
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
	},
];

export const ANSWER__INITIAL_VALUES = {
	answer: "",
};
