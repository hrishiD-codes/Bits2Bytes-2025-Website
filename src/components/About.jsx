import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navlink from "./Navlink";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
	const trigger = useRef(null);
	const aboutb2b = useRef(null);
	const aboutbit = useRef(null);

	useEffect(() => {
		gsap.fromTo(
			trigger.current,
			{
				opacity: 0,
				y: 100,
			},
			{
				opacity: 1,
				y: 0,
				scrollTrigger: {
					trigger: trigger.current,
					start: window.innerWidth > 768 ? "top 80%" : "top 20%",
					end: "bottom 80%",

					ease: "power4.eae-InOut",
				},
			}
		);
	}, []);

	return (
		<div className="h-fit relative p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10">
			<div className="about flex flex-wrap text-white tracking-wide sm:tracking-wider md:tracking-widest xl:tracking-[.5rem] text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6.7rem] leading-[35px] sm:leading-[50px] md:leading-[65px] lg:leading-[75px] xl:leading-[85px] font-clash font-bold mt-8 sm:mt-12 md:mt-16">
				<span>You might be</span>
				<span>Thinking what is</span>
				<span ref={trigger} className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] mt-2 md:mt-4 lg:mt-8">
					<h1 className="text-turquise">
						<Navlink name={"BITS2BYTES ?"} link={"/#"} />
					</h1>
				</span>
				<span className="mt-2 md:mt-4 lg:mt-8"></span>
			</div>

			<div className="font-chakra py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 space-y-4 sm:space-y-6 md:space-y-8">
				<span ref={aboutb2b} className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-medium block">
					<b>BITS2BYTES</b>, the annual technical fest of our college Techno Bengal Institute of Technology, is more than just a celebration of technology, it is a legacy of innovation, creativity, and collaboration that has been thriving since <b>2006.</b> What began as a modest initiative has grown into a prestigious platform where aspiring technologists, problem-solvers, and innovators come together to showcase their talents and ideas.
					<br className="my-4" />
					Each edition of <b>BITS2BYTES</b> brings with it a fresh wave of energy and purpose — from intense coding competitions and hardware challenges to insightful tech talks and hands-on workshops. The fest provides students with an opportunity not only to test their skills but also to explore new technologies, share knowledge, and connect with like-minded peers.
					<br className="my-4" />
					More than a technical fest, <b>BITS2BYTES</b> represents the spirit of our college — a space where boundaries are pushed, ideas are brought to life, and a strong sense of community is built. It continues to inspire and evolve, driven by the passion and dedication of students, faculty, and organizers who make each year better than the last.
				</span>
			</div>

			<div className="absolute font-clash font-bold text-white">
				<span className="flex gap-4 sm:gap-6 text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.5rem] text-turquise">
					About{" "}
					<span className="text-white">
						<Navlink name={"Techno BIT"} link={"/#"} />
					</span>
				</span>
			</div>

			<div ref={aboutbit} className="flex flex-col xl:flex-row items-center gap-4 sm:gap-6 md:gap-8  mt-[4rem] sm:mt-[4rem] md:mt-[5rem] lg:mt-[6rem] xl:mt-[7rem]">
				<p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-chakra font-medium">
					<b>Techno Bengal Institute of Technology</b>, formerly known as <b>Bengal Institute of Technology</b>, was established in 2000 with four AICTE-approved courses. Currently, it offers four undergraduate and one postgraduate course. The college is approved by AICTE and affiliated with the West Bengal University of Technology (WBUT). Located on Basanti Highway, a few kilometers from downtown Kolkata, the institute is set in a lush, green, picturesque environment, providing a
					peaceful atmosphere while still offering the conveniences of city life.
				</p>

				<video src="/b2b.mp4" autoPlay loop muted playsInline preload="none" className="w-full md:w-full lg:w-full xl:w-[28rem] h-[18rem] md:h-[20rem] xl:h-[18rem] object-cover rounded-2xl border-2 border-gray/80"></video>
			</div>
		</div>
	);
}
