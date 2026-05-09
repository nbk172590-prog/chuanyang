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
                   }: {
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full px-4 md:px-8 xl:px-20 2xl:px-40 pb-10 flex flex-col gap-8 items-center">
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

export default function ProductScreen() {

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

        getProductById()

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
        <div>

            <PromoBar/>

            <HeaderComponent/>

            <Suspense
                fallback={
                    <div className="py-8 text-center text-gray-500">
                        Đang tải chi tiết sản phẩm...
                    </div>
                }
            >
                <ProductDetailLoader product={product}/>
            </Suspense>

            <ProductTabs product={product}/>

            <ProductCarousel
                currentProductId={product.id}
                category={product.category}
            />

            <Container>
                <StormService/>
            </Container>

            <FooterBackground/>

            <FooterComponent/>

        </div>
    );
}