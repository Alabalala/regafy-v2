export function getSignupErrorCode(error?: string) {
	if (!error) return "generic";

	switch (error) {
		case "email_exists":
		case "user_already_exists":
			return "signUpForm.emailExists";
		default:
			return "generic";
	}
}
