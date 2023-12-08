import Footer from "@/components/Footer";
import Header from "@/components/header-components/Header";

function HomeLayout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			{/* children's top level element should be main */}
			{children}
			<Footer />
		</div>
	);
}

export default HomeLayout;
