export const GIFT_FORM_FIELDS = [
	{
		name: "title",
		label: "Title",
		type: "text",
		required: true,
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
		required: false,
	},
	{
		name: "image",
		label: "Image",
		type: "file",
		required: false,
	},
];

export const GIFT_FORM_INITIAL_VALUES = {
	title: "",
	description: "",
	image: "",
};
