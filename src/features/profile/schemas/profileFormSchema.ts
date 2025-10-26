import z from "zod";

const today = new Date();
const eighteenYearsAgo = new Date(
	today.getFullYear() - 18,
	today.getMonth(),
	today.getDate(),
);

export const ProfileFormSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters" })
		.max(30, "Name must be at most 30 characters"),
	userName: z
		.string()
		.min(1, { message: "Required" })
		.max(20, "Username must be at most 20 characters")
		.regex(/^[a-z0-9]+$/, "Only lowercase letters and numbers, no spaces")
		.transform((val) => val.toLowerCase()),
	birthday: z.string().refine((val) => new Date(val) <= eighteenYearsAgo, {
		message: "You need to be over 18 to create an account.",
	}),
});
