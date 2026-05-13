"use client";

import React, {useState} from "react";
import Link from "next/link";
import {
    X,
    Search,
} from "lucide-react";

import {
    FaFacebookF,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa";

function HeaderComponent() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-[#F3F5F7]">
            <div className="mx-auto flex items-center justify-between py-4 px-4 md:px-6">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setOpen(true)}
                        className="md:hidden w-6 h-6 flex items-center justify-center text-xl"
                    >
                        ☰
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <img
                            className="w-8 h-5 md:w-10 md:h-6 object-contain"
                            src="/icon.png"
                            alt="logo"
                        />

                        <p className="text-lg md:text-2xl font-semibold text-emerald-950 uppercase">
                            CHUAN YANG
                        </p>
                    </Link>

                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-sm md:text-base font-medium hover:opacity-80">
                        Trang chủ
                    </Link>

                    <Link href="/products" className="text-sm md:text-base font-medium hover:opacity-80">
                        Sản phẩm
                    </Link>

                    <Link href="/contact-us" className="text-sm md:text-base font-medium hover:opacity-80">
                        Liên hệ
                    </Link>
                </nav>

            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/30 md:hidden">

                    <div className="h-full w-[88%] max-w-[320px] bg-[#FAFAFA] px-5 py-6 flex flex-col">

                        {/* Top */}
                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-[24px] font-semibold text-black">
                                ChuanYang Global
                            </h2>

                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 flex items-center justify-center"
                            >
                                <X size={22} strokeWidth={1.8}/>
                            </button>

                        </div>

                        {/* Search */}
                        <div className="relative mb-6">

                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                            />

                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full h-[50px] rounded-lg border border-[#9CA3AF] bg-transparent pl-12 pr-4 text-[15px] outline-none"
                            />

                        </div>

                        {/* Menu */}
                        <nav className="flex flex-col">

                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="h-[58px] flex items-center border-b border-[#E5E7EB] text-[16px] text-black"
                            >
                                Home
                            </Link>

                            <Link
                                href="/products"
                                onClick={() => setOpen(false)}
                                className="h-[58px] flex items-center border-b border-[#E5E7EB] text-[16px] text-black"
                            >
                                Products
                            </Link>

                            <Link
                                href="/contact-us"
                                onClick={() => setOpen(false)}
                                className="h-[58px] flex items-center border-b border-[#E5E7EB] text-[16px] text-black"
                            >
                                Contact Us
                            </Link>

                        </nav>

                        {/* Bottom Social */}
                        <div className="mt-auto pt-10 flex items-center justify-center gap-7">

                            <Link
                                href="https://www.facebook.com/thietbivesinhdailoanhanoi"
                                target="_blank"
                            >
                                <FaFacebookF size={20}/>

                            </Link>

                            <Link href="/">
                                <FaInstagram size={20}/>
                            </Link>

                            <Link href="/">
                                <FaYoutube size={20}/>
                            </Link>

                        </div>

                    </div>

                </div>
            )}
        </header>
    );
}

export default HeaderComponent;