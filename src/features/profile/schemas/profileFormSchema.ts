import z from "zod";

const today = new Date();
const eighteenYearsAgo = new Date(
	today.getFullYear() - 18,
	today.getMonth(),
	today.getDate(),
);

export const ProfileFormSchema = z.object({
	name: z.string().min(3, { message: "nameTooShort" }).max(30, "nameTooLong"),
	userName: z
		.string()
		.min(3, { message: "usernameTooShort" })
		.max(20, "usernameTooLong")
		.regex(/^[a-z0-9]+$/, "usernameInvalidCharacters")
		.transform((val) => val.toLowerCase()),
	birthday: z.string().refine((val) => new Date(val) <= eighteenYearsAgo, {
		message: "ageTooYoung",
	}),
});
