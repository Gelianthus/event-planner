"use client";

import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const DarkModeContext = createContext(false);

export const DarkModeContextProvider = ({ children }) => {
	const [cookies, setCookie] = useCookies(["darkModeCookie"]);
	const initialValue = cookies.darkModeCookie || false;
	const [darkMode, setDarkMode] = useState(initialValue);
	const [initialRender, setInitialRender] = useState(false);

	useEffect(() => {
		function setDarkModeCookie() {
			if (darkMode === false) {
				setCookie("darkModeCookie", false);
			} else if (darkMode === true) {
				setCookie("darkModeCookie", true);
			}
		}

		setInitialRender(true);
		initialRender && setDarkModeCookie();
	}, [darkMode]);

	return (
		<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
