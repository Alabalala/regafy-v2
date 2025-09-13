import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import SignUpForm from "@/features/auth/components/SignUpForm/SignUpForm";

export default function SignUpPage() {
	return (
		<div className="flex flex-col gap-5 p-5">
			<h1 className="text-xl font-bold">Create a new account</h1>
			<SignUpForm></SignUpForm>
		</div>
	);
}
