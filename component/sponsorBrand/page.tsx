'use client'

import {useEffect, useRef, useState} from "react";

type Sponsor = {
    id: number;
    image: string;
};

const dataSponsor: Sponsor[] = [
    {id: 1, image: '/sponsorBrand/anh2.png'},
    {id: 2, image: '/sponsorBrand/anh1.png'},
    {id: 3, image: '/sponsorBrand/anh3.png'},
    {id: 4, image: '/sponsorBrand/anh4.png'},
    {id: 5, image: '/sponsorBrand/anh5.png'},
    {id: 6, image: '/sponsorBrand/anh6.png'},
];

export default function SponsorBrand() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);

    const ITEMS_PER_VIEW = 4;

    const maxIndex = Math.max(0, dataSponsor.length - ITEMS_PER_VIEW);

    const next = () => {
        setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Auto chạy
    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 3000);

        return () => clearInterval(interval);
    }, [maxIndex]);

    return (
        <section className="w-full relative overflow-hidden">

            {/* Slider */}
            <div
                ref={containerRef}
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${index * (100 / ITEMS_PER_VIEW)}%)`,
                }}
            >
                {dataSponsor.map((item) => (
                    <div
                        key={item.id}
                        className="w-1/4 flex items-center justify-center py-10"
                    >
                        <img
                            src={item.image}
                            alt=""
                            className="h-10 xl:h-12 object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}