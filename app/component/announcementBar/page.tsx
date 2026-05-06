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
        <div className="relative w-full bg-[#F3F5F7] px-4 py-2">

            {/* Nội dung ở giữa */}
            <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium">
                <img src="/ticket-percent.png" alt=""/>

                <span className="text-[#343839]">
                    30% off storewide — Limited time!
                </span>

                <Link href="/shop" className="inline-flex items-center gap-1 mt-2 md:mt-3">
    <span className="text-sm md:text-base border-b border-[#141718]">
        Mua sắm ngay
    </span>
                    <ArrowRight className="w-4 h-4"/>
                </Link>

            </div>

            {/* Nút X bên phải */}
            <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
            >
                <X className="w-5 h-5 text-[#121212] cursor-pointer"/>
            </button>
        </div>
    );
}

export default PromoBar;