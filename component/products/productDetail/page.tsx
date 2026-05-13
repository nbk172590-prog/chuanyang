'use client';

import {useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Product} from '@/types/product';

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({
                                          product,
                                      }: ProductDetailProps) {

    /**
     * INFO DATA
     * có dữ liệu mới hiển thị
     */
    const items = [
        {
            label: 'Mã sản phẩm',
            value: product?.code || product?.name,
        },
        {
            label: 'Chế độ nước',
            value: product?.waterMode,
        },
        {
            label: 'Màu sắc',
            value: product?.color,
        },
        {
            label: 'Vật liệu',
            value: product?.material,
        },
    ]

    /**
     * IMAGE LIST
     */
    const thumbnails =
        product.images && product.images.length > 0
            ? product.images
            : [product.image];

    /**
     * ACTIVE IMAGE
     */
    const [activeImg, setActiveImg] = useState(0);

    /**
     * NEXT IMAGE
     */
    const handleNextImage = () => {

        if (activeImg >= thumbnails.length - 1) return;

        setActiveImg((prev) => prev + 1);
    };

    /**
     * PREV IMAGE
     */
    const handlePrevImage = () => {

        if (activeImg <= 0) return;

        setActiveImg((prev) => prev - 1);
    };

    /**
     * thumbnail hiển thị theo activeImg
     */
    const thumbStart =
        activeImg <= 1
            ? 0
            : activeImg >= thumbnails.length - 2
                ? Math.max(thumbnails.length - 4, 0)
                : activeImg - 1;

    /**
     * chỉ hiện 4 thumbnail
     */
    const visibleThumbnails = thumbnails.slice(
        thumbStart,
        thumbStart + 4
    );

    return (
        <section className="bg-white px-4 pt-4 md:px-8 lg:px-0">

            <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:gap-[63px] lg:px-[160px]">

                {/* LEFT */}
                <div className="w-full lg:w-[450px]">

                    {/* MAIN IMAGE */}
                    <div className="relative overflow-hidden rounded-[12px] bg-white">

                        <img
                            src={thumbnails[activeImg]}
                            alt={product.name}
                            className="aspect-square w-full object-contain"
                        />

                        {/* PREV */}
                        <button
                            onClick={handlePrevImage}
                            disabled={activeImg === 0}
                            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white disabled:opacity-30 cursor-pointer"
                        >
                            <ChevronLeft size={20}/>
                        </button>

                        {/* NEXT */}
                        <button
                            onClick={handleNextImage}
                            disabled={activeImg === thumbnails.length - 1}
                            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white disabled:opacity-30 cursor-pointer"
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </div>

                    {/* THUMBNAILS */}
                    <div className="mt-4 grid grid-cols-4 gap-3">

                        {visibleThumbnails.map((src, i) => {

                            const realIndex = thumbStart + i;

                            return (
                                <button
                                    key={realIndex}
                                    onClick={() => setActiveImg(realIndex)}
                                    className={`overflow-hidden rounded-[10px] border-2 transition ${
                                        activeImg === realIndex
                                            ? 'border-black'
                                            : 'border-transparent'
                                    }`}
                                >

                                    <img
                                        src={src}
                                        alt=""
                                        className="aspect-square w-full object-cover cursor-pointer"
                                    />

                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1">

                    <h1 className="mb-5 text-[28px] font-bold md:text-[40px] uppercase">
                        {product.name}
                    </h1>

                    <div
                        className="inline rounded-lg bg-[#FF5630] px-4 py-2 text-[14px] font-bold uppercase text-white">
                        {product?.category}
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <span className="text-[28px] font-bold text-red-700">
                            {product.price.toLocaleString('vi-VN')} đ
                        </span>
                            </div>
                            <div className="text-[20px] font-semibold text-[#6C7275] line-through">
                                {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                            </div>
                        </div>
                    </div>

                    {/* INFO */}
                    {items.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl bg-gray-100 px-4 py-6 text-center shadow-sm"
                                >

                                    <p className="mb-3 text-sm text-gray-500">
                                        {item.label}
                                    </p>

                                    <h3 className="text-xl font-medium text-black">
                                        {item.value}
                                    </h3>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}