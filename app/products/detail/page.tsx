"use client";

import React, {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

import HeaderComponent from "@/component/hader/page";
import FooterComponent from "@/component/footer/page";
import {PromoBar} from "@/component/announcementBar/page";
import ProductTabs from "@/component/products/productTabs/page";
import ProductCarousel from "@/component/products/productCarousel/page";
import ProductDetail from "@/component/products/productDetail/page";
import StormService from "@/component/stormService/page";
import FooterBackground from "@/component/footer/footerBg/page";

import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase-config";
import {Product} from "@/types/product";

/**
 * Reusable layout container
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
                w-full
                px-4
                md:px-10
                lg:px-10
                xl:px-40
                ${className}
            `}
        >
            {children}
        </div>
    );
};

/**
 * Product Detail Loader
 */
function ProductDetailLoader({
                                 product,
                             }: {
    product: Product;
}) {
    return <ProductDetail product={product}/>;
}

function ProductScreenDetail() {

    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const [product, setProduct] = useState<Product | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    /**
     * GET PRODUCT BY ID
     */
    const getProductById = async () => {

        if (!id) {
            setLoading(false);
            return;
        }

        try {

            const docRef = doc(db, "products", id);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                const data = docSnap.data();

                setProduct({
                    id: docSnap.id,
                    ...data,
                } as Product);

            } else {

                console.log("Không tìm thấy sản phẩm");

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getProductById();

    }, [id]);

    if (loading) {
        return (
            <div className="py-10 text-center">
                Đang tải sản phẩm...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-10 text-center">
                Không tìm thấy sản phẩm
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen flex flex-col">

            <PromoBar/>

            {/* HEADER */}
            <Container>
                <HeaderComponent/>
            </Container>

            {/* PRODUCT DETAIL */}
            <Container className="pt-6 md:pt-10 pb-10">
                <ProductDetailLoader product={product}/>
            </Container>

            {/* PRODUCT TABS */}
            <Container className="pb-10">
                <ProductTabs product={product}/>
            </Container>

            {/* RELATED PRODUCTS */}
            <Container className="pb-14 md:pb-20">
                <ProductCarousel
                    currentProductId={product.id}
                    category={product.category}
                />
            </Container>

            {/* SERVICE */}
            <div className="w-full bg-[#F3F5F7] py-10 md:py-14">
                <Container>
                    <StormService/>
                </Container>
            </div>

            <FooterBackground/>

            <FooterComponent/>

        </main>
    );
}

export default function ProductScreen() {
    return (
        <Suspense
            fallback={
                <div className="py-8 text-center text-gray-500">
                    Đang tải chi tiết sản phẩm...
                </div>
            }
        >
            <ProductScreenDetail/>
        </Suspense>
    );
}