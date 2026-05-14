'use client';

import {useEffect, useState} from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import {db} from "@/firebase-config";

import {ProductCard} from "@/component/products/productCard/page";
import {Product} from "@/types/product";

interface ProductCarouselProps {
    currentProductId: string;
    category?: string;
}

export default function ProductCarousel({
                                            currentProductId,
                                            category,
                                        }: ProductCarouselProps) {

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    /**
     * GET RELATED PRODUCTS
     */
    const getRelatedProducts = async () => {

        if (!category) {
            setLoading(false);
            return;
        }

        try {

            const q = query(
                collection(db, "products"),
                where("category", "==", category)
            );

            const querySnapshot = await getDocs(q);

            const relatedProducts: Product[] = [];

            querySnapshot.forEach((docItem) => {

                /**
                 * bỏ sản phẩm hiện tại
                 */
                if (docItem.id !== currentProductId) {

                    relatedProducts.push({
                        id: docItem.id,
                        ...docItem.data(),
                    } as Product);
                }
            });

            setProducts(relatedProducts);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getRelatedProducts();

    }, [category, currentProductId]);

    /**
     * LOADING
     */
    if (loading) {
        return (
            <div className="py-10 text-center">
                Đang tải sản phẩm liên quan...
            </div>
        );
    }

    /**
     * EMPTY
     */
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-white">

            {/* HEADER */}
            <div className="mb-8 md:mb-12 flex items-center justify-between gap-4">

                <h2
                    className="
                        text-[24px]
                        md:text-[28px]
                        font-bold
                        tracking-[-0.6px]
                        text-black
                    "
                >
                    Sản phẩm liên quan
                </h2>

                <Link
                    href={`/products?category=${encodeURIComponent(category || '')}`}
                    className="
                        flex
                        items-center
                        gap-1
                        border-b
                        border-[#141718]
                        text-[14px]
                        md:text-[16px]
                        font-medium
                        text-[#141718]
                        whitespace-nowrap
                    "
                    scroll={true}
                >
                    Xem thêm

                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-a2fe441ea9e57d54.svg"
                        alt=""
                        width={20}
                        height={20}
                    />
                </Link>
            </div>

            {/* PRODUCTS */}
            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                    md:grid-cols-3
                    lg:grid-cols-4
                "
            >

                {[...products]
                    .sort((a, b) => {

                        const dateA = a.createdAt
                            ? new Date(a.createdAt).getTime()
                            : 0;

                        const dateB = b.createdAt
                            ? new Date(b.createdAt).getTime()
                            : 0;

                        return dateB - dateA;
                    })
                    .slice(0, 4)
                    .map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))}

            </div>

        </section>
    );
}