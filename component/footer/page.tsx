"use client";

import React from "react";

function FooterComponent() {
    return (
        <footer className="w-full">

            {/* Background */}

            {/* ===== DESKTOP ===== */}
            <div className="hidden md:block bg-[#0F1416] text-white">
                <div className="max-w-[1440px] mx-auto px-10 xl:px-[160px] py-16 xl:py-20">

                    {/* TOP */}
                    <div className="flex flex-col gap-10">

                        {/* Header row */}
                        <div className="flex justify-between items-start gap-10">

                            {/* LEFT: Title + Contact */}
                            <div className="flex flex-col gap-6 max-w-[500px]">

                                <h2 className="text-[28px] font-semibold">
                                    Chuan Yang Global
                                </h2>

                                <div className="flex flex-col gap-4">

                                    <div className="flex items-center gap-3">
                                        <img src="/dienthoai.png" className="w-5 h-5"/>
                                        <p className="text-[15px] text-[#E8ECEF]">
                                            +84 971 617 101
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src="/email.png" className="w-5 h-5"/>
                                        <p className="text-[15px] text-[#E8ECEF]">
                                            chuanyangvn@gmail.com
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <img src="/diachi.png" className="w-5 h-5 mt-[3px]"/>
                                        <p className="text-[14px] text-[#E8ECEF] leading-6">
                                            Y01-L13, An Phú Shop Villa KĐT Dương Nội, Hà Đông,
                                            Hanoi, Viet Nam
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* RIGHT: MENU */}
                            <nav className="flex gap-10 text-[15px] font-medium">
                                <a href="/" className="hover:opacity-80">Trang chủ</a>
                                <a href="/products" className="hover:opacity-80">Sản phẩm</a>
                                <a href="/contact-us" className="hover:opacity-80">Liên hệ</a>
                            </nav>

                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-[#2A2F2F]"/>

                        {/* BOTTOM */}
                        <div className="flex items-center justify-between">

                            <p className="text-[14px] text-[#A3A3A3]">
                                Copyright © 2023 Chuan Yang Global All rights reserved
                            </p>

                            <div className="flex gap-8 text-[14px]">
                                <p className="text-white hover:opacity-80">
                                    Chính sách bảo mật
                                </p>
                                <p className="text-white hover:opacity-80">
                                    Điều khoản sử dụng
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* ===== MOBILE ===== */}
            <div className="block md:hidden bg-[#0F1416] text-white px-6 py-12">

                <div className="flex flex-col items-center text-center gap-6">

                    <h2 className="text-xl font-semibold">
                        Chuan Yang Global
                    </h2>

                    <div className="w-8 h-[1px] bg-white/40"/>

                    {/* Menu (mobile giữ lại) */}
                    <div className="flex flex-col gap-4 text-sm">
                        <a href="/">Trang chủ</a>
                        <a href="/product">Sản phẩm</a>
                        <a href="/contact-us">Liên hệ</a>
                    </div>

                    <div className="w-full h-[1px] bg-white/20"/>

                    {/* Contact */}
                    <div className="flex flex-col gap-4 text-sm text-[#E8ECEF]">

                        <div className="flex items-center justify-center gap-2">
                            <img src="/dienthoai.png" className="w-4 h-4"/>
                            <span>+84 234 567 890</span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <img src="/email.png" className="w-4 h-4"/>
                            <span>hello@chuanyang.com</span>
                        </div>

                        <div className="flex items-start justify-center gap-2 px-4">
                            <img src="/diachi.png" className="w-4 h-4 mt-[3px]"/>
                            <span className="leading-5">
                Y01-L13, An Phú Shop Villa KĐT Dương Nội,
                Hà Đông, Hanoi, Viet Nam
              </span>
                        </div>

                    </div>

                    <div className="w-full h-[1px] bg-white/20"/>

                    <div className="flex gap-6 text-xs text-gray-300">
                        <p>Chính sách bảo mật</p>
                        <p>Điều khoản sử dụng</p>
                    </div>

                    <p className="text-xs text-gray-400">
                        Copyright © 2023 Chuan Yang Global
                    </p>

                </div>
            </div>

        </footer>
    );
}

export default FooterComponent;