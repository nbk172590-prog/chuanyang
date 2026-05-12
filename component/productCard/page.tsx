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
            className="group relative bg-white overflow-hidden cursor-pointer">
            {/* Image container */}
            <div className="relative overflow-hidden bg-gray-50" style={{paddingBottom: "100%"}}>
                <img
                    onClick={() => router.push(`/products/detail?id=${product.id}`)}
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
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
                <p className="text-[16px] text-[#141718] leading-tight truncate font-bold uppercase my-1">{product.name}</p>

                {/* Price */}

                <div className="flex items-center gap-3">

                    <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[14px] font-semibold text-[#B91C1C]">
            {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
          </span>
                        {product.originalPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
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


