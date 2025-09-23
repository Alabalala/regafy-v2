import { Profile } from "./supabase.types";

export type ProfileFormData = Omit<
	Profile,
	"created_at" | "id" | "profileImage"
>;
