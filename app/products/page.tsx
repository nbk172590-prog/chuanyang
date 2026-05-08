'use client'

import React from "react";
import PromoBar from "@/component/announcementBar/page";
import HeaderComponent from "@/component/hader/page";
import {SidebarShop} from "@/component/products/sidebar/page";
import {ProductGrid} from "@/component/products/productGrid/page";
import FooterComponent from "@/component/footer/page";
import FooterBackground from "@/component/footer/footerBg/page";



export default function ShopPage() {
    return (
        <main className="bg-white min-h-screen">
                <PromoBar />
                <HeaderComponent />
            <img className={'w-full h-auto object-cover'} src="/bg_shop_Header.png" />
            <div className="flex gap-6 px-4 md:px-10 lg:px-[160px] pt-6 md:pt-10 lg:pt-[60px] pb-10 md:pb-16 lg:pb-[100px]">

                <SidebarShop />

                <div className="flex-1">
                    <ProductGrid />
                </div>

            </div>
            <FooterBackground/>
            <FooterComponent />
        </main>
    );
}