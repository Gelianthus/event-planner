"use client";

import { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";
import { EventsContext } from "@/contexts/EventsContext";
import Link from "next/link";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({ subsets: ["latin"], weight: ["400"] });

function EventContainer() {
	const [isLoading, setIsLoading] = useState(true);

	const { darkMode } = useContext(DarkModeContext);
	const { events, setEvents } = useContext(EventsContext);

	useEffect(() => {
		async function getEvents() {
			try {
				const res = await fetch("/api/events");
				if (res.ok) {
					const data = await res.json();
					setEvents(data.events);
					setIsLoading(false);
				}
			} catch (error) {
				console.log("Failed to fetch events", error);
			}
		}
		getEvents();
	}, []);

	return (
		<section
			className={`mx-auto w-full sm:w-3/5 lg:w-4/5 mt-4 mb-8 sm:my-16  p-4 border-2 border-l-0 border-r-0 rounded sm:border-2 ${
				darkMode ? "bg-gray-800 border-gray-800" : "bg-gray-100 border-gray-200"
			} `}
		>
			<div className="flex flex-row gap-2 items-center text-lg font-bold">
				<h2
					className={`${darkMode ? "text-neutral-50" : "text-neutral-800"} ${
						russo_one.className
					}`}
				>
					Events
				</h2>
				<span className="material-symbols-outlined align-bottom text-amber-400 size-24">
					calendar_month
				</span>
			</div>
			<hr
				className={`my-4 border-t-2  ${
					darkMode ? "border-gray-900" : "border-gray-200"
				}`}
			/>
			<div className="flex flex-col gap-2">
				<p
					className={`${
						events?.length < 1 && isLoading === false ? "block" : "hidden"
					} text-center font-semibold ${
						darkMode
							? "bg-gray-900 text-neutral-50"
							: "bg-gray-200 text-neutral-800"
					} p-4`}
				>
					No events to display {" :("}
				</p>
				{isLoading && (
					<p
						className={`text-center font-semibold ${
							darkMode
								? "bg-gray-900 text-neutral-50"
								: "bg-gray-200 text-neutral-800"
						} p-4`}
					>
						Fetching events, please wait...
					</p>
				)}
				{events.map((event) => {
					let fullDate = new Date(event.eventDate.split("T")[0]);
					fullDate.toDateString();
					return (
						<div
							key={event._id}
							className={`${
								darkMode
									? "bg-gray-900 text-neutral-50"
									: "bg-gray-200 text-neutral-800"
							}  flex flex-row gap-4 justify-between`}
						>
							<div className="p-4">
								<p className="font-semibold text-lg">{event.eventName}</p>
								<p>{fullDate.toDateString()}</p>
							</div>
							<Link
								href={`/events/${event._id}`}
								className="bg-sky-500 text-neutral-50 px-4 flex items-center justify-center hover:bg-sky-600 active:bg-sky-700"
							>
								<span className="material-symbols-outlined size-40 block align-middle">
									double_arrow
								</span>
							</Link>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default EventContainer;
