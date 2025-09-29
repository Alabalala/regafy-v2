import z from "zod";

export const EventImageSchema = z.object({
	file: z
		.file()
		.refine((file) => file.type.startsWith("image/"), "File must be an image")
		.max(5_000_000, "File must be less than 10MB"),
});
