import React from "react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="relative isolate mx-4 md:mx-8 lg:mx-12 xl:mx-16 my-16">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-secondary via-purple-600 to-accent blur-2xl opacity-30" />

      <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl px-6 py-10 md:px-10 md:py-14 text-white shadow-3xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <h2 className="font-clash text-3xl md:text-4xl font-extrabold tracking-wide">
              Be part of BITS2BYTES 2025
            </h2>
            <p className="mt-2 font-chakra text-white/80 text-base md:text-lg">
              Explore events, compete, and experience the best of our tech fest over 15-17 September 2025.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/events"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-main_primary text-white font-clash font-semibold shadow-lg hover:bg-white hover:text-main_primary transition-colors duration-300"
            >
              Explore Events
            </Link>
            <a
              href="/Brochure.pdf"
              download
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white/10 text-white font-clash font-semibold ring-1 ring-white/20 hover:bg-white hover:text-dark transition-colors duration-300"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
