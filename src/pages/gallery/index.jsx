import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const galleryRef = useRef(null);
    const titleRef = useRef(null);

    // Sample gallery images - replace with your actual fest photos
    const galleryImages = [
        { id: 1, src: '/Gallery/workshop1.webp', alt: 'Workshop 2k25', category: 'workshop' },
        { id: 2, src: '/Gallery/autobit.webp', alt: 'Autobit 2k25', category: 'workshop' },
        // { id: 2, src: '/Gallery/song.webp', alt: 'Coding Competition', category: 'competition' },
        // { id: 3, src: '/Gallery/song.webp', alt: 'Robotics Exhibition', category: 'exhibition' },
        // { id: 4, src: '/Gallery/song.webp', alt: 'Cultural Night', category: 'cultural' },
        // { id: 5, src: '/Gallery/song.webp', alt: 'Innovation Showcase', category: 'showcase' },
        // { id: 6, src: '/Gallery/song.webp', alt: 'Team Building', category: 'team' },
        // { id: 7, src: '/Gallery/song.webp', alt: 'Awards Ceremony', category: 'ceremony' },
        // { id: 8, src: '/Gallery/song.webp', alt: 'Tech Talk Session', category: 'talk' },
        // { id: 9, src: '/Gallery/song.webp', alt: 'Gaming Tournament', category: 'gaming' },
        // { id: 10, src: '/Gallery/song.webp', alt: 'Opening Ceremony', category: 'ceremony' }
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Title animation
            gsap.fromTo(titleRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Gallery items animation
            gsap.fromTo(galleryRef.current.children,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="bg-soothing_black min-h-screen">
            <Head>
                <title>BITS2BYTES 2K25 Gallery</title>
                <meta name="description" content="Explore the gallery of BITS2BYTES 2025 - memorable moments from our tech fest" />
            </Head>

            <Header />

            <div className="pt-20">
                <section className="w-full py-16 px-4 bg-soothing_black relative overflow-hidden">
                    {/* Background Elements with Camera Icons */}
                    <div className="absolute inset-0 opacity-5">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-px bg-gradient-to-b from-main_primary to-transparent animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    height: `${Math.random() * 100 + 50}px`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            />
                        ))}

                        {/* Floating Camera Icons */}
                        {[...Array(8)].map((_, i) => (
                            <svg
                                key={`camera-${i}`}
                                className="absolute text-main_primary/10 animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 4}s`,
                                    animationDuration: `${4 + Math.random() * 2}s`
                                }}
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 15.2c1.74 0 3.2-1.46 3.2-3.2s-1.46-3.2-3.2-3.2S8.8 10.26 8.8 12s1.46 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                            </svg>
                        ))}

                        {/* Film Strip Decorations */}
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={`film-${i}`}
                                className="absolute w-16 h-4 bg-main_primary/5 animate-pulse"
                                style={{
                                    left: `${Math.random() * 80 + 10}%`,
                                    top: `${Math.random() * 80 + 10}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    transform: `rotate(${Math.random() * 360}deg)`
                                }}
                            >
                                <div className="w-full h-full border-l-2 border-r-2 border-main_primary/20 flex">
                                    {[...Array(4)].map((_, j) => (
                                        <div key={j} className="flex-1 border-r border-main_primary/20 last:border-r-0"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto">
                        {/* Section Title with Camera Icon */}
                        <div ref={titleRef} className="text-center mb-16">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <svg className="w-12 h-12 text-main_primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 15.2c1.74 0 3.2-1.46 3.2-3.2s-1.46-3.2-3.2-3.2S8.8 10.26 8.8 12s1.46 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                                </svg>
                                <h2 className="text-4xl md:text-6xl font-clash font-extrabold text-white tracking-wider">
                                    FEST <span className="text-main_primary">GALLERY</span>
                                </h2>
                                <svg className="w-12 h-12 text-main_primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
                                </svg>
                            </div>
                            <p className="text-white/70 font-chakra text-lg md:text-xl max-w-2xl mx-auto">
                                Capturing the most memorable moments from BITS2BYTES - where innovation meets celebration
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <div className="w-8 h-1 bg-main_primary rounded-full"></div>
                                <svg className="w-6 h-6 text-main_primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                </svg>
                                <div className="w-8 h-1 bg-main_primary rounded-full"></div>
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        <div
                            ref={galleryRef}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                        >
                            {galleryImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className={`group cursor-pointer relative overflow-hidden rounded-xl border-2 border-white/10 hover:border-main_primary/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-main_primary/20 ${index % 7 === 0 ? 'md:col-span-2 md:row-span-2' :
                                        index % 5 === 0 ? 'md:row-span-2' : ''
                                        }`}
                                    onClick={() => openModal(image)}
                                >
                                    <div className={`relative overflow-hidden ${index % 7 === 0
                                        ? 'aspect-square md:aspect-auto md:h-[calc(32rem+1.5rem)]' // Large box: 2x2
                                        : index % 5 === 0
                                            ? 'aspect-square md:aspect-auto md:h-[calc(32rem+1.5rem)]' // Tall box: 1x2  
                                            : 'aspect-square md:aspect-auto md:h-64' // Regular box
                                        }`}>
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-white font-chakra font-semibold text-sm md:text-base mb-1">
                                                    {image.alt}
                                                </h3>
                                                <span className="inline-block px-2 py-1 bg-main_primary/80 text-white text-xs rounded-full font-chakra">
                                                    {image.category}
                                                </span>
                                            </div>

                                            {/* View Icon - Updated with Camera */}
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-main_primary/40 transition-colors duration-300">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 15.2c1.74 0 3.2-1.46 3.2-3.2s-1.46-3.2-3.2-3.2S8.8 10.26 8.8 12s1.46 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                                                </svg>
                                            </div>

                                            {/* Photo Frame Decoration */}
                                            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-main_primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-main_primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-main_primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-main_primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Coming Soon Indicator */}
                        <div className="text-center mt-16">
                            {/* Elegant Coming Soon Display */}
                            <div className="relative inline-block">
                                {/* Animated Dots */}
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-3 h-3 bg-main_primary rounded-full animate-pulse"
                                            style={{
                                                animationDelay: `${i * 0.5}s`,
                                                animationDuration: '2s'
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Premium Coming Soon Text */}
                                <div className="relative">
                                    {/* Background Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-main_primary/20 via-main_primary/40 to-main_primary/20 blur-xl rounded-full"></div>

                                    {/* Main Text */}
                                    <h3 className="relative text-2xl md:text-3xl font-clash font-bold text-transparent bg-gradient-to-r from-white via-main_primary to-white bg-clip-text animate-pulse">
                                        MORE MEMORIES LOADING
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-white/60 font-chakra text-sm md:text-base mt-2 tracking-wider">
                                        Stay tuned for more amazing moments from BITS2BYTES 2025
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Modal for full-size image */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={closeModal}
                        >
                            <div className="relative max-w-4xl max-h-[90vh] w-full">
                                <button
                                    onClick={closeModal}
                                    className="absolute -top-12 right-0 text-white hover:text-main_primary transition-colors duration-200 z-10"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
                                    <Image
                                        src={selectedImage.src}
                                        alt={selectedImage.alt}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto max-h-[80vh] object-contain"
                                        loading="lazy"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <h3 className="text-white font-chakra font-bold text-xl mb-2">
                                            {selectedImage.alt}
                                        </h3>
                                        <span className="inline-block px-3 py-1 bg-main_primary text-white text-sm rounded-full font-chakra">
                                            {selectedImage.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <Footer />
        </div>
    )
}
