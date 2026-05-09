'use client'

import {useRouter} from "next/navigation";
import {Product} from "@/types/product";



interface ProductCardProps {
    product: Product;
}

export function ProductCard({product}: ProductCardProps) {
    const router = useRouter();


    return (
        <div
            className="group relative bg-white border border-gray-100 rounded overflow-hidden cursor-pointer">
            {/* Image container */}
            <div className="relative overflow-hidden bg-gray-50" style={{paddingBottom: "100%"}}>
                <img
                    onClick={() => router.push(`/products/detail?id=${product.id}`)}
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Top badges row */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                        <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.5 leading-tight">
              Mới
            </span>
                    )}
                    {product.discount && (
                        <span className="bg-[#2ecc71] text-white text-[10px] font-bold px-1.5 py-0.5 leading-tight">
              -{product.discount}%
            </span>
                    )}
                </div>

            </div>

            {/* Product info */}
            <div className="p-2 pt-1.5">

                {/* Name */}
                <p className="text-[11px] text-gray-700 leading-tight truncate font-bold">{product.name}</p>

                {/* Code / SKU */}
                {product.description && (
                    <p className="text-[11px] text-gray-500 leading-tight">{product.description}</p>
                )}


                {/* Price */}
                <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[13px] font-semibold text-gray-900">
            {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
          </span>
                    {product.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}


