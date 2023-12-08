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
					href={"/"}
					className={`underline`}
				>
					{"@Gelianthus"}
				</Link>
			</p>
		</div>
	);
}

export default Trademark;
