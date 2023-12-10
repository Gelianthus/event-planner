import Link from "next/link";

function Trademark() {
	return (
		<div className={`text-xs mb-4`}>
			<p className="text-center">
				GelianthusTriesNextJS © 2023. All rights reserved
			</p>
			<p className="text-center">
				Made by{" "}
				<Link
					target="_blank"
					href={"https://personal-website-gelianthus.vercel.app/"}
					className={`underline`}
				>
					{"@Gelianthus"}
				</Link>
			</p>
		</div>
	);
}

export default Trademark;
