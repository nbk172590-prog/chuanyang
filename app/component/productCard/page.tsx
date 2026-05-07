'use client'

import {useRouter} from "next/navigation";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    isNew: boolean;
    discount?: number;
    code?: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();


    return (
        <div
            className="group relative bg-white border border-gray-100 rounded overflow-hidden cursor-pointer">
            {/* Image container */}
            <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: "100%" }}>
                <img
                    onClick={() =>router.push(`/products/${product.id}`) }
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
                {/* Stars */}
                {/*<div className="flex items-center gap-0.5 mb-0.5">*/}
                {/*    {Array.from({ length: 5 }).map((_, i) => (*/}
                {/*        <Star*/}
                {/*            key={i}*/}
                {/*            className="w-2.5 h-2.5"*/}
                {/*            fill={i < Math.floor(detail.rating) ? "#f59e0b" : "none"}*/}
                {/*            stroke={i < Math.floor(detail.rating) ? "#f59e0b" : "#d1d5db"}*/}
                {/*            strokeWidth={1.5}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}

                {/* Code / SKU */}
                {product.code && (
                    <p className="text-[11px] text-gray-500 leading-tight">{product.code}</p>
                )}

                {/* Name */}
                <p className="text-[11px] text-gray-700 leading-tight truncate">{product.name}</p>

                {/* Price */}
                <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[13px] font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
                    {product.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}

const sampleProduct: Product = {
    id: 0,
    name: "Sample Product",
    price: 49.99,
    rating: 4.5,
    reviewCount: 10,
    image: "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=650",
    isNew: true,
    discount: 20,
    code: "CY-SAMPLE",
};

function ProductCardPage() {
    return <ProductCard product={sampleProduct} />;
}

export default ProductCardPage;
