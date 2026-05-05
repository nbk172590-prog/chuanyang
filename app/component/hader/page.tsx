"use client"

import React from 'react';

function HeaderComponent() {
    return (
            <header className="w-full max-w-[1440px] mx-auto flex items-center justify-between py-6 px-5 bg-background">

                {/* Logo */}
                <a href="#" className="flex items-center gap-2 shrink-0">
                    <img className="w-10 h-6 object-contain" style={{ objectFit: "cover", objectPosition: "center" }} src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/bb324a18d_4fd52f27a_a6d982d03e4eea741e5c66a327cd4922036ced70.png" alt="Chuan Yang Global Logo Icon" />
                    <p className="text-2xl text-emerald-950 uppercase">CHUAN YANG GLOBAL</p>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    <a href="/" className="text-figma-14 font-medium font-heading leading-figma-24 text-secondary transition-opacity hover:opacity-80">
                        Home
                    </a>
                    <a href="/shop" className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                        Shop
                    </a>
                    <a href="/product" className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                        Product
                    </a>
                    <a href="/contact-us" className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                        Contact Us
                    </a>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4 shrink-0">
                    {/* Search Button */}
                    <button className="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-80">
                        <img className="w-[22px] h-[22px]" src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/4bc0fcb75_b1dea2e71_13_699_7_17124_4_11356.svg" alt="Search" />
                    </button>

                    {/* User Profile Button */}
                    <button className="w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-80">
                        <img className="w-[22px] h-[22px]" src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/d68c66afa_a3ad05c75_13_699_7_17125_4_11360.svg" alt="User Profile" />
                    </button>

                    {/* Cart Button */}
                    <button className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
                        <div className="relative w-6 h-6">
                            <img className="absolute top-1.5 left-[9px] w-2 h-1.5 z-[1]" src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/e041b9871_4e495a0ad_13_699_7_17126_4_11351_4_11339.svg" alt="Bag Handle" />
                            <img className="absolute top-[3px] left-[3px] w-5 h-5 z-[2]" src="https://media.base44.com/images/public/69f8168291dbd5fd35722438/63135a9f1_58306caf5_13_699_7_17126_4_11351_4_11340.svg" alt="Bag Body" />
                        </div>
                        <div className="w-5 h-5 relative flex items-center justify-center overflow-hidden">
                            <div className="bg-secondary rounded-[50%] absolute inset-0 z-[1]" />
                        </div>
                    </button>

                    {/* Mobile Menu Trigger */}
                </div>
            </header>

    );
}

export default HeaderComponent;