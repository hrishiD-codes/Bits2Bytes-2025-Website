import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import eventsData from "../data/events.json";

export default function EventSlider() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0); // Start with first event

	useEffect(() => {
		try {
			const allEvents = eventsData.posts?.flat() || [];
			if (!allEvents.length) {
				setError("No events available");
			} else {
				setEvents(allEvents);
			}
		} catch (e) {
			setError("Failed to load events");
		} finally {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<div className="p-4 sm:p-8 select-none">
				<div className="animate-pulse">
					<div className="h-8 sm:h-12 bg-white/20 rounded-lg mx-auto w-64 sm:w-96 mb-8"></div>
					<div className="flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
						<div className="flex gap-2 sm:gap-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] lg:w-[28rem] lg:h-[32rem] bg-white/10 rounded-2xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4 sm:p-8 select-none flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
					<p className="text-white/80 mb-6 text-sm sm:text-base">{error}</p>
					<button onClick={() => window.location.reload()} className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm sm:text-base">
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// Get the 5 events to display based on currentIndex
	const visibleEvents = [];
	for (let i = 0; i < 5; i++) {
		const eventIndex = (currentIndex + i) % events.length;
		visibleEvents.push(events[eventIndex]);
	}

	const getCardClasses = (index, isHovered, hoveredIndex) => {
		const baseClasses = "absolute rounded-2xl cursor-pointer transition-all duration-700 ease-out transform-gpu overflow-hidden bg-gradient-to-b from-black/5 to-black/20 shadow-2xl backdrop-blur-sm";

		const sizeClasses = "w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[28rem] lg:w-[28rem] lg:h-[32rem]";

		if (isHovered) {
			return cn(baseClasses, sizeClasses, "z-50 scale-110 sm:scale-125 -translate-y-4 sm:-translate-y-8 rotate-0 shadow-3xl brightness-110");
		}

		if (hoveredIndex !== null) {
			const distance = index - hoveredIndex;
			if (distance < 0) {
				// left side card transforms (handled below via mobile/desktop transform maps)
				const leftOffset = Math.abs(distance) * 80 + 60;
				// keep the calculation here for readability / future use
				void leftOffset;
			} else if (distance > 0) {
				const rightOffset = distance * 80 + 60;
				void rightOffset;
			} else {
				// center card
			}

			const mobileTransforms = {
				[-2]: "z-[5] -translate-x-[200px] -rotate-[20deg] scale-[0.6] opacity-[0.3]",
				[-1]: "z-[15] -translate-x-[120px] -rotate-[12deg] scale-[0.75] opacity-[0.6]",
				[0]: "z-50 translate-x-0 rotate-0 scale-110 opacity-100",
				[1]: "z-[15] translate-x-[120px] rotate-[12deg] scale-[0.75] opacity-[0.8]",
				[2]: "z-[5] translate-x-[200px] rotate-[20deg] scale-[0.6] opacity-[0.3]",
			};

			const desktopTransforms = {
				[-2]: "sm:z-[5] sm:-translate-x-[600px] sm:-rotate-[24deg] sm:scale-[0.65] sm:opacity-[0.3]",
				[-1]: "sm:z-[15] sm:-translate-x-[320px] sm:-rotate-[16deg] sm:scale-[0.8] sm:opacity-[0.6]",
				[0]: "sm:z-50 sm:translate-x-0 sm:rotate-0 sm:scale-125 sm:opacity-100",
				[1]: "sm:z-[15] sm:translate-x-[320px] sm:rotate-[16deg] sm:scale-[0.8] sm:opacity-[0.85]",
				[2]: "sm:z-[5] sm:translate-x-[600px] sm:rotate-[20deg] sm:scale-[0.75] sm:opacity-[0.7]",
			};

			const mobileClass = mobileTransforms[Math.max(-2, Math.min(2, distance))] || mobileTransforms[2];
			const desktopClass = desktopTransforms[Math.max(-2, Math.min(2, distance))] || desktopTransforms[2];

			return cn(baseClasses, sizeClasses, mobileClass, desktopClass);
		}

		const relativeIndex = (index - 2 + visibleEvents.length) % visibleEvents.length;
		const adjustedIndex = relativeIndex > 2 ? relativeIndex - visibleEvents.length : relativeIndex;

		const mobileDefaultPositions = {
			[-2]: "z-[5] -translate-x-[160px] -rotate-[16deg] scale-[0.7] opacity-[0.6]",
			[-1]: "z-[15] -translate-x-[80px] -rotate-[8deg] scale-[0.85] opacity-[0.8]",
			[0]: "z-30 translate-x-0 rotate-0 scale-100 opacity-100",
			[1]: "z-[15] translate-x-[80px] rotate-[8deg] scale-[0.85] opacity-[0.8]",
			[2]: "z-[5] translate-x-[160px] rotate-[16deg] scale-[0.7] opacity-[0.6]",
		};

		const desktopDefaultPositions = {
			[-2]: "sm:z-[5] sm:-translate-x-[480px] sm:-rotate-[20deg] sm:scale-[0.75] sm:opacity-[0.7]",
			[-1]: "sm:z-[15] sm:-translate-x-[240px] sm:-rotate-[10deg] sm:scale-[0.9] sm:opacity-[0.85]",
			[0]: "sm:z-30 sm:translate-x-0 sm:rotate-0 sm:scale-100 sm:opacity-100",
			[1]: "sm:z-[15] sm:translate-x-[240px] sm:rotate-[10deg] sm:scale-[0.9] sm:opacity-[0.85]",
			[2]: "sm:z-[5] sm:translate-x-[480px] sm:rotate-[20deg] sm:scale-[0.75] sm:opacity-[0.7]",
		};

		const mobileClass = mobileDefaultPositions[Math.max(-2, Math.min(2, adjustedIndex))] || mobileDefaultPositions[2];
		const desktopClass = desktopDefaultPositions[Math.max(-2, Math.min(2, adjustedIndex))] || desktopDefaultPositions[2];

		return cn(baseClasses, sizeClasses, mobileClass, desktopClass);
	};

	const nextCard = () => {
		setCurrentIndex((prev) => (prev + 1) % events.length);
	};

	const prevCard = () => {
		setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
	};

	return (
		<div className="relative p-4 sm:p-8 select-none overflow-hidden">
			<div className="absolute inset-0 pointer-events-none" />

			<div className="relative z-10">
				<h1 className="font-sans text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 sm:mb-8 pt-2 sm:pt-5 drop-shadow-lg px-4">
					<span className="text-amber-300">✦</span> Shades of Bits2Bytes <span className="text-amber-300">✦</span>
				</h1>

				<div className="flex justify-center items-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] perspective-[1000px] sm:perspective-[1500px]">
					<div className="relative flex justify-center items-center w-full h-[360px] sm:h-[460px] md:h-[560px] lg:h-[640px] px-4 sm:px-0">
						{visibleEvents.map((event, index) => (
							<div key={`${event.id}-${currentIndex + index}`} className={getCardClasses(index, hoveredIndex === index, hoveredIndex)} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} onFocus={() => setHoveredIndex(index)} onBlur={() => setHoveredIndex(null)} tabIndex={0} role="button" aria-label={`View event: ${event.title}`}>
								<Link href={`/events/${event.id}`} className="block w-full h-full group">
									<div className="relative w-full h-full">
										<Image src={event.img || "/placeholder.svg"} alt={event.title} fill className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 448px" priority={index < 3} />
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
										<div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
											<h3 className="text-white font-semibold text-sm sm:text-lg line-clamp-2 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">{event.title}</h3>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-center items-center gap-4 mt-6">
					<button onClick={prevCard} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm" aria-label="Previous event">
						<ChevronLeft className="w-6 h-6 text-white" />
					</button>

					<div className="flex gap-2">
						{Array.from({ length: Math.ceil(events.length / 5) }, (_, i) => (
							<button key={i} onClick={() => setCurrentIndex(i * 5)} className={cn("w-2 h-2 rounded-full transition-all duration-300", Math.floor(currentIndex / 5) === i ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60")} aria-label={`Go to event group ${i + 1}`} />
						))}
					</div>

					<button onClick={nextCard} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm" aria-label="Next event">
						<ChevronRight className="w-6 h-6 text-white" />
					</button>
				</div>
			</div>
		</div>
	);
}
