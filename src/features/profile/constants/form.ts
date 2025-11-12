export const PROFILE_FORM_INPUTS = [
	{
		name: "image",
		labelKey: "profileImage",
		type: "file",
		required: true,
		placeholderKey: "profileImagePlaceholder",
	},
	{
		name: "name",
		labelKey: "name",
		type: "text",
		required: true,
		placeholderKey: "namePlaceholder",
		fullWidth: true,
	},
	{
		name: "userName",
		labelKey: "userName",
		type: "text",
		required: true,
		placeholderKey: "userNamePlaceholder",
		fullWidth: true,
	},
	{
		name: "birthday",
		labelKey: "birthday",
		placeholderKey: "birthdayPlaceholder",
		type: "date",
		required: true,
		fullWidth: true,
	},
];

export const INITIAL_PROFILE_FORM_DATA = {
	name: "",
	userName: "",
	birthday: new Date().toISOString().split("T")[0],
};
