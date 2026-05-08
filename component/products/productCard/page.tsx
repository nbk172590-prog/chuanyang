'use client'

import React from "react";
import {useRouter} from "next/navigation";

type Badge = {
    text: string;
    bg: string;
    color: string;
};

type ProductCardProps = {
    image: string;
    badges?: Badge[];
    rating: string;
    name: string;
    price: string;
    originalPrice?: string | null;
    id: number;
};

export function ProductCard({
                                image,
                                badges = [],
                                name,
                                price,
                                originalPrice,
                                id
                            }: ProductCardProps) {

    const router = useRouter();

    return (
        <div className="flex flex-col w-full">

            {/* Image */}
            <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden cursor-pointer">
                <img
                    onClick={() =>router.push(`/products/detail?id=${id}`) }
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />

                {badges.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {badges.map((badge, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs font-bold uppercase rounded"
                                style={{backgroundColor: badge.bg, color: badge.color}}
                            >
                {badge.text}
              </span>
                        ))}
                    </div>
                )}
            </div>
            {/* Info */}
            <div className="flex flex-col gap-1 pt-3">

                <p className="font-semibold text-[16px] text-[#141718]">
                    {name}
                </p>

                <div className="flex items-center gap-2">
          <span className="font-semibold text-[14px] text-[#121212]">
            {price}
          </span>

                    {originalPrice && (
                        <span className="text-[14px] text-[#6C7275] line-through">
              {originalPrice}
            </span>
                    )}
                </div>
            </div>

        </div>
    );
}