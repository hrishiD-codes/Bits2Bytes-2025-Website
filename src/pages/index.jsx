import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Brand from "@/components/brand";
import About from "@/components/About";
import Marque2 from "@/components/Marque2";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import Clock from "@/components/Clock";
import Map from "@/components/Map";
import gsap from "gsap";
import fsPromises from "fs/promises";
import path from "path";
import RitModel from "@/components/RitModel";
import EventSlider from "@/components/EventSlider";
import Marque1 from "@/components/Marque1";
import School from "@/components/School";
import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";

const Home = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);

		gsap.fromTo(stagger.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5 });
	}, []);

	const stagger = useRef(null);

	return (
		<div className="bg-darkPurple h-fit">
			<Head>
				<title>BITS2BYTES 2K25</title>
			</Head>

			<Header id="navbar" />

			<section id="hero">
				<div ref={stagger} className="hidden xl:block italic relative w-full text-center top-[7rem]">
					<p className="text-white pl-[1.5rem] top-[6rem] uppercase font-clash font-bold text-[2.5rem] tracking-wide text-turquise">TECHNO BENGAL INSTITUTE OF TECHNOLOGY</p>
					<p className="text-white font-clash text-xl">PRESENTS</p>
					<div className="flex justify-center mt-5">
						<Image width={170} height={170} src="/b2b.svg" alt="b2b_logo" className="mb-3" loading="lazy" />
					</div>
				</div>
				<div>
					<Hero />
					<Brand />
				</div>
			</section>

			{isLoaded && <Clock />}

			<EventSlider />
			<CtaBanner />
			<Marque1 />

			<School />

			<div className="bg-gradient-to-b from-primary to-transparent">
				<RitModel />
				<section id="about">
					<About />
				</section>
			</div>

			<Marque2 />

			<section id="faq">
				<Faq />
			</section>

			<Map />
			<Footer />
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "/data.json");
	const jsonData = await fsPromises.readFile(filePath);
	const objectData = JSON.parse(jsonData);

	return {
		props: objectData,
	};
}
