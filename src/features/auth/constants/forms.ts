import { maxLength } from "zod";

export const LOGIN_FORM_INPUTS = [
	{
		name: "email",
		labelKey: "email",
		placeholderKey: "emailPlaceholder",
		type: "email",
		required: true,
	},
	{
		name: "password",
		labelKey: "password",
		placeholderKey: "passwordPlaceholder",
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
		labelKey: "email",
		placeholderKey: "emailPlaceholder",
		type: "email",
		required: true,
	},
	{
		name: "password",
		labelKey: "password",
		placeholderKey: "passwordPlaceholder",
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
		labelKey: "newEmail",
		type: "email",
		required: true,
		placeholderKey: "newEmailPlaceholder",
		fullWidth: true,
	},
	{
		name: "emailConfirmation",
		labelKey: "confirmNewEmail",
		placeholderKey: "newEmailPlaceholder",
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
		labelKey: "newPassword",
		type: "password",
		required: true,
		maxLength: 30,
		placeholderKey: "",
		fullWidth: true,
	},
	{
		name: "passwordConfirmation",
		labelKey: "confirmNewPassword",
		placeholderKey: "",
		type: "password",
		required: true,
		fullWidth: true,
	},
];

export const INITIAL_UPDATE_PASSWORD_FORM_DATA = {
	password: "",
	passwordConfirmation: "",
};
