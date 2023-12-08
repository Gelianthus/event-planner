"use client";

import Image from "next/image";
import HeaderNav from "./HeaderNav";
import Link from "next/link";
import MobileHeaderNav from "./MobileHeaderNav";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";
import { Russo_One } from "next/font/google";

const russo_one = Russo_One({ subsets: ["latin"], weight: ["400"] });

function Header() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<header
			className={`sticky top-0 ${
				darkMode ? "bg-gray-800" : "bg-gray-100"
			} p-4 flex flex-row gap-4 justify-between items-center z-50`}
		>
			<Link
				href={"/home"}
				className={`flex flex-row gap-2 items-center w-fit ${
					darkMode ? "text-neutral-50" : "text-neutral-800"
				}`}
			>
				<Image
					src={"/sunflower_logo.webp"}
					alt="a sunflower icon that has the text Gelianthus at the center"
					height={100}
					width={100}
					className="max-w-full aspect-square object-cover object-center rounded-full"
					style={{ minWidth: "44px", maxWidth: "48px" }}
				/>
				<span className={`${russo_one.className} font-bold text-2xl`}>
					<span className="text-emerald-500">G</span>TN
				</span>
			</Link>
			<HeaderNav />
			<MobileHeaderNav />
		</header>
	);
}

export default Header;
