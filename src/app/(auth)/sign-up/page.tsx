import LoginForm from "@/features/auth/components/LoginForm/LoginForm";
import SingUpForm from "@/features/auth/components/SignUpForm/SingUpForm";

export default function SignUpPage() {
	return (
		<div className="flex flex-col gap-5 p-5">
			<h1 className="text-xl font-bold">Create a new account</h1>
			<SingUpForm></SingUpForm>
		</div>
	);
}
