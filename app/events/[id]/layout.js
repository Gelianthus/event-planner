import Footer from "@/components/Footer";
import Header from "@/components/header-components/Header";

function EventLayout({ children }) {
	return (
		<div className="min-h-screen flex flex-col w-screen">
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default EventLayout;
