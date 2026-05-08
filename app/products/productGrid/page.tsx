'use client'

import React, {useState} from "react";
import {ProductCard} from "@/app/products/productCard/page";

const products = [
    {
        id: 1,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-07c83db7535d213b.png',
        badges: [
            {text: 'Mới', bg: '#FFFFFF', color: '#FF5630'},
            {text: '-25%', bg: '#38CB89', color: '#FEFEFE'},
        ],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-2aadd681dcafdc24.svg',
        name: 'CY-3273',
        price: '$199.00',
        originalPrice: '$400.00',
    },
    {
        id: 2,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-e2d90efb26f35eea.png',
        badges: [
            {text: 'Mới', bg: '#FFFFFF', color: '#FF5630'},
            {text: '-30%', bg: '#38CB89', color: '#FEFEFE'},
        ],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-b610452d46604952.svg',
        name: 'CY-3273',
        price: '$299.00',
        originalPrice: '$500.00',
    },
    {
        id: 3,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-0e7d73e85cd8b30b.png',
        badges: [
            {text: 'NEW', bg: '#FFFFFF', color: '#FF5630'},
            {text: '-15%', bg: '#38CB89', color: '#FEFEFE'},
        ],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-9ffaf09285de888a.svg',
        name: 'CY-3273',
        price: '$19.00',
        originalPrice: null,
    },
    {
        id: 4,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-cdd7e1444b20743b.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-507b52f11d7a839a.svg',
        name: 'CY-3273',
        price: '$199.00',
        originalPrice: '$400.00',
    },
    {
        id: 5,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-523147d87c326dcc.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-1bb42b85e92e26cd.svg',
        name: 'CY-3273',
        price: '$19.00',
        originalPrice: null,
    },
    {
        id: 6,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-63b22b7cabf02e73.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-005cb9abc280474d.svg',
        name: 'CY-3273',
        price: '$299.00',
        originalPrice: '$500.00',
    },
    {
        id: 7,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-2db5a1a35d506093.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-001b05437945c9f1.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 8,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-9946494c198c8732.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-2f9a0d229496abe7.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 9,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 10,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 11,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 12,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 13,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
    {
        id: 14,
        image: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-91ff80d54dfd9641.png',
        badges: [],
        rating: 'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-53abc146897a9450.svg',
        name: 'CY-3273',
        price: '$89.99',
        originalPrice: null,
    },
];

function useResponsiveCount() {
    const [count, setCount] = useState(12);

    React.useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 1440) {
                setCount(12);
            } else if (window.innerWidth >= 768) {
                setCount(9);
            } else {
                setCount(6);
            }
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return count;
}


export function ProductGrid() {
    const baseCount = useResponsiveCount();
    const [visibleCount, setVisibleCount] = useState(baseCount);

    React.useEffect(() => {
        setVisibleCount(baseCount);
    }, [baseCount]);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + baseCount);
    };

    return (
        <div className="flex flex-col gap-10 flex-1">

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            {visibleCount < products.length && (
                <div className="flex justify-center">
                    <button
                        onClick={handleShowMore}
                        className="border rounded-full px-10 py-2 hover:bg-black hover:text-white transition"
                    >
                        Thêm sản phấm
                    </button>
                </div>
            )}

        </div>
    );
}