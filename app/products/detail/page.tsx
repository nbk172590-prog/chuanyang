"use client"
import HeaderComponent from "@/component/hader/page";
import FooterComponent from "@/component/footer/page";
import {PromoBar} from "@/component/announcementBar/page";
import { Suspense } from "react";
import ProductTabs from "@/component/products/productTabs/page";
import ProductCarousel from "@/component/products/productCarousel/page";
import ProductDetail from "@/component/products/productDetail/page";
import StormService from "@/component/stormService/page";
import FooterBackground from "@/component/footer/footerBg/page";
import { useSearchParams } from "next/navigation";


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
function ProductDetailLoader() {
    const searchParams = useSearchParams();

    return (
        <>
            <ProductDetail />
        </>
    );
}

export default function ProductScreen() {
    return (
        <div>
            <PromoBar/>
            <HeaderComponent/>
            <Suspense fallback={<div className="py-8 text-center text-gray-500">Đang tải chi tiết sản phẩm...</div>}>
                <ProductDetailLoader />
            </Suspense>
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

