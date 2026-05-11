'use client'

import { useState } from "react";

import { ProductGrid } from "@/component/products/productGrid/page";
import PromoBar from "@/component/announcementBar/page";
import HeaderComponent from "@/component/hader/page";
import {SidebarShop} from "@/component/products/sidebar/page";
import FooterBackground from "@/component/footer/footerBg/page";
import FooterComponent from "@/component/footer/page";

export default function ShopPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const [activeCategory, setActiveCategory] =
        useState('Tất cả');

    const [activePrice, setActivePrice] =
        useState('Tất cả');

    return (
        <main className="bg-white min-h-screen">

            <PromoBar />
            <HeaderComponent />

            <img
                className="w-full h-auto object-cover"
                src="/bg_shop_Header.png"
                alt=""
            />

            <div className="flex gap-6 px-4 md:px-10 lg:px-[160px] pt-6 md:pt-10 lg:pt-[60px] pb-10 md:pb-16 lg:pb-[100px]">

                <SidebarShop
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    activePrice={activePrice}
                    setActivePrice={setActivePrice}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="flex-1">
                    <ProductGrid
                        activeCategory={activeCategory}
                        activePrice={activePrice}
                        searchTerm={searchTerm}
                    />
                </div>

            </div>

            <FooterBackground />
            <FooterComponent />

        </main>
    );
}