'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import React from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const getDiscountPrice = () => {
    return product.price - (product.price * (product.discountPrice || 0)) / 100;
  };
  return (
    <div className="group relative bg-white overflow-hidden cursor-pointer">
      {/* Image container */}
      <div
        className="h-[249px] min-[1440px]:h-[359px] relative overflow-hidden bg-gray-50"
        style={{ paddingBottom: '100%' }}
      >
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
          {product.discountPrice && (
            <span className="bg-[#2ecc71] text-white text-[10px] font-bold px-1.5 py-0.5 leading-tight">
              -{product.discountPrice}%
            </span>
          )}
        </div>
      </div>

      {/* Product info */}

      <div className="p-2 pt-1.5">
        {/* Name */}
        <p className="text-[16px] text-[#141718] leading-tight truncate font-bold uppercase my-1">
          {product.name}
        </p>

        {/* Price */}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mt-0.5">
            {product.discountPrice ? (
              <React.Fragment>
                <span className="text-[14px] font-semibold text-[#B91C1C]">
                  {getDiscountPrice().toLocaleString('vi-VN')}đ
                </span>

                <span className="text-[14px] text-[#6C7275] line-through">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className="text-[14px] font-semibold text-[#B91C1C]">
                  {product.price?.toLocaleString('vi-VN')}đ
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
