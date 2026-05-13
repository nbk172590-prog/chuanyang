'use client'

import {useState} from "react";

import {ProductGrid} from "@/component/products/productGrid/page";
import PromoBar from "@/component/announcementBar/page";
import HeaderComponent from "@/component/hader/page";
import {SidebarShop} from "@/component/products/sidebar/page";
import FooterBackground from "@/component/footer/footerBg/page";
import FooterComponent from "@/component/footer/page";

/**
 * Reusable container
 */
const Container = ({
                       children,
                       className = "",
                   }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`
                mx-auto
                w-full
                max-w-360
                px-4
                md:px-8
                xl:px-20
                2xl:px-40
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default function ShopPage() {

    const [searchTerm, setSearchTerm] = useState("");

    const [activeCategory, setActiveCategory] =
        useState('Tất cả');

    const [activePrice, setActivePrice] =
        useState('Tất cả');

    return (
        <main className="bg-white min-h-screen">

            <PromoBar/>

            {/* HEADER */}
            <Container>
                <HeaderComponent/>
            </Container>

            {/* HERO IMAGE */}
            <img
                className="w-full h-auto object-cover"
                src="/bg_shop_Header.png"
                alt=""
            />

            {/* CONTENT */}
            <Container
                className="
                    flex gap-6
                    pt-6 md:pt-10 lg:pt-[60px]
                    pb-10 md:pb-16 lg:pb-[100px]
                "
            >

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

            </Container>

            <FooterBackground/>

            <FooterComponent/>

        </main>
    );
}