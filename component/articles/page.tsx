"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ArticlesCard from "../articlesCard/page";

function Articles() {
    const products = [
        {
            id: 1,
            name: "7 ways to maintain your luxury faucets",
            image: "/imagePeference/1.png",
        },
        {
            id: 2,
            name: "Kitchen organization",
            image: "/imagePeference/2.png",
        },
        {
            id: 3,
            name: "Decor your bedroom",
            image: "/imagePeference/3.png",
        },
    ];

    return (
        <section className="w-full">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Articles
                </h2>

                <a
                    href="#"
                    className="flex items-center gap-1 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-[#141718] w-fit"
                >
                    Xem thêm
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                    <ArticlesCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default Articles;