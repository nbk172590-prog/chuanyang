"use client";

import React from "react";
import {ArrowRight} from "lucide-react";
import ArticlesCard from "@/app/component/articlesCard/page";

function Preference() {
    const products = [
        {
            id: 1,
            name: "Ma Jia Hospital – Taipei City",
            image: "/imgArticles/1.png",
        },
        {
            id: 2,
            name: "Fuhua Hotel",
            image: "/imgArticles/2.png",
        },
        {
            id: 3,
            name: "Taiheyuan Housing Project – Changhua",
            image: "/imgArticles/3.png",
        },
    ];

    return (
        <section className="w-full">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Preference Project
                </h2>

                <a
                    href="#"
                    className="flex items-center gap-1 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-[#141718] w-fit"
                >
                    More Preference Project
                    <ArrowRight className="w-4 h-4"/>
                </a>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                    <ArticlesCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    );
}

export default Preference;
