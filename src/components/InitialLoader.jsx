import { useState, useEffect } from "react";

export default function Preloader({ onFinish }) {
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
	const [assetsLoaded, setAssetsLoaded] = useState(false);
	const [animationDone, setAnimationDone] = useState(false);

	const letters = ["BITS", "2", "BYTES", "2", "K", "2", "5"];
	const animationClasses = ["fromRightOutBottom", "fromTopOutRight", "fromLeftOutTop", "fromBottomOutLeft", "fromRightOutTop", "fromBottomOutRight", "fromLeftOutBottom", "fromTopOutRight", "fromRightOutTop", "fromBottomOutLeft", "fromLeftOutTop"];

	useEffect(() => {
		const assetsToPreload = ["/b2b.svg", "/retro.webp"];
		let cancelled = false;

		async function preload() {
			if (typeof window === "undefined") {
				setAssetsLoaded(true);
				return;
			}

			const supportsCache = !!window.caches;

			try {
				const ev = await fetch("/events.json")
					.then((r) => (r.ok ? r.json() : null))
					.catch(() => null);
				if (ev && ev.posts) {
					const found = new Set();
					ev.posts.forEach((group) => {
						if (Array.isArray(group)) {
							group.forEach((item) => {
								if (item && item.img && typeof item.img === "string" && item.img.startsWith("/Eventposter/") && item.img.endsWith(".webp")) {
									found.add(item.img);
								}
							});
						}
					});
					if (found.size) {
						found.forEach((p) => {
							if (!assetsToPreload.includes(p)) assetsToPreload.push(p);
						});
					}
				}

				if (supportsCache) {
					const cache = await caches.open("assets-v1.0.0");
					await Promise.all(
						assetsToPreload.map(async (url) => {
							if (cancelled) return;
							try {
								const matched = await cache.match(url);
								if (matched) return;
								const resp = await fetch(url).catch(() => null);
								if (resp) {
									try {
										await cache.put(url, resp.clone());
									} catch (e) {
										console.debug("InitialLoader: cache.put failed", e);
									}
								}
							} catch (e) {
								console.debug("InitialLoader: preload fetch failed", e);
							} finally {
								try {
									const img = new Image();
									img.src = url;
								} catch (e) {
									console.debug("InitialLoader: image constructor failed", e);
								}
							}
						})
					);
				} else {
					assetsToPreload.forEach((url) => {
						try {
							const img = new Image();
							img.src = url;
						} catch (e) {
							console.debug("InitialLoader: image preload failed", e);
						}
					});
				}
			} catch (e) {
				console.debug("InitialLoader: preload failed", e);
			}

			if (!cancelled) setAssetsLoaded(true);
		}

		// shorter safety so loader can't block for too long
		const safety = setTimeout(() => setAssetsLoaded(true), 3000);

		preload();
		return () => {
			cancelled = true;
			clearTimeout(safety);
		};
	}, []);

	useEffect(() => {
		const letterInterval = setInterval(() => {
			setCurrentLetterIndex((prev) => {
				if (prev < letters.length - 1) {
					return prev + 1;
				} else {
					clearInterval(letterInterval);
					setTimeout(() => {
						setTimeout(() => {
							setAnimationDone(true);
						}, 1000);
					}, 600);
					return prev;
				}
			});
		}, 500);

		return () => clearInterval(letterInterval);
	}, [letters.length]);

	useEffect(() => {
		if (animationDone && assetsLoaded) {
			onFinish();
		}
	}, [animationDone, assetsLoaded, onFinish]);

	return (
		<div className="loader__wrapper relative w-full h-screen overflow-hidden">
			<div className="cube-wrapper relative z-10">
				<div className="loader-cube">
					{letters.map((letter, index) => (
						<div
							key={index}
							className={`loader-char ${index === currentLetterIndex ? animationClasses[index] : ""}`}
							style={{
								opacity: index === currentLetterIndex ? 1 : 0,
								zIndex: index === currentLetterIndex ? 10 : 1,
							}}
						>
							<span>{letter}</span>
						</div>
					))}
				</div>
			</div>

			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
				<div className="flex space-x-1">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="w-2 h-2 bg-white rounded-full animate-pulse"
							style={{
								animationDelay: `${i * 0.2}s`,
								animationDuration: "1s",
							}}
						></div>
					))}
				</div>
			</div>
		</div>
	);
}
