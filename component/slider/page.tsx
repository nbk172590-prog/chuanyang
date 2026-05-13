"use client"

import {useEffect, useState} from "react";

const slides = [
    {
        image: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-04b29bd1b72ab8ca.png",
        id: 1,
    },
    {
        image: "../../../banerApp.jpg",
        id: 2,
    },
    {
        image: "https://firebasestorage.googleapis.com/v0/b/chuanyang-7973f.firebasestorage.app/o/baner%2F2222.jpg?alt=media&token=ecc4e542-5964-40f4-8432-ab0a9ca3c349",
        id: 3,
    },
];

export function Slider() {

    const [current, setCurrent] = useState(0);

    /**
     * PREV
     */
    const prev = () =>
        setCurrent((c) => (c - 1 + slides.length) % slides.length);

    /**
     * NEXT
     */
    const next = () =>
        setCurrent((c) => (c + 1) % slides.length);

    /**
     * AUTO SLIDE
     */
    useEffect(() => {

        const interval = setInterval(() => {

            setCurrent((c) => (c + 1) % slides.length);

        }, 4000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="relative h-[536px] w-full overflow-hidden rounded-2xl">

            {/* Background image */}
            <img
                src={slides[current].image}
                alt="Slider background"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, #34383900 83.21%, #34383966 100%)",
                }}
            />

            {/* Prev Button */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 md:left-8"
                style={{
                    filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.04))",
                }}
            >
                <img
                    src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-cc963c15911f1474.svg"
                    alt="Previous"
                    className="h-10 w-10 md:h-[52px] md:w-[52px]"
                />
            </button>

            {/* Next Button */}
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 md:right-8"
                style={{
                    filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.04))",
                }}
            >
                <img
                    src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-a3dfb7bf0f0e4e1c.svg"
                    alt="Next"
                    className="h-10 w-10 md:h-[52px] md:w-[52px]"
                />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-10">

                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? "h-2 w-5 bg-white"
                                : "h-2 w-2 bg-white/50"
                        }`}
                    />
                ))}

            </div>

        </div>
    );
}

export default Slider;