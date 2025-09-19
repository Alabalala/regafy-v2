import { tv } from "tailwind-variants";

export type variant = "primary" | "secondary" | "delete";

const buttonCommonStyle = "flex items-center justify-center";

export const buttonVariants = tv({
	base:
		"px-2 py-1 text-center rounded-md border-2 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-gray-400 disabled:text-black disabled:opacity-60 disabled:dark:bg-gray-600 disabled:dark:text-white",

	variants: {
		variant: {
			primary: `bg-accent text-on-accent 
         hover:bg-accent-50 hover:text-on-accent 
         active:bg-accent-100 active:text-on-accent
         dark:bg-accent-dark dark:text-on-accent-dark
         dark:hover:bg-accent-dark-50 dark:hover:text-on-accent-dark
         dark:active:bg-accent-dark-100 dark:active:text-on-accent-dark
		
		 `,

			secondary: `bg-secondary text-on-secondary 
           hover:bg-secondary-50 hover:text-on-secondary 
           active:bg-secondary-100 active:text-on-secondary
           dark:bg-secondary-dark dark:text-on-secondary-dark
           dark:hover:bg-secondary-dark-50 dark:hover:text-on-secondary-dark
           dark:active:bg-secondary-dark-100 dark:active:text-on-secondary-dark`,

			delete: `bg-red-600 text-white 
        hover:bg-red-700 hover:border-white 
        active:bg-red-800 active:border-white
        dark:bg-red-500 dark:text-white
        dark:hover:bg-red-600 dark:hover:border-white
        dark:active:bg-red-700 dark:active:border-white`,
		},

		floating: {
			true:
				"sticky bottom-0 right-0 ml-auto self-end justify-self-end z-10 shadow-md hover:shadow-lg",
		},

		size: {
			default: "h-10 w-52 text-base",
			mobile: "h-auto max-w-52 text-sm",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "default",
		floating: false,
	},
});
