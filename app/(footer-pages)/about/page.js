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
				About{" "}
				<span
					className={`material-symbols-outlined size-32 align-bottom wght-700 ${
						darkMode ? "text-neutral-50" : "text-neutral-800"
					}`}
				>
					info
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
					A web application exclusive for Taydemon Swift{" "}
					<span className="text-xs">{"(and hitler)"}</span> Enjoyers. It's
					mostly a for fun project that lets you send an email to other users to
					notify them about any upcoming events.
				</p>
				<p className="my-4">
					This app was created to prevent my friends from making life progress
					by inviting them into random events, mostly drinking. By doing so, I
					can hinder their career plans while I silently build myself up.
					Honestly, I'm kinda losing hope in myself and starting to feel lazier
					day by day, so even If I end up as a failure{" "}
					{"(I kind of already am)"}, I can atleast drag them down with me.{" "}
					{"<3"}
				</p>
			</div>
		</main>
	);
}

export default AboutPage;
