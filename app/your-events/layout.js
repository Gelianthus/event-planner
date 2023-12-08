import Header from "@/components/header-components/Header";
import Footer from "@/components/Footer";

function YourEventsLayout({ children }) {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default YourEventsLayout;
