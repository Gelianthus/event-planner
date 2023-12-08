"use client";

import Link from "next/link";
import Trademark from "./Trademark";

function Footer() {
	return (
		<footer
			className="bg-gray-800 text-neutral-50
			p-4"
		>
			<Trademark />
			<nav className="text-sm flex flex-row gap-4 justify-center font-semibold">
				<Link
					className="
							hover:text-neutral-300 active:text-neutral-400
							
					"
					href={"/privacy"}
				>
					Privacy
				</Link>
				<Link
					className="
						hover:text-neutral-300 active:text-neutral-400
					
					"
					href={"/terms-and-conditions"}
				>
					Terms and Conditions
				</Link>
				<Link
					className="
							hover:text-neutral-300 active:text-neutral-400
						"
					href={"/about"}
				>
					About
				</Link>
			</nav>
		</footer>
	);
}

export default Footer;
