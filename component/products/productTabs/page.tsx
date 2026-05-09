'use client';

import {useState} from 'react';
import {Product} from "@/types/product";


interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({
                                        product
                                    }: ProductTabsProps) {

    const [open, setOpen] = useState(true);

    /**
     * Specs data từ product
     */
    const SPEC_ROWS = [
        {
            label: 'Chức năng',
            value: product.waterMode || 'Nóng lạnh',
        },
        {
            label: 'Chất liệu',
            value: product.material || 'Chrome',
        },
        {
            label: 'Màu sắc',
            value: product.colors || 'Chrome',
        },
        {
            label: 'Mã sản phẩm',
            value: product.code || product.id,
        },
        {
            label: 'Danh mục',
            value: product.category || 'Đang cập nhật',
        },
    ];

    const formatDetails = (text?: string) => {

        if (!text) {
            return "<p>Thông tin sản phẩm đang được cập nhật.</p>";
        }

        /**
         * detect numbered list
         */
        const lines = text.split("\n");

        const isNumberList = lines.every((line) =>
            /^\d+\./.test(line.trim())
        );

        if (isNumberList) {

            const items = lines
                .map((line) =>
                    line.replace(/^\d+\.\s*/, "")
                )
                .map((item) => `<li>${item}</li>`)
                .join("");

            return `<ol>${items}</ol>`;
        }

        /**
         * normal paragraph
         */
        return `<p>${text}</p>`;
    };

    return (
        <section className="bg-white py-10">

            <div
                className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 md:px-8 min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:px-[160px]">

                {/* SPECS */}
                <div
                    className="order-1 flex w-full flex-col gap-6 rounded-[12px] bg-[#F3F5F7] p-6 min-[1440px]:order-2 min-[1440px]:w-[400px] min-[1440px]:flex-shrink-0">

                    <h3 className="text-[16px] font-semibold text-black">
                        Thông số kỹ thuật
                    </h3>

                    <div className="flex flex-col gap-4">

                        {SPEC_ROWS.map((row, i) => (

                            <div
                                key={i}
                                className={`flex items-center justify-between border-b border-[rgba(108,114,117,0.25)] pb-4 ${
                                    i === SPEC_ROWS.length - 1
                                        ? 'border-b-0 pb-0'
                                        : ''
                                }`}
                            >

                                <span className="text-[14px] text-black">
                                    {row.label}
                                </span>

                                <span className="text-[14px] font-semibold text-black text-right">
                                    {row.value}
                                </span>

                            </div>
                        ))}
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div
                    className="order-2 flex flex-1 flex-col gap-4 rounded-[12px] bg-[#F3F5F7] p-6 min-[1440px]:order-1">

                    {/* HEADER */}
                    <div
                        className="flex cursor-pointer select-none items-center justify-between"
                        onClick={() => setOpen(!open)}
                    >

                        <span className="text-[16px] font-semibold text-black">
                            Thông tin sản phẩm
                        </span>

                        <div
                            className={`transition-transform duration-300 ${
                                open ? 'rotate-0' : 'rotate-180'
                            }`}
                        >
                            ↓
                        </div>
                    </div>

                    {/* CONTENT */}
                    {open && (

                        <div className="flex flex-col gap-5">

                            {/* IMAGE */}
                            <img
                                src={product.image || '/placeholder.png'}
                                alt={product.name}
                                className="max-h-[500px] w-full rounded-[8px] object-cover"
                            />

                            {/* NAME */}
                            <h2 className="text-[24px] font-bold text-[#141718]">
                                {product.name}
                            </h2>

                            {/* details */}
                            <div
                                className="max-w-none text-[15px] leading-7 text-[#141718]
    [&_ol]:list-decimal
    [&_ol]:pl-5
    [&_ul]:list-disc
    [&_ul]:pl-5
    [&_li]:mb-2"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        product.details ||
                                        '<p>Thông tin sản phẩm đang được cập nhật.</p>',
                                }}
                            />

                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}