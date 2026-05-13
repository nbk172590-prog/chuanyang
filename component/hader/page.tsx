"use client";

import React, { useState } from "react";
import Link from "next/link";

function HeaderComponent() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b border-[#F3F5F7]">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between py-4 px-4 md:px-6">

                {/* LEFT GROUP */}
                <div className="flex items-center gap-3">

                    {/* Hamburger (mobile LEFT) */}
                    <button
                        onClick={() => setOpen(true)}
                        className="order-1 md:hidden w-6 h-6 flex items-center justify-center"
                    >
                        ☰
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="order-2 md:order-1 flex items-center gap-2"
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

                {/* DESKTOP NAV (giữ nguyên giữa) */}
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

                {/* RIGHT */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/*<button className="w-5 h-5 md:w-6 md:h-6">*/}
                    {/*    <img src="/search_02.png" alt="search" />*/}
                    {/*</button>*/}

                    {/*<button className="w-5 h-5 md:w-6 md:h-6">*/}
                    {/*    <img src="/contax_call.png" alt="contact" />*/}
                    {/*</button>*/}
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="absolute left-0 top-0 h-full w-[260px] bg-white p-6 flex flex-col gap-6">

                        <button
                            onClick={() => setOpen(false)}
                            className="self-end text-xl"
                        >
                            ✕
                        </button>

                        <nav className="flex flex-col gap-4">
                            <Link href="/" onClick={() => setOpen(false)}>Trang chủ</Link>
                            <Link href="/products" onClick={() => setOpen(false)}>Sản phẩm</Link>
                            <Link href="/contact-us" onClick={() => setOpen(false)}>Liên hệ với chúng tôi</Link>
                        </nav>

                    </div>
                </div>
            )}
        </header>
    );
}

export default HeaderComponent;