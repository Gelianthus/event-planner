"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";

function HeaderNav() {
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	return (
		<div className={`hidden sm:flex flex-row gap-4`}>
			<nav
				className={`flex flex-row gap-4 items-center ${
					darkMode ? "text-neutral-50" : "text-neutral-800"
				}`}
			>
				<Link
					href={"/home"}
					title="Homepage"
					className={`${
						darkMode ? "bg-gray-900" : "bg-white"
					} py-2 px-4 rounded hover:bg-sky-500 hover:text-neutral-100 active:bg-sky-600 active:text-neutral-100`}
				>
					<span className="material-symbols-outlined size-20 align-middle wght-600">
						home
					</span>
				</Link>
				<Link
					className={`${
						darkMode ? "bg-gray-900" : "bg-white"
					}  py-2 px-4 font-semibold rounded flex flex-row gap-2 items-center hover:bg-amber-500 hover:text-neutral-100 active:bg-amber-600 active:text-neutral-100`}
					href={"/your-events"}
				>
					<span>Your events</span>
					<span className="material-symbols-outlined size-20 wght-600">
						calendar_month
					</span>
				</Link>
				<button
					className={`${
						darkMode ? "bg-gray-900" : "bg-white"
					} py-2 px-4 font-semibold rounded flex flex-row gap-2 items-center hover:bg-red-500 hover:text-neutral-100 active:bg-red-600 active:text-neutral-100`}
					onClick={() => signOut({ callbackUrl: "/" })}
				>
					<span>Sign out</span>

					<span className="material-symbols-outlined size-20 wght-600">
						logout
					</span>
				</button>
			</nav>
			<button
				title="Dark Mode Toggle"
				onClick={() => {
					setDarkMode((prevState) => !prevState);
				}}
				className={`${
					darkMode ? "bg-gray-900 text-neutral-50" : "bg-white text-neutral-800"
				} py-2 px-4 rounded hover:bg-gray-600 hover:text-neutral-100 active:bg-gray-700 active:text-neutral-100`}
			>
				<span className="material-symbols-outlined size-20 align-middle wght-600">
					dark_mode
				</span>
			</button>
		</div>
	);
}

export default HeaderNav;
