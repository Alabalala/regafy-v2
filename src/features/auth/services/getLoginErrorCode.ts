export function getLoginErrorCode(error?: string) {
	if (!error) return "generic";

	switch (error) {
		case "invalid_credentials":
			return "logInForm.invalidCredentials";
		case "email_not_confirmed":
			return "logInForm.emailNotConfirmed";
		default:
			return "generic";
	}
}
