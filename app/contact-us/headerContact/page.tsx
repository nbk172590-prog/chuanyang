"use client";

export function HeaderContact() {
    return (
        <header className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">

                <h1 className="font-[Poppins] font-medium text-[54px] leading-[58px] tracking-[-1px] text-[#141718]">
                    We believe in sustainable decor. We&apos;re passionate about life at home.
                </h1>

                <p className="font-[Inter] font-normal text-[16px] leading-[26px] text-[#6C7275] max-w-[760px]">
                    <span className="text-[#343839] font-normal">
                        Chuan Yang
                    </span>
                    {" "}Premium faucets crafted in Taiwan. Featuring world-class components from Germany, Korea, and Switzerland. Certified by LF, NSF, and UPC. Elegant designs for a sophisticated lifestyle.
                </p>

            </div>
        </header>
    );
}