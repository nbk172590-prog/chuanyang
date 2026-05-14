"use client";

import React, {useEffect, useState} from "react";
import {X, ArrowRight} from "lucide-react";
import Link from "next/link";

export function PromoBar() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const isHidden = localStorage.getItem("promo-hidden");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (isHidden) setVisible(false);
    }, []);

    const handleClose = () => {
        localStorage.setItem("promo-hidden", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="relative w-full bg-[#F3F5F7] px-4 py-5">

            {/* CONTENT */}
            <div
                className="absolute left-1/2 top-1/2 flex w-[calc(100%-60px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 text-center text-[12px] font-medium md:text-base">

                <img src="/ticket-percent.png" alt="" className="h-5 w-5 flex-shrink-0"/>

                <span className="mr-1 text-[#343839]">
                    30% Giảm giá toàn cửa hàng
                </span>

                <Link href="/products" className="inline-flex items-center gap-1 whitespace-nowrap">

                    <span className="border-b border-[#377DFF] text-[#377DFF]">
                        Mua sắm ngay
                    </span>

                    <ArrowRight className="h-4 w-4 text-[#377DFF]"/>

                </Link>
            </div>

            {/* CLOSE BUTTON */}
            <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition hover:opacity-70"
            >
                <X className="h-5 w-5 text-[#121212]"/>
            </button>
        </div>
    );
}

export default PromoBar;