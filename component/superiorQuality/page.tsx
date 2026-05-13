"use client";

import React from "react";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

function SuperiorQuality() {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">

                {/* LEFT: IMAGE */}
                <div className="w-full h-full">
                    <img
                        src="/paste_image.png"
                        alt=""
                        className="w-full h-full object-cover
                                   aspect-4/3 md:aspect-auto"
                    />
                </div>

                {/* RIGHT: CONTENT */}
                <div className="bg-[#F3F5F7] flex flex-col justify-center
                                px-4 sm:px-6 md:px-12
                                py-8 md:py-0">

                    <p className="font-bold text-[#141718]
                                  text-2xl sm:text-3xl md:text-5xl
                                  mb-3 md:mb-4">
                        Chất lượng vượt trội
                    </p>

                    <p className="text-[#141718]
                                  text-sm sm:text-base md:text-xl
                                  mb-5 md:mb-6 leading-relaxed">
                        Được chế tác từ vật liệu cao cấp để đảm bảo độ bền và lớp hoàn thiện hoàn hảo cho không gian
                        nghỉ dưỡng của bạn.
                    </p>

                    <div>
                        <Link href="/products" className="inline-flex items-center gap-1 mt-2 md:mt-3">
    <span className="text-sm md:text-base border-b border-[#141718]">
        Mua sắm ngay
    </span>
                            <ArrowRight className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SuperiorQuality;