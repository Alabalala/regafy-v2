import z from "zod";

export const giftFormSchema = z.object({
	title: z.string().trim().min(3, "titleMin").max(30, "titleMax"),
	description: z
		.string()
		.trim()
		.min(3, "descriptionMin")
		.max(400, "descriptionMax")
		.optional()
		.or(z.literal("")),
	price: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && val !== "", {
			message: "priceInvalid",
		}),
	rating: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 5, {
			message: "ratingInvalid",
		}),
});
