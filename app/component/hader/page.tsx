"use client";

import React, { useState } from "react";

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
                    <a
                        href="/"
                        className="order-2 md:order-1 flex items-center gap-2"
                    >
                        <img
                            className="w-8 h-5 md:w-10 md:h-6 object-contain"
                            src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/bb324a18d_4fd52f27a_a6d982d03e4eea741e5c66a327cd4922036ced70.png"
                            alt="logo"
                        />
                        <p className="text-lg md:text-2xl font-semibold text-emerald-950 uppercase">
                            CHUAN YANG
                        </p>
                    </a>

                </div>

                {/* DESKTOP NAV (giữ nguyên giữa) */}
                <nav className="hidden md:flex items-center gap-10">
                    <a href="/" className="text-sm md:text-base font-medium hover:opacity-80">
                        Home
                    </a>
                    <a href="/products" className="text-sm md:text-base font-medium hover:opacity-80">
                        Products
                    </a>
                    <a href="/contact-us" className="text-sm md:text-base font-medium hover:opacity-80">
                        Contact Us
                    </a>
                </nav>

                {/* RIGHT */}
                <div className="flex items-center gap-3 md:gap-4">
                    <button className="w-5 h-5 md:w-6 md:h-6">
                        <img src="/search_02.png" alt="search" />
                    </button>

                    <button className="w-5 h-5 md:w-6 md:h-6">
                        <img src="/contax_call.png" alt="contact" />
                    </button>
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
                            <a href="/" onClick={() => setOpen(false)}>Home</a>
                            <a href="/products" onClick={() => setOpen(false)}>Products</a>
                            <a href="/contact-us" onClick={() => setOpen(false)}>Contact Us</a>
                        </nav>

                    </div>
                </div>
            )}
        </header>
    );
}

export default HeaderComponent;