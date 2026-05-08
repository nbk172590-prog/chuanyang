import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";
import {PromoBar} from "@/app/component/announcementBar/page";
import React from "react";
import ProductTabs from "@/app/products/productTabs/page";
import ProductCarousel from "@/app/products/productCarousel/page";
import ProductDetail from "@/app/products/productDetail/page";
import StormService from "@/app/component/stormService/page";
import FooterBackground from "@/app/component/footer/footerBg/page";


/**
 * Reusable layout container
 */
const Container = ({children}: { children: React.ReactNode }) => {
    return (
        <div
            className="w-full px-4 md:px-8 xl:px-20 2xl:px-40 pb-10 flex flex-col gap-8 items-center">
            {children}
        </div>
    );
};
export default function ProductScreen() {
    return (
        <div>
            <PromoBar/>
            <HeaderComponent/>
            <ProductDetail/>
            <ProductTabs/>
            <ProductCarousel/>
            <Container>
                <StormService/>
            </Container>
            <FooterBackground/>
            <FooterComponent/>
        </div>
    );
}
