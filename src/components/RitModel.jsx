import React from "react";
import Link from "next/link";

export default function RitModel() {
  const itemList = [
    {
      id: 1,
      title: "Technical Events",
      image: "/slider/tech.webp",
    },
    {
      id: 2,
      title: "Robotics",
      image: "/slider/robotics.webp",
    },
    {
      id: 3,
      title: "Games",
      image: "/slider/games.webp",
    },
    {
      id: 4,
      title: "Workshops",
      image: "/slider/workshop.avif",
    },
    {
      id: 5,
      title: "Talkshows",
      image: "/slider/events.webp",
    },
  ];

  React.useEffect(() => {
    const ACTIVECLASS = "active";
    const IMAGES = document.querySelectorAll(".flex-card-container");

    IMAGES[0].classList.add(ACTIVECLASS);

    function removeActiveClass() {
      const elm = document.querySelector(`.${ACTIVECLASS}`);
      if (elm) {
        elm.classList.remove(ACTIVECLASS);
      }
    }

    const t1 = setInterval(() => {
      const current = document.querySelector(`.${ACTIVECLASS}`);
      const next = current.nextElementSibling;
      removeActiveClass();
      if (next) {
        next.classList.add(ACTIVECLASS);
      } else {
        IMAGES[0].classList.add(ACTIVECLASS);
      }
    }, 3000);

    return () => {
      clearInterval(t1);
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col lg:pt-12">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-white font-clash tracking-wider p-2 md:px-4">
        Explore Your Interests
      </h1>

      <section className="flex flex-col items-center lg:items-stretch lg:flex-row justify-between w-[90%] max-w-[70rem] lg:h-[70vh] h-[100vh] mt-12">
        {itemList.map((item) => (
          <article
            key={item.id}
            className="flex-card-container bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="bg-gradient-to-t from-black/20 to-transparent  w-full h-full">
              <div className="absolute bottom-0 left-0 w-full py-4 px-2 flex items-center justify-center gap-3">
                <h1 className="text-xl lg:text-4xl font-bold text-center uppercase text-white font-clash rotate-180">
                  {item.title}
                </h1>
                <div className="rotate-180 text-white hover:text-main_primary transition-colors duration-300">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 lg:w-8 lg:h-8 lg:block"
                  >
                    <path d="M15.41 16.59L14 18l-6-6 6-6 1.41 1.41L10.83 12l4.58 4.59z" />
                  </svg>
                </div>
              </div>
            </div>
            <Link href={`/events`} className="absolute inset-0">
              <div className="h-full w-full"></div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
