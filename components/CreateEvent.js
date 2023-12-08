"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import { DarkModeContext } from "@/contexts/DarkMode";
import { EventsContext } from "@/contexts/EventsContext";

function CreateEvent() {
	const [isMdodalOpen, setIsModalOpen] = useState(false);
	const [eventDesc, setEventDesc] = useState("");
	const [eventName, setEventName] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const { user } = useContext(UserContext);
	const { darkMode } = useContext(DarkModeContext);
	const { setEvents } = useContext(EventsContext);

	const createEventDialogRef = useRef(null);
	const formRef = useRef(null);
	const eventNameInputRef = useRef();
	const descInputRef = useRef(null);
	const dateInputRef = useRef(null);
	const checkBoxRef = useRef(null);

	const currentDate = new Date().toISOString().split("T")[0];

	useEffect(() => {
		if (isMdodalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isMdodalOpen]);

	const submitHandle = async () => {
		try {
			const res = await fetch(`/api/events/event`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					userId: user._id,
					eventName: eventName,
					eventDesc: eventDesc,
					eventDate: eventDate,
					inviteAll: isChecked,
				}),
			});
			if (res.ok) {
				const data = await res.json();
				formRef.current.reset();
				setEventName("");
				setEventDate("");
				setEventDesc("");
				setIsChecked(false);
				setIsModalOpen(false);
				createEventDialogRef.current.close();
				window.alert(data.message);
				setEvents(data.allEvents);
			}
		} catch (error) {
			console.error(error);
			console.log("Failed to create event, from CreateEvent.js");
		}
	};

	const darkThemeBtn =
		"bg-gray-900 text-neutral-100 hover:bg-sky-600  active:bg-sky-700 ";
	const lightThemeBtn =
		"bg-emerald-500 text-neutral-100 hover:bg-emerald-600 active:bg-emerald-700";

	return (
		<>
			<div className="my-8">
				<button
					onClick={() => {
						setIsModalOpen(true);
						createEventDialogRef.current.showModal();
					}}
					className={`font-bold text-base sm:text-xl p-4 mx-auto block rounded ${
						darkMode ? darkThemeBtn : lightThemeBtn
					}`}
				>
					Create Event{" "}
					<span className="material-symbols-outlined size-32 align-middle">
						calendar_add_on
					</span>
				</button>
				<dialog
					ref={createEventDialogRef}
					className={`${
						darkMode
							? "bg-gray-900 text-neutral-50"
							: "bg-gray-100 text-neutral-800"
					} p-8 rounded w-full sm:w-4/5 lg:w-1/2 mx-auto sm:px-0`}
				>
					<form
						id="form"
						ref={formRef}
						onSubmit={(event) => {
							event.preventDefault();
							submitHandle();
						}}
					>
						<h2 className="text-center font-bold text-lg">Create an event</h2>
						<fieldset
							id="fieldset"
							className="flex flex-col gap-4 p-4"
						>
							<label htmlFor="input_name">Event Name</label>
							<input
								ref={eventNameInputRef}
								onChange={(e) => setEventName(e.target.value)}
								id="input_name"
								required
								className="p-2 outline-gray-600 text-neutral-800"
								placeholder="Chillnuman"
								type="text"
							></input>
							<label htmlFor="input_desc">Event Description</label>
							<textarea
								required
								placeholder="short description, specify location if needed"
								ref={descInputRef}
								onChange={(e) => setEventDesc(e.target.value)}
								className="h-40 resize-none p-2 outline-gray-600 text-neutral-800"
								id="input_desc"
								maxLength={322}
							/>
							<input
								required
								ref={dateInputRef}
								onChange={(e) => setEventDate(e.target.value)}
								type="date"
								id="input_date"
								min={currentDate}
								className="cursor-pointer outline-gray-600 text-neutral-800"
							/>

							<label className="cursor-pointer outline-gray-600">
								<input
									ref={checkBoxRef}
									onClick={() => {
										if (checkBoxRef.current.checked) {
											setIsChecked(true);
										} else {
											setIsChecked(false);
										}
									}}
									type="checkbox"
									className="mr-1 "
								/>
								Send invitation to Kiane{" "}
								<span className="text-xs">{"(optional, not recommended)"}</span>
							</label>
						</fieldset>
						<div className="flex flex-row gap-4 justify-center items-center">
							<button
								className="p-4 font-semibold rounded text-neutral-700 bg-gray-200 hover:bg-rose-400 hover:text-neutral-100 active:bg-rose-500 active:text-neutral-100"
								type="button"
								onClick={() => {
									setIsModalOpen(false);
									createEventDialogRef.current.close();
									formRef.current.reset();
									setEventName("");
									setEventDesc("");
									setEventDate("");
									setIsChecked(false);
								}}
							>
								Cancel{" "}
								<span className="material-symbols-outlined align-bottom">
									close
								</span>
							</button>
							<button
								className="p-4 font-semibold rounded text-neutral-50 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700"
								type="submit"
							>
								Create{" "}
								<span className="material-symbols-outlined align-bottom">
									add
								</span>
							</button>
						</div>
					</form>
				</dialog>
			</div>
		</>
	);
}

export default CreateEvent;
