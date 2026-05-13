'use client'

import {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

import {ProductGrid} from "@/component/products/productGrid/page";
import PromoBar from "@/component/announcementBar/page";
import HeaderComponent from "@/component/hader/page";
import {SidebarShop} from "@/component/products/sidebar/page";
import FooterBackground from "@/component/footer/footerBg/page";
import FooterComponent from "@/component/footer/page";

const Container = ({
                       children,
                   }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full px-4 md:px-10 lg:px-10 xl:px-40">
            {children}
        </div>
    );
}

function ShopContent() {

    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");

    const [activeCategory, setActiveCategory] =
        useState('Tất cả');

    const [activePrice, setActivePrice] =
        useState('Tất cả');

    useEffect(() => {

        const category = searchParams.get('category');

        if (category) {
            setActiveCategory(category);
        } else {
            setActiveCategory('Tất cả');
        }

    }, [searchParams]);

    return (
        <main className="bg-white min-h-screen">

            <PromoBar/>
            <Container>
                <HeaderComponent/>
            </Container>


            <img
                className="w-full h-auto object-cover"
                src="/baner_products.png"
                alt=""
            />

            <Container>
                <div className="flex flex-row items-start gap-6 pt-6 md:pt-10 lg:pt-15 pb-10 md:pb-16 lg:pb-25">

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
            </Container>

            <FooterBackground/>

            <FooterComponent/>

        </main>
    );
}

export default function ShopPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent/>
        </Suspense>
    );
}