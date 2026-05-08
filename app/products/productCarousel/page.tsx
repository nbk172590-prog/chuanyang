'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/app/products/productCard/page";

const PRODUCTS = [
    {
        id: 1,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-47705805e7ec9613.png",
        name: "CY-3273",
        price: "$199.00",
        originalPrice: "$400.00",
        rating: "5.0",
        badges: [
            {
                text: "NEW",
                bg: "#FFFFFF",
                color: "#141718",
            },
            {
                text: "-25%",
                bg: "#38CB89",
                color: "#FEFEFE",
            },
        ],
    },
    {
        id: 2,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-c1ee0a920c9ed505.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [],
    },
    {
        id: 3,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-d5a515e4cb4c2486.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [],
    },
    {
        id: 4,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-4c64d21b0e9fe751.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [],
    },
    {
        id: 5,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-65940709ffd60527.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [
            {
                text: "NEW",
                bg: "#FFFFFF",
                color: "#141718",
            },
            {
                text: "-25%",
                bg: "#38CB89",
                color: "#FEFEFE",
            },
        ],
    },
    {
        id: 6,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-65940709ffd60527.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [
            {
                text: "NEW",
                bg: "#FFFFFF",
                color: "#141718",
            },
            {
                text: "-25%",
                bg: "#38CB89",
                color: "#FEFEFE",
            },
        ],
    },
    {
        id: 7,
        image:
            "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-d5a515e4cb4c2486.png",
        name: "CY-3273",
        price: "$24.99",
        originalPrice: null,
        rating: "5.0",
        badges: [],
    },
];

export default function ProductCarousel() {
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % PRODUCTS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const getVisibleProducts = (count: number) => {
        const duplicated = [...PRODUCTS, ...PRODUCTS];

        return duplicated.slice(startIndex, startIndex + count);
    };

    return (
        <section className="overflow-hidden bg-white px-4 py-10 md:px-8 xl:px-20">
            <div className="mb-12 flex items-end justify-between">
                <h2 className="font-poppins text-[28px] font-medium leading-[34px] tracking-[-0.6px] text-black">
                    Bạn cũng có thể thích
                </h2>

                <Link
                    href="/products"
                    className="flex items-center gap-1 border-b border-[#141718] font-inter text-[16px] font-medium leading-7 tracking-[-0.4px] text-[#141718]"
                >
                    Thêm sản phẩm

                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-a2fe441ea9e57d54.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            {/* Mobile: 2 items */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
                {getVisibleProducts(2).map((p, index) => (
                    <ProductCard key={`${p.id}-${index}`} {...p} />
                ))}
            </div>

            {/* Tablet / Laptop: 4 items */}
            <div className="hidden grid-cols-4 gap-4 lg:grid xl:hidden">
                {getVisibleProducts(4).map((p, index) => (
                    <ProductCard key={`${p.id}-${index}`} {...p} />
                ))}
            </div>

            {/* >= 1440px: 6 items */}
            <div className="hidden grid-cols-6 gap-4 min-[1440px]:grid">
                {getVisibleProducts(6).map((p, index) => (
                    <ProductCard key={`${p.id}-${index}`} {...p} />
                ))}
            </div>
        </section>
    );
}