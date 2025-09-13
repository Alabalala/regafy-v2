"use server";
import { createClient } from "@/shared/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { success } from "zod";

export async function login(formData: LoginFormTypes) {
	const supabase = await createClient();

	const { error, data } = await supabase.auth.signInWithPassword(formData);

	if (error) {
		let errorMessage = error.message;
		switch (error.message) {
			case "Invalid login credentials":
				errorMessage = "Login error: wrong email or password";
				break;
			case "Email not confirmed":
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

	const { error } = await supabase.auth.signInWithPassword(formData);

	if (error) {
		let errorMessage = error.message;
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
		return { success: false, error: errorMessage };
	}

	return { success: true };
}

export async function signOut() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.error("Signout Error:", error.message);
	}
}

export async function updatePassword(newPassword) {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) {
		console.log(error);
	}
	return data;
}

export async function deleteUser(userId) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.api.deleteUser(userId);

	if (error) {
		console.log(error);
	}

	const { error: deleteProfileError } = await supabase
		.from("profiles")
		.delete()
		.eq("id", userId);

	if (deleteProfileError) {
		console.log(deleteProfileError);
	}

	return data;
}
