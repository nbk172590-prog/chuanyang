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

            {/* CONTENT CENTER */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-sm md:text-base font-medium">

                <img src="/ticket-percent.png" alt="" />

                <span className="text-[#343839] whitespace-nowrap mr-2">
            30% off storewide — Limited time!
        </span>

                <Link href="/products" className="inline-flex items-center gap-1">
    <span className="text-[#377DFF] border-b border-[#377DFF]">
        Mua sắm ngay
    </span>
                    <ArrowRight className="w-4 h-4 text-[#377DFF]" />
                </Link>

            </div>

            {/* CLOSE BUTTON */}
            <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition"
            >
                <X className="w-5 h-5 text-[#121212]" />
            </button>
        </div>
    );
}

export default PromoBar;