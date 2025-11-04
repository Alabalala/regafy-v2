export const GIFT_FORM_FIELDS = [
	{
		name: "title",
		labelKey: "title",
		type: "text",
		required: true,
		placeholderKey: "titlePlaceholder",
		maxLength: 30,
		fullWidth: true,
	},
	{
		name: "description",
		labelKey: "description",
		type: "textarea",
		required: false,
		placeholderKey: "descriptionPlaceholder",
		maxLength: 400,
		fullWidth: true,
	},
	{
		name: "price",
		labelKey: "price",
		type: "string",
		required: true,
		placeholderKey: "pricePlaceholder",
		fullWidth: true,
	},
	{
		name: "image",
		labelKey: "image",
		type: "file",
		required: false,
		placeholderKey: "",
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
		labelKey: "questionLabel",
		text: "",
		name: "question",
		type: "text",
		required: true,
		placeholderKey: "questionPlaceholder",
		fullWidth: true,
		maxLength: 100,
	},
];

export const QUESTION_INITIAL_VALUES = {
	question: "",
};

export const ANSWER_INPUT_FIELDS = [
	{
		labelKey: "yourAnswer",
		text: "",
		name: "answer",
		type: "text",
		required: true,
		placeholderKey: "answerPlaceholder",
		fullWidth: true,
		maxLength: 100,
	},
];

export const ANSWER_INITIAL_VALUES = {
	answer: "",
};
