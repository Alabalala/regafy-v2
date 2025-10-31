import { maxLength } from "zod";

export const LOGIN_FORM_INPUTS = [
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		required: true,
	},
];

export const LOGIN_FORM_INITIAL_DATA = {
	email: "",
	password: "",
};

export const SIGNUP_FORM_INPUTS = [
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
	},
	{
		name: "password",
		label: "Password",
		type: "password",
		required: true,
		maxLength: 30,
	},
];

export const SIGNUP_FORM_INITIAL_DATA = {
	email: "",
	password: "",
};

export const CHANGE_EMAIL_FORM_INPUTS = [
	{
		name: "email",
		label: "New email",
		type: "email",
		required: true,
		placeholder: "P. ej. youremail@email.com",
		fullWidth: true,
	},
	{
		name: "emailConfirmation",
		label: "Confirm your new email",
		type: "email",
		required: true,
		fullWidth: true,
	},
];

export const INITIAL_CHANGE_EMAIL_FORM_DATA = {
	email: "",
	emailConfirmation: "",
};

export const UPDATE_PASSWORD_FORM_INPUTS = [
	{
		name: "password",
		label: "New password",
		type: "password",
		required: true,
		maxLength: 30,
		placeholder: "P. ej. youremail@email.com",
		fullWidth: true,
	},
	{
		name: "passwordConfirmation",
		label: "Confirm your new password",
		type: "password",
		required: true,
		fullWidth: true,
	},
];

export const INITIAL_UPDATE_PASSWORD_FORM_DATA = {
	password: "",
	passwordConfirmation: "",
};
