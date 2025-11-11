import z from "zod";

export const imageSchema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file.type.startsWith("image/"), "fileMustBeImage")
		.refine((file) => file.size <= 5_000_000, "fileMaxSize5MB"),
});
