"use client";

import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({ subsets: ["latin"], weight: ["400"] });

function TermsAndConditionsPage() {
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
				Terms and Conditions{" "}
				<span
					className={`material-symbols-outlined size-32 align-bottom wght-700 ${
						darkMode ? "text-neutral-50" : "text-neutral-800"
					}`}
				>
					contract
				</span>
			</h1>
			<div
				className={`mx-auto w-full sm:w-4/5 lg:w-3/5 my-8 ${
					darkMode
						? "bg-gray-900 text-neutral-50"
						: "bg-gray-100 text-neutral-800"
				}  p-4 rounded`}
			>
				<p className=" my-4">
					By using this app, you're allowing us to save your email into our
					database which will be used to set up your account.
				</p>

				<p className=" my-4">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam augue
					tellus, porta eu eleifend quis, consectetur sit amet felis. Curabitur
					et metus turpis. Etiam sed luctus dolor. Aenean malesuada egestas eros
					nec sollicitudin. Pellentesque eros enim, viverra id dapibus sed,
					gravida sit amet dolor. Phasellus vitae nulla lorem. Cras quis quam
					bibendum, ultrices augue ac, maximus libero. Aliquam et libero
					sagittis tortor dapibus tincidunt vitae ut ipsum. Quisque eget laoreet
					erat. Proin at diam quis massa cursus efficitur vel id ligula. Fusce
					eu facilisis nibh, ut luctus eros. Nam eu ante eros. Curabitur ut
					lorem vel elit consectetur dictum.
				</p>
			</div>
		</main>
	);
}

export default TermsAndConditionsPage;
