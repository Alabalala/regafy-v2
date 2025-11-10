export interface LoginFormTypes {
	email: string;
	password: string;
}

export interface SignUpFormTypes {
	email: string;
	password: string;
}

export interface UpdateEmailFormTypes {
	email: string;
	emailConfirmation: string;
}

export interface UpdatePasswordFormTypes {
	password: string;
	passwordConfirmation: string;
}

export interface ForgotPasswordFormTypes {
	email: string;
}
