"use client";

import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({ subsets: ["latin"], weight: ["400"] });

function AboutPage() {
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	return (
		<main className={`${darkMode ? "bg-gray-700" : "bg-white"} flex-grow px-4`}>
			<div className="flex flex-row gap-4 justify-end items-center p-4">
				<Link
					title="Homepage"
					href={"/home"}
					className={`${
						darkMode
							? "bg-gray-900 text-neutral-50"
							: "bg-gray-100 text-neutral-800"
					} py-2 px-4 rounded hover:bg-sky-500 hover:text-neutral-100 active:bg-sky-600 active:text-neutral-100`}
				>
					<span className="material-symbols-outlined size-20 align-middle wght-600">
						home
					</span>
				</Link>
				<button
					title="Dark Mode Toggle"
					onClick={() => setDarkMode((prevState) => !prevState)}
					className={`${
						darkMode
							? "bg-gray-900 text-neutral-50"
							: "bg-gray-100 text-neutral-800"
					} py-2 px-4 rounded hover:bg-gray-600 hover:text-neutral-100 active:bg-gray-700 active:text-neutral-100`}
				>
					<span className="material-symbols-outlined size-20 align-middle wght-600">
						dark_mode
					</span>
				</button>
			</div>
			<h1
				className={`${
					russo_one.className
				} text-center text-2xl font-bold mt-8 mb-4 ${
					darkMode ? "text-amber-500" : "text-emerald-600"
				}`}
			>
				Privacy{" "}
				<span
					className={`material-symbols-outlined size-32 align-bottom wght-700 ${
						darkMode ? "text-neutral-50" : "text-neutral-800"
					}`}
				>
					lock
				</span>
			</h1>
			<div
				className={`mx-auto w-full sm:w-4/5 lg:w-3/5 my-8 ${
					darkMode
						? "bg-gray-900 text-neutral-50"
						: "bg-gray-100 text-neutral-800"
				}  p-4 rounded`}
			>
				<p className="my-4">
					I don't respect your privacy, I'll sell your data to crypto bros and
					china government. I'll also randomly sign your email up in sketchy
					gambling sites.
				</p>
				<p className="my-4">
					Of course you can just delete your account, I'll write a code that
					would delete your email from the database but you'll also be signed up
					to as many newsletter as possible as a farewell gift.
				</p>
				<p className="my-4">
					And if you don't learn your lesson and somehow decide to create an
					account again, I'll sign your email up to porn sites.
				</p>
			</div>
		</main>
	);
}

export default AboutPage;
