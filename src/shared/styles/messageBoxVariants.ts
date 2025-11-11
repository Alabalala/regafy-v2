import { tv } from "tailwind-variants";

export type messageBoxVariantType = "error" | "success" | "warning";

export const messageBoxVariants = tv({
	base: "border p-2",
	variants: {
		variant: {
			error:
				"bg-red-100 border-red-400 dark:bg-red-900 dark:text-red-50 text-red-700",
			success:
				"bg-emerald-100 border-emerald-400 dark:bg-emerald-900 dark:text-emerald-50 text-emerald-800",
			warning:
				" bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:text-yellow-50 text-yellow-700",
		},
		size: {
			default: "text-sm",
			small: "text-xs",
			bold: "text-sm font-bold",
		},
	},
	defaultVariants: {
		variant: "error",
		size: "default",
	},
});
