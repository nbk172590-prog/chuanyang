'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  /**
   * INFO DATA
   */
  const items = [
    {
      label: 'Mã sản phẩm',
      value: product?.code || product?.name,
    },
    {
      label: 'Chế độ nước',
      value: product?.water || '-',
    },
    {
      label: 'Màu sắc',
      value: product?.color || '-',
    },
    {
      label: 'Vật liệu',
      value: product?.material || '-',
    },
  ];

  /**
   * IMAGE LIST
   */
  const thumbnails = product.images && product.images.length > 0 ? product.images : [product.image];

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
  const visibleThumbnails = thumbnails.slice(thumbStart, thumbStart + 4);
  const getPrirceFormatter = (price: number) => {
    return Number(price).toLocaleString('vi-VN') + ' ₫';
  };
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        {/* LEFT */}
        <div className="w-full shrink-0 lg:w-[345px]">
          {/* MAIN IMAGE */}
          <div className="relative h-[458px] w-full overflow-hidden rounded-2xl bg-[#F3F5F7]">
            <img
              src={thumbnails[activeImg]}
              alt={product.name}
              className="h-full w-full object-contain"
            />

            {/* PREV */}
            <button
              onClick={handlePrevImage}
              disabled={activeImg === 0}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {/* NEXT */}
            <button
              onClick={handleNextImage}
              disabled={activeImg === thumbnails.length - 1}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow transition hover:bg-white disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={20} />
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
                  className={`overflow-hidden rounded-xl border-2 bg-[#F3F5F7] transition-all duration-200 ${
                    activeImg === realIndex ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square w-full object-contain cursor-pointer"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-0 flex-1">
          <h1 className="text-[28px] font-bold uppercase leading-tight md:text-[40px]">
            {product.name}
          </h1>

          <div className="mt-5">
            <div className="inline-flex rounded-lg bg-[#FF5630] px-4 py-2 text-[14px] font-bold uppercase text-white">
              {product?.category}
            </div>
          </div>

          {/* PRICE */}
          {product.discountPrice && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="text-[28px] font-bold text-red-700">
                {getPrirceFormatter(product.discountPrice)}
              </div>
              <div className="text-[20px] font-semibold text-[#6C7275] line-through">
                {getPrirceFormatter(product.price)}
              </div>
            </div>
          )}
          {!product.discountPrice && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="text-[28px] font-bold text-red-700">
                {getPrirceFormatter(product.price)}
              </div>
            </div>
          )}

          {/* INFO */}
          {items.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {items.map((item, index) => (
                <div key={index} className="rounded-2xl bg-[#F3F5F7] px-4 py-6 text-center">
                  <p className="mb-3 text-sm text-[#6C7275]">{item.label}</p>

                  <h3 className="break-words text-lg font-semibold text-black md:text-xl">
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
