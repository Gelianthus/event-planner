"use client";

import { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";

function LoadingSpinner() {
	const [message, setMessage] = useState("Loading...");
	const { darkMode } = useContext(DarkModeContext);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMessage("You might need to refresh the page.");
		}, 8000);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div
			className={`p-8 max-w-full flex-grow ${
				darkMode ? "bg-gray-800" : "bg-gray-50"
			}`}
		>
			<h1
				className={`text-center ${
					darkMode ? "text-neutral-50" : "text-neutral-700"
				}  font-bold text-lg mb-4`}
			>
				{message}
			</h1>
			<span className="loading-spinner text-emerald-500 mx-auto"></span>
		</div>
	);
}

export default LoadingSpinner;
