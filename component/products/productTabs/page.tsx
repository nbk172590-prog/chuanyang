'use client';

import {useState} from 'react';
import {Product} from '@/types/product';

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({
                                        product,
                                    }: ProductTabsProps) {

    const [open, setOpen] = useState(true);

    /**
     * Specs data
     */

    console.log(product);
    const SPEC_ROWS = [
        {
            label: 'Chức năng',
            value: product.water || '-',
        },
        {
            label: 'Chất liệu',
            value: product.material || '-',
        },
        {
            label: 'Bề mặt',
            value: product.surface || '-',
        },
        {
            label: 'Dây cáp',
            value: product.cables || '-',
        },
        {
            label: 'Đầu lọc',
            value: product.filter_head || '-'
        },
        {
            label: 'Xuất xứ',
            value: 'TaiWan',
        },
    ].filter((item) => item.value);

    return (
        <section className="bg-white py-10">

            <div
                className="
                mx-auto
                flex
                flex-col
                gap-6
                px-4
                md:px-8
                lg:flex-row
                lg:items-start
                lg:px-0
                "
            >

                {/* DESCRIPTION */}
                <div
                    className="
                    order-2
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    gap-4
                    rounded-[12px]
                    bg-[#F3F5F7]
                    p-6

                    lg:order-1
                    "
                >

                    {/* HEADER */}
                    <div
                        className="
                        flex
                        cursor-pointer
                        select-none
                        items-center
                        justify-between
                        "
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

                        <div className="flex min-w-0 flex-col gap-5">

                            {/*/!* IMAGE *!/*/}
                            {/*<img*/}
                            {/*    src={product.image || '/placeholder.png'}*/}
                            {/*    alt={product.name}*/}
                            {/*    className="*/}
                            {/*    max-h-[500px]*/}
                            {/*    w-full*/}
                            {/*    rounded-[8px]*/}
                            {/*    object-cover*/}
                            {/*    "*/}
                            {/*/>*/}

                            {/* DETAILS */}
                            <div
                                className="
                                w-full
                                max-w-[696px]
                                overflow-hidden
                                break-words
                                whitespace-pre-wrap

                                text-[14px]
                                leading-6
                                text-[#141718]

                                md:text-[15px]
                                md:leading-7

                                [&_*]:max-w-full
                                [&_*]:break-words

                                [&_img]:h-auto
                                [&_img]:max-w-full
                                [&_img]:rounded-[8px]

                                [&_iframe]:max-w-full

                                [&_table]:block
                                [&_table]:w-full
                                [&_table]:overflow-x-auto

                                [&_ol]:list-decimal
                                [&_ol]:pl-5

                                [&_ul]:list-disc
                                [&_ul]:pl-5

                                [&_li]:mb-2

                                [&_a]:break-all
                                "
                                dangerouslySetInnerHTML={{
                                    __html:
                                        product.details ||
                                        '<p>Thông tin sản phẩm đang được cập nhật.</p>',
                                }}
                            />

                        </div>
                    )}

                </div>

                {/* SPECS */}
                <div
                    className="
                    order-1
                    flex
                    w-full
                    flex-col
                    gap-6
                    rounded-[12px]
                    bg-[#F3F5F7]
                    p-6

                    lg:order-2
                    lg:w-[360px]
                    lg:flex-shrink-0
                    "
                >

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

                                <span
                                    className="
                                    max-w-[180px]
                                    break-words
                                    text-right
                                    text-[14px]
                                    font-semibold
                                    text-black
                                    "
                                >
                                    {row.value}
                                </span>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}