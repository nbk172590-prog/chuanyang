"use client";

import React from "react";

function FooterComponent() {
    return (
        <footer className="w-full">

            {/* IMAGE */}
            <img
                src="/bg-ft.png"
                alt=""
                className="w-full h-auto object-cover"
            />

            {/* ===== DESKTOP ===== */}
            <div className="hidden md:block bg-[#141718] text-white">
                <div className="px-40 py-20">

                    <div className="flex items-center justify-between border-b border-[#6C7275] pb-6">
                        <p className="text-2xl">Chuan Yang Global</p>

                        <nav className="flex gap-10">
                            <a href="/">Home</a>
                            <a href="/shop">Shop</a>
                            <a href="/product">Product</a>
                            <a href="/contact-us">Contact Us</a>
                        </nav>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                        <div className="flex gap-7 text-[12px] text-[#E8ECEF]">
                            <p>Copyright © 2023 Chuan Yang Global</p>
                            <p className="text-white">Privacy Policy</p>
                            <p className="text-white">Terms of Use</p>
                        </div>

                        <div className="flex gap-4">
                            <img src="/instagram.png" />
                            <img src="/facebook.png" />
                            <img src="/youtube.png" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE ===== */}
            <div className="block md:hidden bg-[#141718] text-white text-center px-6 py-12">

                {/* Title */}
                <h2 className="text-lg font-semibold mb-2">
                    ChuanYang Global
                </h2>

                <div className="w-6 h-[1px] bg-white/40 mx-auto mb-4" />

                <p className="text-sm text-gray-300 mb-6">
                    Classy in every detail.
                </p>

                {/* Menu */}
                <div className="flex flex-col gap-4 mb-8 text-sm">
                    <a href="/">Home</a>
                    <a href="/shop">Shop</a>
                    <a href="/product">Product</a>
                    <a href="#">Blog</a>
                    <a href="/contact-us">Contact Us</a>
                </div>

                <div className="border-t border-white/20 mb-6" />

                {/* Social */}
                <div className="flex justify-center gap-6 mb-6">
                    <img src="/instagram.png" className="w-5 h-5" />
                    <img src="/facebook.png" className="w-5 h-5" />
                    <img src="/youtube.png" className="w-5 h-5" />
                </div>

                {/* Policy */}
                <div className="flex justify-center gap-4 text-xs text-gray-300 mb-2">
                    <p>Privacy Policy</p>
                    <p>Terms of Use</p>
                </div>

                {/* Copyright */}
                <p className="text-xs text-gray-400">
                    Copyright © 2023 3legant. All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default FooterComponent;