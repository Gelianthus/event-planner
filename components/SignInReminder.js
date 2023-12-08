import Link from "next/link";

function SignInReminder() {
	return (
		<div className="w-full sm:w-3/4 lg:w-4/5 mx-auto p-8 sm:px-0">
			<h1 className="text-center font-bold text-xl text-neutral-800 mb-2">
				Must be Signed in to continue
			</h1>
			<p className="text-center">
				Go to{" "}
				<Link
					className="underline text-neutral-600 hover:text-neutral-900 active:text-neutral-950"
					href={"/sign-in"}
				>
					sign in
				</Link>{" "}
				page.
			</p>
			<section className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center p-8  text-center gap-4 text-neutral-700">
				<div className="flex flex-col justify-center items-center p-8 h-full bg-gray-100">
					<span className="material-symbols-outlined align-middle size-40 mb-4 text-teal-500">
						person_book
					</span>
					<p>Signing in will automatically create an account for you.</p>
				</div>
				<div className="flex flex-col justify-center items-center p-8 h-full bg-gray-100">
					<span className="material-symbols-outlined align-middle size-40 mb-4 text-emerald-600">
						person_check
					</span>
					<p>Only certain emails are allowed to use this service.</p>
				</div>
			</section>
		</div>
	);
}

export default SignInReminder;
