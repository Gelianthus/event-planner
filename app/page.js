"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { setUser } = useContext(UserContext);

	useEffect(() => {
		async function getUser() {
			try {
				const res = await fetch(
					`/api/users/user?useremail=${session?.user.email}`
				);
				if (res.ok) {
					const data = await res.json();
					setUser(data.user);
					router.push("/home");
				}
			} catch (error) {
				console.error(error);
			}
		}
		if (session) {
			getUser();
		}
		console.log(status);
	}, [status]);

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-gray-100">
				<div className="flex flex-row gap-2 items-center w-fit mx-auto my-4">
					<Image
						src={"/sunflower_logo.webp"}
						alt="a sunflower icon that has the text Gelianthus at the center"
						height={120}
						width={120}
						className="max-w-full aspect-square object-cover object-center rounded-full"
						style={{ minWidth: "64px", maxWidth: "72px" }}
					/>

					<h1 className={`${russo_one.className} font-bold text-2xl`}>
						<span className="text-emerald-500">Gelianthus</span> Tries NextJS
					</h1>
				</div>
			</header>
			<main className="flex-grow">
				<section className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center p-8  text-center gap-4 text-neutral-700">
					<div className="flex flex-col justify-center items-center p-8 h-full bg-gray-50 border rounded">
						<span className="material-symbols-outlined align-middle size-40 mb-4 text-sky-500">
							forward_to_inbox
						</span>
						<p>Send an invite to other members via email.</p>
					</div>
					<div className="flex flex-col justify-center items-center p-8 h-full bg-gray-50 border rounded">
						<span className="material-symbols-outlined align-middle size-40 mb-4 text-blue-500">
							mark_email_unread
						</span>
						<p>Receive emails for upcoming events.</p>
					</div>
				</section>
				<button
					className="font-semibold flex flex-row gap-2 items-center p-4 rounded  mx-auto bg-sky-500 text-neutral-50 hover:bg-sky-600 active:bg-sky-700 "
					onClick={() => signIn("google")}
				>
					<span>Sign in</span>
					<span className="material-symbols-outlined align-bottom">login</span>
				</button>
			</main>
			<Footer />
		</div>
	);
}
