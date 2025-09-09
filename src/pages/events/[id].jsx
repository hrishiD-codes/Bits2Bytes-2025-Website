import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Head from "next/head";
import fsPromises from "fs/promises";
import path from "path";
import { gsap } from "gsap";

function EventsDetails(props) {
  const card = React.useRef(null);
  const title = React.useRef(null);
  const subtitle = React.useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      subtitle.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );
    gsap.fromTo(
      title.current,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7 }
    );
    gsap.fromTo(
      card.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.7, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <>
      <Head>
        <title>Event Details</title>
      </Head>
      <section>
        <Header />
        <div className="h-fit pt-24 p-6 bg-black text-white">
          <div className="flex flex-col items-center ">
            <p
              className="text-xl font-medium font-clash text-center"
              ref={subtitle}
            >
              BITS2BYTES presents
            </p>
            <h1
              className="text-[3rem] xl:text-[4rem] font-clash font-semibold text-center"
              ref={title}
            >
              {props.title}
            </h1>

            <div
              className="flex flex-col mt-[2rem] md:flex-row rounded-xl justify-between w-full md:w-[90%] font-clash bg-gray/25"
              ref={card}
            >
              <Image
                src={props.image}
                alt={props.title}
                width={500}
                height={500}
                loading="lazy"
              />
              <div className="relative flex flex-col justify-between w-full px-2 md:p-8 gap-16">
                <div className="flex flex-col gap-1">
                  <div className="flex relative mt-6 md:mt-0 pb-2">
                    <div className="w-8 h-7 bg-white rounded-full border-[2px] border-white/70"></div>
                    <div className="absolute left-4 w-8 h-7 rounded-full border-[2px] border-white/70"></div>
                  </div>

                  <h3 className="font-medium text-[1.5rem] md:text-8 pb-2">
                    {props.content}
                  </h3>
                  <p>{props.description}</p>
                  <h3 className="text-white text-[1.5rem] font-sans font-bold mb-2 mt-4">
                    Head Coordinator
                  </h3>

                  <div className="flex gap-2 text-[1.1rem] tracking-wide w-fit font-medium">
                    <div className="flex flex-col pr-4">
                      <span>{props.c1name}</span>
                      {props.c2name != false && <span>{props.c2name}</span>}
                    </div>
                  </div>
                </div>

                {props.reg === "Register Here" && props.reglink ? (
                  <a
                    href={props.reglink.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bottom-5 bg-white text-black w-full rounded-full p-2 font-medium hover:bg-gray hover:text-white transition duration-300 ease-in-out text-center block"
                  >
                    {props.reg}
                  </a>
                ) : (
                  <button
                    className="relative bottom-5 bg-white text-black w-full rounded-full p-2 font-medium hover:bg-gray hover:text-white transition duration-300 ease-in-out"
                    disabled
                  >
                    {props.reg}
                  </button>
                )}
              </div>
            </div>

            {props.rulehead == "" ? null : (
              <div className="font-clash flex flex-col mt-[2rem] p-3 md:p-6 rounded-xl justify-between w-full md:w-[90%] bg-gray/25">
                <h1 className="font-semibold text-3xl">{props.rulehead}</h1>
                <div className="flex flex-col gap-2 pt-4 text-lg md:text-xl">
                  {props.rule1 == "" ? null : <p>{props.rule1}</p>}
                  {props.rule2 == "" ? null : <p>{props.rule2}</p>}
                  {props.rule3 == "" ? null : <p>{props.rule3}</p>}
                  {props.rule4 == "" ? null : <p>{props.rule4}</p>}
                  {props.rule5 == "" ? null : <p>{props.rule5}</p>}
                  {props.rule6 == "" ? null : <p>{props.rule6}</p>}
                  {props.rule7 == "" ? null : <p>{props.rule7}</p>}
                  {props.rule8 == "" ? null : <p>{props.rule8}</p>}
                  {props.rule9 == "" ? null : <p>{props.rule9}</p>}
                  {props.rule10 == "" ? null : <p>{props.rule10}</p>}
                  {props.rule11 == "" ? null : <p>{props.rule11}</p>}
                  {props.rule12 == "" ? null : <p>{props.rule12}</p>}
                  {props.rule13 == "" ? null : <p>{props.rule13}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </section>

    </>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "/events.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  const paths = [];
  objectData.posts.forEach((post) => {
    post.forEach((post) => {
      paths.push({ params: { id: post.id.toString() } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "/events.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  const id = context.params.id;

  const post = objectData.posts.flat().find((post) => post.id == id);

  return {
    props: {
      title: post.title,
      image: post.img,
      content: post.content,
      description: post.description,
      c1name: post.c1name,
      c2name: post.c2name,
      register: post.reg,
      reglink: post.reglink, // This should contain your Google Form URL
      reg: post.reg,
      rulehead: post.ruleheader,
      rule1: post.rules.rule1,
      rule2: post.rules.rule2,
      rule3: post.rules.rule3,
      rule4: post.rules.rule4,
      rule5: post.rules.rule5,
      rule6: post.rules.rule6,
      rule7: post.rules.rule7,
      rule8: post.rules.rule8,
      rule9: post.rules.rule9,
      rule10: post.rules.rule10,
      rule11: post.rules.rule11,
      rule12: post.rules.rule12,
      rule13: post.rules.rule13,
    },
  };
}

export default EventsDetails;
