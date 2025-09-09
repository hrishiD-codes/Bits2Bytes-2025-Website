import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function School() {
    // Format time with leading zeros

    return (
        <>
            <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-soothing_black via-primary to-black text-white relative overflow-hidden">
                <div className="border-2 border-main_primary/40 rounded-2xl p-8 md:p-12 w-full shadow-2xl bg-gradient-to-br from-soothing_black/95 via-primary/20 to-soothing_black/95 backdrop-blur-sm">
                    <p className="text-center text-lg md:text-2xl font-medium font-clash pb-2">&#123;Welcome &#125;</p>

                    {/* Title Section */}
                    <div className="flex gap-2 w-full">
                        {/* Left */}
                        <div className="flex-1 text-left">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-clash font-semibold tracking-wider text-white">
                                JUNIOR
                            </h1>
                        </div>

                        {/* Center */}
                        <div className="flex-1 text-center">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl text-main_primary font-clash font-semibold tracking-wider animate-pulse">
                                GENIUS
                            </h1>
                        </div>

                        {/* Right */}
                        <div className="flex-1 text-right">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-clash font-semibold tracking-wider">
                                ZONE
                            </h1>
                        </div>
                    </div>

                    {/* events Display */}
                    <div className="flex justify-center items-center mt-[3rem] mb-[3rem] sm:mt-[5rem] sm:mb-[5rem] md:mt-[7rem] md:mb-[7rem] lg:mt-[12rem] lg:mb-[15rem] w-full h-20" >
                        <Image
                            width={13716}
                            height={7509}
                            src="/School.svg"
                            alt="School Logo"
                            className="animate-pulse object-contain"
                            loading="lazy"
                        />
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-lg md:text-2xl text-white font-chakra font-semibold tracking-wide leading-relaxed">
                            Monday, September 15
                        </p>
                        <p className="text-lg md:text-2xl text-white font-chakra  tracking-wide leading-relaxed"> Join us for an exciting journey of learning and discovery at the Junior Genius Zone!</p>
                    </div>

                    {/* Message Section */}
                    <div className=" text-center ">
                        <button className="mt-4 px-11 py-3 bg-main_primary text-white font-semibold font-clash rounded-md shadow-lg hover:bg-white  hover:text-main_primary transition-colors duration-300">
                            <a href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className=""
                            >Register Now
                            </a>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
