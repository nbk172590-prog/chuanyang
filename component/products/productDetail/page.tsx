'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {Product} from "@/types/product";


interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({
                                          product
                                      }: ProductDetailProps) {

    const [activeImg, setActiveImg] = useState(0);

    /**
     * index bắt đầu của thumbnail
     */
    const [thumbStart, setThumbStart] = useState(0);

    const thumbnails =
        product.images && product.images.length > 0
            ? product.images
            : [product.image];

    /**
     * Chỉ hiện 4 ảnh
     */
    const visibleThumbnails = thumbnails.slice(
        thumbStart,
        thumbStart + 4
    );


    /**
     * THUMBNAIL PREV
     */
    const handlePrevThumb = () => {

        if (thumbStart === 0) return;

        setThumbStart((prev) => prev - 1);
    };

    /**
     * THUMBNAIL NEXT
     */
    const handleNextThumb = () => {

        if (thumbStart + 4 >= thumbnails.length) return;

        setThumbStart((prev) => prev + 1);
    };

    return (
        <section className="bg-white px-4 pt-4 md:px-8 lg:px-0">

            <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:gap-[63px] lg:px-[160px]">

                {/* LEFT */}
                <div className="w-full lg:w-[450px]">

                    {/* MAIN IMAGE */}
                    <div className="relative overflow-hidden rounded-[12px] bg-[#F3F5F7]">

                        <img
                            src={thumbnails[activeImg]}
                            alt={product.name}
                            className="aspect-square w-full object-cover"
                        />


                    </div>

                    {/* THUMBNAILS */}
                    <div className="mt-4 flex items-center gap-3">

                        {/* THUMB PREV */}
                        <button
                            onClick={handlePrevThumb}
                            disabled={thumbStart === 0}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-white disabled:opacity-30"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {/* THUMB LIST */}
                        <div className="grid flex-1 grid-cols-4 gap-3">

                            {visibleThumbnails.map((src, i) => {

                                const realIndex = thumbStart + i;

                                return (
                                    <button
                                        key={realIndex}
                                        onClick={() => setActiveImg(realIndex)}
                                        className={`overflow-hidden rounded-[10px] border-2 ${
                                            activeImg === realIndex
                                                ? 'border-black'
                                                : 'border-transparent'
                                        }`}
                                    >

                                        <img
                                            src={src}
                                            alt=""
                                            className="aspect-square w-full object-cover"
                                        />

                                    </button>
                                );
                            })}
                        </div>

                        {/* THUMB NEXT */}
                        <button
                            onClick={handleNextThumb}
                            disabled={thumbStart + 4 >= thumbnails.length}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-white disabled:opacity-30"
                        >
                            <ChevronRight size={18} />
                        </button>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1">

                    <h1 className="text-[28px] font-bold md:text-[40px] mb-5">
                        {product.name}
                    </h1>

                    <div className="bg-[#FF5630] px-4 py-2 text-[14px] font-bold rounded-lg inline uppercase text-white">
                        {product?.category}
                    </div>
                    <div className="mt-4">

                        <span className="text-[28px] font-bold text-red-700">

                            {product.price.toLocaleString('vi-VN')}đ

                        </span>

                    </div>
                </div>
            </div>
        </section>
    );
}