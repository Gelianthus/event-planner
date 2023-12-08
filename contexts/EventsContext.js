"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export const EventsContext = createContext(null);

export const EventsContextProvider = ({ children }) => {
	const [events, setEvents] = useState([]);
	const [yourEvents, setYourEvents] = useState([]);

	return (
		<EventsContext.Provider
			value={{ events, setEvents, yourEvents, setYourEvents }}
		>
			{children}
		</EventsContext.Provider>
	);
};
