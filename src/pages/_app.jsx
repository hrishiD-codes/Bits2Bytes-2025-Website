import React from "react";
import Head from "next/head";
import { Chakra_Petch } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import LocalFont from "next/font/local";
import dynamic from "next/dynamic";
import "../styles/global.css";
import "../styles/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import InitialLoader from "@/components/InitialLoader";

const font_chakra = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-chakra",
});

const font_ibm = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-ibm",
});

const font_bebas = Bebas_Neue({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-bebas",
});

const font_clash_display = LocalFont({
	src: "../fonts/ClashDisplay-Variable.ttf",
	variable: "--font-clash-display",
});

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
	ssr: false,
});

export default function MyApp({ Component, pageProps }) {
	const [initialLoading, setInitialLoading] = React.useState(true);
	React.useEffect(() => {
		// shorter safety timeout so the loader cannot block rendering for too long
		const safety = setTimeout(() => setInitialLoading(false), 4000);
		return () => clearTimeout(safety);
	}, []);

	React.useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
			navigator.serviceWorker.register("/sw.js").catch((err) => console.log("SW registration failed:", err));
		}
	}, []);

	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/b2b.svg" type="image/svg +xml " />
				<link rel="preload" href="/b2b.svg" as="image" />
				{/* removed preload of large images that can delay LCP; keep prefetch for non-critical images */}
				<link rel="prefetch" href="/banner.webp" as="image" />
				<link rel="prefetch" href="/slider/events.webp" as="image" />
				<meta name="theme-color" content="#000000" />
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
				<main className={`${font_chakra.variable} ${font_clash_display.variable} ${font_ibm.variable} ${font_bebas.variable}`} aria-hidden={initialLoading} style={{ visibility: initialLoading ? "hidden" : "visible", pointerEvents: initialLoading ? "none" : "auto" }}>
					<Component {...pageProps} />
					<Analytics />

					<AnimatedCursor innerSize={12} outerSize={20} trailingSpeed={15} color="151, 71, 255" outerAlpha={0.7} innerScale={1.5} outerScale={2} clickables={["a", 'input[type="text"]', 'input[type="email"]', 'input[type="number"]', 'input[type="submit"]', 'input[type="image"]', "label[for]", "select", "textarea", "button", ".link"]} />
				</main>
			</motion.div>

			{/* Render the initial loader as a non-blocking overlay so the page can render and LCP candidates appear early */}
			{initialLoading && <InitialLoader onFinish={() => setInitialLoading(false)} />}

			{/* Service Worker registration (prod only) */}
			{typeof window !== "undefined" && process.env.NODE_ENV === "production" && (
				<script
					dangerouslySetInnerHTML={{
						__html: `
			  if ('serviceWorker' in navigator) {
				window.addEventListener('load', function () {
				  navigator.serviceWorker.register('/sw.js').catch(function (err) {
					console.log('SW registration failed:', err);
				  });
				});
			  }
			`,
					}}
				/>
			)}
		</>
	);
}
