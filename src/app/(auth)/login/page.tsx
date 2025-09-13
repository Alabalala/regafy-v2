import LoginForm from "@/features/auth/components/LoginForm/LoginForm";

export default function LoginPage() {
	return (
		<div className="flex flex-col gap-5 p-5">
			<h1 className="text-xl font-bold">Log in with your account</h1>
			<LoginForm></LoginForm>
		</div>
	);
}
