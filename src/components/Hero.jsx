import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

function Hero() {
	const title = useRef(null);
	const title1 = useRef(null);
	const subtitle = useRef(null);
	const subtitle2 = useRef(null);
	const date = useRef(null);
	const render = useRef(null);

	useEffect(() => {
		//loop the video from 0:03 to 0:06
		render.current.currentTime = 0.5;
		render.current.addEventListener("timeupdate", function () {
			if (this.currentTime > 9) {
				this.currentTime = 0.5;
			}
		});

		// Pause video on pagehide to allow bfcache
		const handlePageHide = () => {
			if (render.current) {
				render.current.pause();
			}
		};
		window.addEventListener("pagehide", handlePageHide);

		gsap.fromTo(title.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 });
		gsap.fromTo(title1.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, delay: 0.5 });
		gsap.fromTo(subtitle.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, delay: 1 });
		gsap.fromTo(subtitle2.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, delay: 2.5 });
		gsap.fromTo(date.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.5, delay: 3 });

		return () => {
			window.removeEventListener("pagehide", handlePageHide);
		};
	}, []);

	return (
		<>
			<div className="hero relative xl:hidden py-8 h-fit flex flex-col uppercase justify-center">
				<video ref={render} src="/b2b.mp4" loop autoPlay muted playsInline className="absolute top-0 left-0 w-full h-full object-cover bg-slate-300 opacity-40" preload="none"></video>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

				{/* Logo for small and medium screens */}
				<div className="flex justify-center items-center mb-6 mt-8">
					<Image src="/b2b.svg" alt="BITS2BYTES " width={0} height={0} className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 pt-6 md:h-48  object-contain drop-shadow-xl" draggable="false" loading="lazy" />
				</div>

				<div className="text-white flex flex-col pt-[2rem] uppercase font-extrabold md:ml-[1rem] lg:ml-[2rem] px-5 ">
					<h1 ref={title} className="font-chakra sm:text-2xl opacity-0">
						TECHNO BENGAL INSTITUTE OF TECHNOLOGY
					</h1>
					<h1 ref={title1} className="sm:text-2xl opacity-0 font-chakra">
						presents
					</h1>
					<div ref={subtitle} className="font-clash flex flex-wrap opacity-0">
						<span className="text-[3rem] sm:text-[4.5rem] md:text-[6.2rem] lg:text-[7.5rem] ">BITS2BYTES</span>
						<span className="text-main_primary relative top-[-3rem] font-chakra text-stroke-black text-[7rem] md:text-[9rem]">2025</span>
					</div>
					<span ref={subtitle2} className="opacity-0 relative top-[-5rem] text-[3.5rem] sm:text-[5rem] md:text-[7rem] font-clash">
						TECH FEST
					</span>
					<button className="px-11 py-3 bg-main_primary text-white font-semibold font-clash rounded-md shadow-lg hover:bg-white hover:text-main_primary transition-colors duration-300 relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<a href="/Brochure.pdf" download>
							BROCHURE
						</a>
					</button>
				</div>

				<div ref={date} className="relative md:ml-10 opacity-0 flex flex-col font-bold bg-white w-fit text-xl rounded-md text-black p-2 pr-8 ml-[1.5rem] md:text-3xl  z-10">
					<span className="font-chakra">
						September <span className="font-clash">2025</span>
					</span>
					<span className="flex gap-2 text-[2rem] font-chakra font-bold">
						15
						<b className="text-[16px]">TH</b>
						16
						<b className="text-[16px]">TH</b>
						17
						<b className="text-[16px]">TH</b>
					</span>
				</div>
			</div>
		</>
	);
}

export default Hero;
