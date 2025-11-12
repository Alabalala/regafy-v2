"use server";
import { Database } from "@/shared/types/database.types";
import { createClient } from "@/shared/services/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { LoginFormTypes, SignUpFormTypes } from "../types/forms";
import { getPath } from "@/shared/services/getPath";

export async function login(formData: LoginFormTypes) {
	const supabase = await createClient();

	const { error, data } = await supabase.auth.signInWithPassword(formData);

	if (error) {
		console.log(error);
		return { success: false, error: error.code };
	}

	return { success: true, user: data.user };
}

export async function sendPasswordRecoveryEmail(email: string) {
	const redirectTo =
		process.env.NODE_ENV === "development"
			? `http://localhost:3000`
			: `https://regafy.netlify.app`;
	const fullLink = redirectTo + getPath("Recover password");
	const supabase = await createClient();
	console.log(fullLink);
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: fullLink,
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
		console.log(error.code, ": ", error.message);
		return { success: false, error: error.code };
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
	const { error, data } = await supabase.auth.updateUser({
		email: newEmail,
	});
	if (error) throw error;

	return data;
}

export async function updatePassword(newPassword: string) {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) throw error;

	return true;
}

export async function recoverPassword(newPassword: string) {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) throw error;

	return data;
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
