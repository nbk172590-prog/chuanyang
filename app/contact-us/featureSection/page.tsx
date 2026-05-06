"use client";

import Link from "next/link";

export function FeatureSection() {
    return (
        <section className="flex flex-col md:flex-row">

            {/* IMAGE */}
            <div className="w-full md:w-1/2 flex-shrink-0 overflow-hidden">
                <img
                    src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-99b9d88360257048.png"
                    alt="Chuanyang kitchen faucet showcase"
                    className="w-full h-[280px] md:h-[413px] object-cover block"
                />
            </div>

            {/* CONTENT */}
            <div
                className="w-full md:w-1/2 bg-[#F3F5F7] flex flex-col justify-center gap-6 px-6 md:pl-[72px] md:pr-0 py-8 md:py-0 md:min-h-[413px]">

                <div className="flex flex-col gap-4">
                    <h2 className="font-[Poppins] font-medium text-[40px] leading-[44px] tracking-[-0.4px] text-[#121212]">
                        About Us
                    </h2>

                    <p className="font-[Inter] font-normal text-[16px] leading-[26px] text-[#343839] max-w-[400px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>

                {/* BUTTON */}
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-1 font-[Inter] font-medium text-[16px] leading-[28px] tracking-[-0.4px] text-[#121212] border-b border-[#121212] w-fit pb-[2px]"
                >
                    <span>Shop Now</span>
                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-88a7e52176096d6e.svg"
                        alt="arrow right"
                        className="w-5 h-5"
                    />
                </Link>

            </div>
        </section>
    );
}