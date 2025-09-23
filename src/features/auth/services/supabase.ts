"use server";
import { Database } from "@/shared/types/database.types";
import { createClient } from "@/shared/services/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { LoginFormTypes, SignUpFormTypes } from "../types/forms";

export async function login(formData: LoginFormTypes) {
	const supabase = await createClient();

	const { error, data } = await supabase.auth.signInWithPassword(formData);

	if (error) {
		let errorMessage = error.message;
		switch (error.code) {
			case "invalid_credentials":
				errorMessage = "Login error: wrong email or password";
				break;
			case "email_not_confirmed":
				errorMessage = "You need to confirm your email first";
				break;
			default:
				break;
		}
		return { success: false, error: errorMessage };
	}

	return { success: true, user: data.user };
}

export async function resetPassword(email: string) {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `https://regafy.netlify.app/restablecerContrasena`,
	});

	if (error) {
		console.error("Error resetting password:", error.message);
		return { success: false, error: error.message };
	}

	return { success: true, data };
}

export async function signup(formData: SignUpFormTypes) {
	const supabase = await createClient();

	const { error } = await supabase.auth.signUp(formData);

	if (error) {
		let errorMessage =
			"Error signing up. Try again later or check email isn't already registered";
		switch (error.code) {
			case "email_exists":
				errorMessage = "Email is already registered";
				break;
			case "email_not_confirmed":
				errorMessage = "You need to confirm your email first";
				break;
			case "user_already_exists":
				errorMessage = "User already exists";
				break;
			default:
				break;
		}
		console.log(error.code, ": ", error.message);
		return { success: false, error: errorMessage };
	}

	return { success: true };
}

export async function resendConfirmationEmail(email: string) {
	const supabase = await createClient();
	const { error } = await supabase.auth.resend({
		type: "signup",
		email: email,
	});
	if (error) {
		return { success: false, error: "Error resending confirmation email" };
	}
	return { success: true };
}

export async function signOut() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		return { success: false, error: "Error logging out" };
	}
}

export async function updateEmail(newEmail: string) {
	const supabase = await createClient();
	const { error } = await supabase.auth.updateUser({
		email: newEmail,
	});
	if (error) throw error;
}

export async function updatePassword(newPassword: string) {
	const supabase = await createClient();
	const { error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) throw error;
}

// export async function deleteUser(userId) {
// 	const supabase = await createClient();

// 	const { data, error } = await supabase.auth.api.deleteUser(userId);

// 	if (error) {
// 		console.log(error);
// 	}

// 	const { error: deleteProfileError } = await supabase
// 		.from("profiles")
// 		.delete()
// 		.eq("id", userId);

// 	if (deleteProfileError) {
// 		console.log(deleteProfileError);
// 	}

// 	return data;
// }

export async function getCurrentUser(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase.auth.getUser();

	if (error) throw error;

	const user = data.user;
	return user;
}
