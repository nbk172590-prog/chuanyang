'use client'

import {Check} from "lucide-react";

interface SidebarShopProps {
    activeCategory: string;
    setActiveCategory: (value: string) => void;

    activePrice: string;
    setActivePrice: (value: string) => void;

    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export function SidebarShop({
                                activeCategory,
                                setActiveCategory,
                                activePrice,
                                setActivePrice,
                                searchTerm,
                                setSearchTerm,
                            }: SidebarShopProps) {

    const categories = [
        'Tất cả',
        'Phòng tắm / Sen cây tắm',
        'Lavabo / Nhà vệ sinh',
        'Nhà bếp',
        'Phụ kiện',
    ];

    const priceRanges = [
        'Tất cả',
        '0 - 3 triệu',
        '3 triệu - 10 triệu',
        'trên 10 triệu'
    ];

    return (
        <aside
            className="
                hidden lg:flex
                lg:w-[240px] xl:w-[260px] 2xl:w-[280px]
                shrink-0 flex-col
                gap-6 xl:gap-8 2xl:gap-10
            "
        >

            {/* SEARCH */}
            <div className="flex flex-col gap-3">

                <h3
                    className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    "
                >
                    Tìm kiếm
                </h3>

                <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={searchTerm || ""}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                        w-full
                        border border-gray-300
                        rounded-lg
                        px-4 py-2.5
                        text-[14px]
                        outline-none
                        focus:border-black
                        transition
                    "
                />

            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-4 xl:gap-5">

                <h3
                    className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    "
                >
                    Danh mục
                </h3>

                <ul className="flex flex-col gap-2 xl:gap-3">

                    {categories.map((cat) => (

                        <li key={cat}>

                            <button
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    text-left font-semibold transition
                                    text-[13px] xl:text-[14px] 2xl:text-[15px]

                                    ${activeCategory === cat
                                    ? 'text-[#121212] border-b border-[#121212] pb-[2px]'
                                    : 'text-[#807E7E] hover:text-[#121212]'
                                }
                                `}
                            >
                                {cat}
                            </button>

                        </li>

                    ))}

                </ul>

            </div>

            {/* PRICE */}
            <div className="flex flex-col gap-4 xl:gap-5">

                <h3
                    className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    "
                >
                    Giá tiền
                </h3>

                <ul className="flex flex-col gap-2 xl:gap-3">

                    {priceRanges.map((price) => (

                        <li
                            key={price}
                            onClick={() => setActivePrice(price)}
                            className="
                                flex justify-between items-center
                                cursor-pointer group
                            "
                        >

                            <span
                                className={`
                                    font-semibold transition
                                    text-[13px] xl:text-[14px] 2xl:text-[15px]

                                    ${activePrice === price
                                    ? 'text-[#121212]'
                                    : 'text-[#6C7275] group-hover:text-[#121212]'
                                }
                                `}
                            >
                                {price}
                            </span>

                            {/* CHECKBOX */}
                            <div
                                className={`
                                    w-4 h-4 xl:w-5 xl:h-5
                                    border rounded-sm
                                    flex items-center justify-center
                                    transition

                                    ${activePrice === price
                                    ? 'bg-black border-black'
                                    : 'border-gray-300 bg-white'
                                }
                                `}
                            >

                                {activePrice === price && (
                                    <Check
                                        className="
                                            w-3 h-3 xl:w-3.5 xl:h-3.5
                                            text-white
                                        "
                                        strokeWidth={3}
                                    />
                                )}

                            </div>

                        </li>

                    ))}

                </ul>

            </div>

        </aside>
    );
}