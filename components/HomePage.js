"use client";

import { UserContext } from "@/contexts/UserContext";
import { DarkModeContext } from "@/contexts/DarkMode";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateEvent from "./CreateEvent";
import EventContainer from "./EventContainer";
import SignInReminder from "./SignInReminder";

function HomePageComponent() {
	const router = useRouter();
	const { user } = useContext(UserContext);
	const { darkMode } = useContext(DarkModeContext);

	useEffect(() => {
		if (user === null) {
			router.push("/");
		}
	}, []);

	if (user !== null) {
		return (
			<main className={`${darkMode ? "bg-gray-700" : "bg-white"} flex-grow`}>
				<CreateEvent />
				<EventContainer />
			</main>
		);
	} else {
		<SignInReminder />;
	}
}

export default HomePageComponent;
