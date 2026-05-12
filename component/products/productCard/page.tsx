'use client';

import React from "react";
import {useRouter} from "next/navigation";
import {Product} from "@/types/product";


interface ProductCardProps {
    product: Product;
}

export function ProductCard({
                                product
                            }: ProductCardProps) {

    const router = useRouter();

    return (
        <div className="flex w-full flex-col">

            {/* IMAGE */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#F3F5F7]">

                <img
                    onClick={() =>
                        router.push(`/products/detail?id=${product.id}`)
                    }
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="h-full w-full cursor-pointer object-cover transition duration-300 hover:scale-105"
                />

                {/* BADGES */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">

                    {/* NEW */}
                    {product.isNew && (

                        <span
                            className="rounded bg-white px-3 py-1 text-xs font-bold uppercase text-[#141718] shadow-sm">
                            NEW
                        </span>

                    )}

                    {/* DISCOUNT */}
                    {product.discount && (

                        <span
                            className="rounded bg-[#38CB89] px-3 py-1 text-xs font-bold uppercase text-white shadow-sm">
                            -{product.discount}%
                        </span>

                    )}

                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col gap-1 pt-3">

                {/* NAME */}
                <p className="line-clamp-2 text-[16px] font-semibold text-[#141718] uppercasea">
                    {product.name}
                </p>

                {/* PRICE */}
                <div className="flex items-center gap-3">
                    <div className="mt-1 flex items-center gap-2 flex-wrap">

                    <span className="text-[14px] font-semibold text-[#B91C1C]">

                        {product.price?.toLocaleString("vi-VN")}đ

                    </span>

                        {product.originalPrice && (

                            <span className="text-[14px] text-[#6C7275] line-through">

                            {product.originalPrice.toLocaleString("vi-VN")}đ

                        </span>

                        )}

                    </div>

                    <div className="text-[14px] font-semibold text-[#6C7275] line-through">
                        {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                    </div>
                </div>
            </div>
        </div>
    );
}