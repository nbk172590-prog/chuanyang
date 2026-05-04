'use client'

import React from 'react';
import {ArrowRight} from "lucide-react";
import ArticlesCard from "@/app/component/articlesCard/page";




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

        }
    ];

    return (
        <section className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight py-12">Articles Project </h2>
                <a
                    href="#"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors "
                    style={{fontSize: "16px", borderBottom: "1px solid #141718"}}
                >
                    More Articles
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {products.map((product) => (
                    <ArticlesCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default Articles;