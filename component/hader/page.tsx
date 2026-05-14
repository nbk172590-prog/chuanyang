"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

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

    const pathname = usePathname();

    /**
     * Prevent body scroll when menu open
     */
    useEffect(() => {

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [open]);

    /**
     * Active route
     */
    const isActive = (path: string) => {

        if (path === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(path);
    };

    /**
     * Desktop nav style
     */
    const navClass = (path: string) =>
        `relative px-4 py-2 rounded-full text-sm md:text-[15px] transition-all duration-300 ${
            isActive(path)
                ? "bg-black text-white font-semibold shadow-sm"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
        }`;

    /**
     * Mobile nav style
     */
    const mobileNavClass = (path: string) =>
        `h-[58px] flex items-center px-1 border-b border-[#E5E7EB] text-[16px] transition-all duration-300 ${
            isActive(path)
                ? "font-semibold text-black translate-x-2"
                : "text-gray-500"
        }`;

    return (
        <>

            {/* HEADER */}
            <header className="sticky top-0 z-[9998] w-full border-b border-[#F3F5F7] bg-white/80 backdrop-blur-xl">

                <div className="mx-auto flex items-center justify-between py-4 px-4 md:px-6">

                    {/* LEFT */}
                    <div className="flex items-center gap-3">

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setOpen(true)}
                            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
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

                            <p className="text-lg md:text-2xl font-semibold text-emerald-950 uppercase tracking-wide">
                                CHUAN YANG
                            </p>

                        </Link>

                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-3">

                        <Link href="/" className={navClass("/")}>
                            Trang chủ
                        </Link>

                        <Link href="/products" className={navClass("/products")}>
                            Sản phẩm
                        </Link>

                        <Link href="/contact-us" className={navClass("/contact-us")}>
                            Liên hệ
                        </Link>

                    </nav>

                </div>

            </header>

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-[99999] md:hidden transition-all duration-300 ${
                    open
                        ? "visible opacity-100"
                        : "invisible opacity-0 pointer-events-none"
                }`}
            >

                {/* BACKDROP */}
                <div
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/45 backdrop-blur-sm"
                />

                {/* SIDEBAR */}
                <div
                    className={`relative h-full w-[88%] max-w-[320px] bg-white px-5 py-6 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >

                    {/* TOP */}
                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-[24px] font-semibold text-black">
                            ChuanYang Global
                        </h2>

                        <button
                            onClick={() => setOpen(false)}
                            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                        >
                            <X size={22} strokeWidth={1.8}/>
                        </button>

                    </div>

                    {/* SEARCH */}
                    <div className="relative mb-6">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]"
                        />

                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-[50px] rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] pl-12 pr-4 text-[15px] outline-none focus:border-black transition-all"
                        />

                    </div>

                    {/* MENU */}
                    <nav className="flex flex-col">

                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className={mobileNavClass("/")}
                        >
                            Trang chủ
                        </Link>

                        <Link
                            href="/products"
                            onClick={() => setOpen(false)}
                            className={mobileNavClass("/products")}
                        >
                            Sản phẩm
                        </Link>

                        <Link
                            href="/contact-us"
                            onClick={() => setOpen(false)}
                            className={mobileNavClass("/contact-us")}
                        >
                            Liên hệ
                        </Link>

                    </nav>

                    {/* SOCIAL */}
                    <div className="mt-auto pt-10 flex items-center justify-center gap-5">

                        <Link
                            href="https://www.facebook.com/thietbivesinhdailoanhanoi"
                            target="_blank"
                            className="w-11 h-11 rounded-full bg-[#F5F5F5] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                        >
                            <FaFacebookF size={18}/>
                        </Link>

                        <Link
                            href="/"
                            className="w-11 h-11 rounded-full bg-[#F5F5F5] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                        >
                            <FaInstagram size={18}/>
                        </Link>

                        <Link
                            href="/"
                            className="w-11 h-11 rounded-full bg-[#F5F5F5] hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                        >
                            <FaYoutube size={18}/>
                        </Link>

                    </div>

                </div>

            </div>

        </>
    );
}

export default HeaderComponent;