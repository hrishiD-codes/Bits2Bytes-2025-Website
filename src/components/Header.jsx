import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Slant as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import Navlink from "@/components/Navlink";

export default function Header() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    //on  scroll down direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > window.innerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <header className="w-full h-[4.5rem] flex items-center justify-between py-2 fixed z-[25] border-b-[1.5px] bg-soothing_black/30 border-gray/30 backdrop-blur-lg transition-all duration-300 ease-in-out" style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}>
        <div className="ml-2 md:ml-4 z-[26]" style={{ opacity: isOpen ? 0 : 1 }}>
          <Hamburger
            color="white"
            label="Show menu"
            direction="right"
            size={25}
            rounded={true}
            toggle={setOpen}
            toggled={isOpen}
          />
        </div>
        <Link className="flex flex-row gap-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 z-50 transition duration-300  ease-in-out" href="/">
          <Image
            src="/TIU.svg"
            width={52}
            height={52}
            alt="TIU_Logo"
            className="rounded-full"
            loading="lazy"
          />
          <Image
            src="/25_logo.svg"
            width={60}
            height={60}
            alt="25th year"
            className=""
            loading="lazy"
          />
          <Image
            src="/TBIT.svg"
            width={50}
            height={50}
            alt="TBIT_logo"
            className=""
            loading="lazy"
          />
        </Link>

        <button className="px-11 py-3 bg-main_primary text-white font-semibold font-clash rounded-md shadow-lg hover:bg-white  hover:text-main_primary transition-colors duration-300 mr-5 hidden xl:block">
          <a href="/Brochure.pdf" download> BROCHURE </a>
        </button>
        {/* <progress max="100" value="0"></progress> */}
      </header>

      {isOpen && (
        <motion.div
          className="fixed top-0 menuPop left-0 w-[65vh] h-screen md:h-[95vh] md:ml-8 md:my-4 bg-black z-[26] backdrop-blur-sm rounded-xl border-[2px] border-gray/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col">
            <div className="pl-4 z-[26] h-[4.5rem] flex items-center border-[1.5px] rounded-t-xl bg-black border-gray/40">
              <Hamburger
                color="white"
                label="Show menu"
                direction="right"
                size={50}
                rounded={true}
                toggle={setOpen}
                toggled={isOpen}
              />
              <div className="ml-4 border-l-[1.5px] border-gray/40 h-full"></div>
            </div>
            <div className="text-5xl font-clash font-black flex flex-col mt-14 ml-8 md:mt-12 gap-4 ">
              <div className="relative bg-main_primary text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"HOME"} link={"/"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-main_primary">
                  PAGE <br /> 01
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"EVENTS"} link={"/events"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 02
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"ABOUT"} link={"/#about"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 03
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"FAQ"} link={"/#faq"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 04
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"TEAMS"} link={"/teams"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 05
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink name={"GALLERY"} link={"/gallery"} setToggle={setOpen} />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 06
                </p>
              </div>
              <div className="relative hackNav hover:bg-white hover:text-black text-white w-fit text-left pl-2 pr-4 py-1 rounded-[4px]">
                <Navlink
                  name={"CONTACT"}
                  link={"/contact"}
                  setToggle={setOpen}
                />
                <p className="absolute right-[-2rem] top-[2px] text-[8px] font-bold text-transparent navPageNo">
                  PAGE <br /> 07
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
