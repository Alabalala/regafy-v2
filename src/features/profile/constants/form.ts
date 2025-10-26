export const PROFILE_FORM_INPUTS = [
	{
		name: "image",
		label: "Profile image",
		type: "file",
		required: true,
	},
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
		placeholder: "E. g. John Doe",
		fullWidth: true,
	},
	{
		name: "userName",
		label: "User name",
		type: "text",
		required: true,
		placeholder: "E. g. johndoe",
		fullWidth: true,
	},
	{
		name: "birthday",
		label: "Your birthday",
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
