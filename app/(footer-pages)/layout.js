import Footer from "@/components/Footer";

function LinkedPageLayout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			{children}
			<Footer />
		</div>
	);
}

export default LinkedPageLayout;
