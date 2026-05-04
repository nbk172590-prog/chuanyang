"use client";

import React from "react";
import {ArrowRight} from "lucide-react";

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
                                   aspect-[4/3] md:aspect-auto"
                    />
                </div>

                {/* RIGHT: CONTENT */}
                <div className="bg-[#F3F5F7] flex flex-col justify-center
                                px-4 sm:px-6 md:px-12
                                py-8 md:py-0">

                    <p className="font-medium text-[#141718]
                                  text-2xl sm:text-3xl md:text-5xl
                                  mb-3 md:mb-4">
                        Superior Quality
                    </p>

                    <p className="text-[#141718]
                                  text-sm sm:text-base md:text-xl
                                  mb-5 md:mb-6 leading-relaxed">
                        Crafted from premium materials to ensure durability and a flawless
                        finish for your sanctuary.
                    </p>

                    <div>
                        <a
                            href="#"
                            className="flex items-center gap-1
                                       text-sm md:text-base 
                                       border-b border-[#141718] w-fit"
                        >
                            Shop Now
                            <ArrowRight className="w-4 h-4"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SuperiorQuality;