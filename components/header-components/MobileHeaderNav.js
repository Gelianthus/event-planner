"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect, useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";

function MobileHeaderNav() {
	const [navVisible, setNavVisible] = useState(false);
	const { darkMode, setDarkMode } = useContext(DarkModeContext);
	const navContainerRef = useRef();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!navContainerRef.current.contains(event.target)) {
				setNavVisible(false);
			}
		};

		if (navVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [navVisible]);

	return (
		<div
			ref={navContainerRef}
			className="relative sm:hidden"
		>
			<button
				onClick={() => setNavVisible((prevState) => !prevState)}
				className={`${
					darkMode ? "bg-gray-900 text-neutral-50" : "bg-white text-neutral-800"
				} sm:hidden inline-block py-2 px-4 rounded`}
			>
				<span className="material-symbols-outlined size-20 align-middle wght-600">
					more_vert
				</span>
			</button>
			<div
				className={`${navVisible ? "flex" : "hidden"} ${
					darkMode ? "bg-gray-800" : "bg-gray-100"
				} sm:hidden flex-col gap-4 absolute right-0 top-20 w-56  p-4 rounded z-50`}
			>
				<nav
					className={`flex flex-col gap-4 ${
						darkMode ? "text-neutral-50" : "text-neutral-800"
					}`}
				>
					<Link
						title="Homepage"
						onClick={() => setNavVisible(false)}
						className={`${
							darkMode ? "bg-gray-900" : "bg-white"
						} py-2 px-4 rounded text-center hover:bg-sky-400 hover:text-neutral-100 active:bg-sky-500 active:text-neutral-100`}
						href={"/home"}
					>
						<span className="material-symbols-outlined size-20 align-middle wght-600">
							home
						</span>
					</Link>
					<Link
						onClick={() => setNavVisible(false)}
						className={`${
							darkMode ? "bg-gray-900" : "bg-white"
						} py-2 px-4 font-semibold rounded flex flex-row gap-2 justify-center items-center hover:bg-amber-400 hover:text-neutral-100 active:bg-amber-500 active:text-neutral-100`}
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
						} py-2 px-4 font-semibold rounded flex flex-row gap-2 justify-center items-center  hover:bg-red-400 hover:text-neutral-100 active:bg-red-500 active:text-neutral-100`}
						onClick={() => {
							setNavVisible(false);
							signOut({ callbackUrl: "/" });
						}}
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
						setNavVisible(false);
					}}
					className={`${
						darkMode
							? "bg-gray-900 text-neutral-50"
							: "bg-white text-neutral-800"
					} py-2 px-4 rounded hover:bg-gray-600 hover:text-neutral-100 active:bg-gray-700 active:text-neutral-100`}
				>
					<span className="material-symbols-outlined size-20 align-middle wght-600">
						dark_mode
					</span>
				</button>
			</div>
		</div>
	);
}

export default MobileHeaderNav;
