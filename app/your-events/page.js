"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "@/contexts/UserContext";
import { DarkModeContext } from "@/contexts/DarkMode";
import { EventsContext } from "@/contexts/EventsContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function YourEventsPage() {
	const router = useRouter();
	const { user } = useContext(UserContext);
	const { darkMode } = useContext(DarkModeContext);
	const { yourEvents, setYourEvents } = useContext(EventsContext);

	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	const dialogRef = useRef(null);

	useEffect(() => {
		async function getEvents() {
			try {
				const res = await fetch(`/api/events/your-events?id=${user?._id}`);
				if (res.ok) {
					const data = await res.json();
					setYourEvents(data.events);
					setIsLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		}
		getEvents();
	}, []);

	useEffect(() => {
		if (user === null) {
			router.push("/");
		}
	}, []);

	const deleteEventHandle = async (eventid) => {
		const res = await fetch(
			`/api/events/event?eventId=${eventid}&userId=${user?._id}`,
			{
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
			}
		);
		if (res.ok) {
			const data = await res.json();
			setYourEvents(data.yourEvents);

			window.alert(data.message);
		}

		dialogRef.current.close();
		setIsModalOpen(false);
		setSelectedId("");
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isModalOpen]);

	return (
		<main
			className={`${
				darkMode ? "bg-gray-700 text-neutral-50" : "bg-white text-neutral-800"
			} flex-grow`}
		>
			<section className="my-8 sm:my-16">
				<Image
					src={user?.profile_img}
					alt={`profile of ${user?.username}`}
					width={200}
					height={200}
					className="rounded-full block mx-auto mb-2"
					style={{
						aspectRatio: "1 / 1",
						maxWidth: "64px",
						minWidth: "52px",
						objectFit: "cover",
						objectPosition: "50% 50%",
					}}
				/>
				<h1 className="text-center font-bold text-2xl">{user?.username}</h1>
			</section>

			<ul
				className={`mx-auto flex flex-col gap-2 w-full sm:w-3/5 lg:w-4/5 mt-4 mb-8 sm:mt-8 sm:mb-16 p-4 border-2 border-l-0 border-r-0 rounded sm:border-2 ${
					darkMode
						? "bg-gray-800 border-gray-800"
						: "bg-gray-100 border-gray-200"
				} `}
			>
				{yourEvents.length < 1 && (
					<li
						className={`${
							yourEvents.length < 1 && isLoading === false ? "block" : "hidden"
						} text-center font-semibold ${
							darkMode
								? "bg-gray-900 text-neutral-50"
								: "bg-gray-200 text-neutral-800"
						} p-4`}
					>
						No events to display
					</li>
				)}
				{isLoading && (
					<li
						className={`text-center font-semibold ${
							darkMode
								? "bg-gray-900 text-neutral-50"
								: "bg-gray-200 text-neutral-800"
						} p-4`}
					>
						Fetching events, please wait...
					</li>
				)}
				{yourEvents.map((event) => {
					let fullDate = new Date(event.eventDate.split("T")[0]);
					fullDate.toDateString();
					return (
						<li
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
							<div className="flex flex-row">
								<button
									onClick={() => {
										dialogRef.current.showModal();
										setIsModalOpen(true);
										setSelectedId(event._id);
									}}
									className="bg-red-600 text-neutral-50 px-4 flex items-center justify-center hover:bg-red-700 active:bg-red-800"
									title="delete event"
								>
									<span className="material-symbols-outlined size-40 block align-middle">
										delete
									</span>
								</button>
								<Link
									title="view event"
									href={`/events/${event._id}`}
									className="bg-sky-500 text-neutral-50 px-4 flex items-center justify-center hover:bg-sky-600 active:bg-sky-700"
								>
									<span className="material-symbols-outlined size-40 block align-middle">
										double_arrow
									</span>
								</Link>
							</div>
						</li>
					);
				})}
			</ul>
			<dialog
				ref={dialogRef}
				className={`${
					darkMode
						? "bg-gray-900 border-gray-950"
						: "bg-gray-50 border-gray-200"
				} rounded p-8 border `}
			>
				<p
					className={`${
						darkMode ? "text-neutral-50" : "text-neutral-700"
					} text-center font-bold mb-4`}
				>
					Delete event?
				</p>
				<div className="flex flex-row gap-4 items-center justify-center">
					<button
						className={`${
							darkMode
								? "text-neutral-50 bg-gray-950"
								: "text-neutral-800 bg-gray-200"
						} p-4 rounded font-semibold hover:bg-rose-500 hover:text-neutral-50 active:bg-rose-600 active:text-neutral-50`}
						onClick={() => {
							dialogRef.current.close();
							setIsModalOpen(false);
							setSelectedId("");
						}}
					>
						Cancel
					</button>
					<button
						className={`${
							darkMode
								? "text-neutral-50 bg-gray-950"
								: "text-neutral-800 bg-gray-200"
						} p-4 rounded font-semibold hover:bg-emerald-500 hover:text-neutral-50 active:bg-emerald-600 active:text-neutral-50`}
						onClick={() => {
							if (selectedId !== "") {
								return deleteEventHandle(selectedId);
							} else {
								return;
							}
						}}
					>
						Confirm
					</button>
				</div>
			</dialog>
		</main>
	);
}

export default YourEventsPage;
