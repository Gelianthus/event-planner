"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import { DarkModeContext } from "@/contexts/DarkMode";
import Image from "next/image";
import SignInReminder from "@/components/SignInReminder";

function EventPage() {
	const pathname = usePathname();
	const router = useRouter();
	const { user } = useContext(UserContext);
	const { darkMode } = useContext(DarkModeContext);
	const [event, setEvent] = useState(null);

	const fullDate = new Date(event?.eventDate.split("T")[0]);
	fullDate.toDateString();

	useEffect(() => {
		if (user === null) {
			router.push("/");
		}
	}, []);

	useEffect(() => {
		async function getEvent() {
			let eventId = pathname.split("events/")[1];
			try {
				const res = await fetch(`/api/events/event?id=${eventId}`, {
					cache: "no-store",
				});
				if (res.ok) {
					const data = await res.json();
					setEvent(data.event);
				}
			} catch (error) {
				console.log(error);
			}
		}
		getEvent();
	}, []);

	const actionHandle = async () => {
		let interestedIds = event?.interested.map((user) => {
			return user._id;
		});

		if (interestedIds.includes(user?._id) && event?.interested.length === 1) {
			const res = await fetch("/api/events/event/leave-event", {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ userId: user?._id, eventId: event?._id }),
			});
			if (res.ok) {
				window.alert("Event has been deleted");
				router.push("/");
			}
		} else if (interestedIds.includes(user?._id)) {
			const res = await fetch("/api/events/event/leave-event", {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ userId: user?._id, eventId: event?._id }),
			});
			if (res.ok) {
				const data = await res.json();
				setEvent(data.event);
			}
		} else {
			const res = await fetch("/api/events/event/join-event", {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ userId: user?._id, eventId: event?._id }),
			});
			if (res.ok) {
				const data = await res.json();
				setEvent(data.event);
			}
		}
	};

	if (user === null) {
		return <SignInReminder />;
	} else {
		return (
			<>
				{user && event === null ? (
					<LoadingSpinner />
				) : (
					<>
						<main
							className={`${
								darkMode ? "bg-gray-700" : "bg-white"
							}  sm:px-0 p-4 flex-grow flex flex-col align-middle justify-center`}
						>
							<section
								className={`${
									darkMode
										? "bg-gray-900 border-gray-950 text-neutral-50"
										: "bg-gray-50 border-gray-600 text-neutral-800"
								} w-full sm:w-3/4 lg:w-4/5 mx-auto rounded border-2 `}
							>
								<div
									className={`
									 
									p-4`}
								>
									<h1 className="font-bold text-xl">{event?.eventName}</h1>
									<p className="my-4">{event?.eventDesc}</p>
								</div>
								<div className="my-4 p-4">
									<h2 className="font-bold mb-4 text-emerald-500">
										Interested:
									</h2>
									<ul className="flex flex-row flex-wrap gap-4">
										{event?.interested.length < 1 && (
											<li title="you have no friends">{"<empty list>"}</li>
										)}
										{event?.interested.map((user) => {
											return (
												<li
													key={user._id}
													className="flex flex-col items-center justify-center gap-2"
												>
													<Image
														src={user.profile_img}
														alt={`profile of ${user.username}`}
														height={100}
														width={100}
														className="rounded-full max-w-full"
														style={{
															aspectRatio: "1 / 1",
															objectFit: "cover",
															objectPosition: "50% 50%",
															minWidth: "32px",
															maxWidth: "52px",
														}}
													/>
													<p className="text-sm">{user.username}</p>
												</li>
											);
										})}
									</ul>
								</div>

								<div className="p-4">
									{event?.interested.some(
										(element) => element._id === user?._id
									) ? (
										<button
											onClick={actionHandle}
											className={`block mx-auto font-semibold text-lg py-4 px-8  rounded border-2 ${
												darkMode
													? "border-gray-950 bg-gray-950"
													: "border-gray-700"
											}  hover:bg-rose-400 hover:text-neutral-50 hover:border-rose-500 active:bg-rose-500 active:text-neutral-50`}
										>
											Leave
										</button>
									) : (
										<button
											onClick={actionHandle}
											className={`block mx-auto font-semibold text-lg py-4 px-8  rounded border-2 ${
												darkMode
													? "border-gray-950 bg-gray-950"
													: "border-gray-700"
											} hover:bg-emerald-400 hover:text-neutral-50 hover:border-emerald-500 active:bg-emerald-500 active:text-neutral-50`}
										>
											Join
										</button>
									)}
								</div>

								<div className="flex flex-row gap-4 justify-between items-center p-4 font-bold text-xs text-emerald-500">
									<p>Date: {fullDate.toDateString()}</p>
									<p>Planned by: {event?.createdBy.username}</p>
								</div>
							</section>
						</main>
					</>
				)}
			</>
		);
	}
}

export default EventPage;
