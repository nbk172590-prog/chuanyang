'use client'

import React from "react";
import {ProductGrid} from "@/app/shop/productGrid/page";
import {SidebarShop} from "@/app/shop/sidebar/page";
import PromoBar from "@/app/component/announcementBar/page";
import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";



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
            <FooterComponent />
        </main>
    );
}