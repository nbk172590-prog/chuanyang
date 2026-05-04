"use client"

import { useState } from "react";

const slides = [
    {
        image: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-04b29bd1b72ab8ca.png",
        id: 1,
    },
    {
        image: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-04b29bd1b72ab8ca.png",
        id: 2,
    },
    {
        image: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-04b29bd1b72ab8ca.png",
        id: 3,
    },
];

export function Slider() {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    return (
        <div className="relative w-full overflow-hidden" style={{ height: "536px" }}>
            {/* Background image */}
            <img
                src={slides[current].image}
                alt="Slider background"
                className="absolute inset-0 w-full h-full object-cover"
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
                className="absolute left-8 top-1/2 -translate-y-1/2 z-10"
                style={{ filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.04))" }}
            >
                <img
                    src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-cc963c15911f1474.svg"
                    alt="Previous"
                    className="w-[52px] h-[52px]"
                />
            </button>

            {/* Next Button */}
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10"
                style={{ filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.04))" }}
            >
                <img
                    src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-a3dfb7bf0f0e4e1c.svg"
                    alt="Next"
                    className="w-[52px] h-[52px]"
                />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? "w-5 h-2 bg-white"
                                : "w-2 h-2 bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
