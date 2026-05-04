import React from "react";
import { ArrowRight } from "lucide-react";

function SuperiorQuality() {
    return (
        <div className="grid grid-cols-2">
            {/* Bên trái: ảnh */}
            <div>
                <img
                    src="/paste_image.png"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Bên phải: nội dung */}
            <div className="bg-[#F3F5F7] flex flex-col justify-center px-12">
                <p className="font-medium text-[#141718] text-5xl mb-4">
                    Superior Quality
                </p>

                <p className="text-[#141718] text-xl mb-6">
                    Crafted from premium materials to ensure durability and a flawless
                    finish for your sanctuary.
                </p>

                <div>
                    <a
                        href="#"
                        className="flex items-center gap-1 text-[16px] border-b border-[#141718] w-fit"
                    >
                        Shop Now
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SuperiorQuality;