"use client";

export function BrandHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 w-full">

            {/* Left: headline */}
            <h1 className="text-[#141718] font-medium
                           text-2xl sm:text-3xl md:text-4xl
                           leading-tight md:leading-[44px]
                           tracking-tight md:tracking-[-0.4px]
                           md:max-w-[430px]">
                Exquisite in Design
                <br/>
                Classy in every detail.
            </h1>

            {/* Right: description */}
            <p className="text-sm sm:text-base leading-6 md:leading-[26px] flex-1">
                <span className="font-semibold text-[#343839]">
                    Chuan Yang
                </span>
                <span className="text-[#6C7275]">
                    {" "}
                    Premium faucets crafted in Taiwan. Featuring world-class components
                    from Germany, Korea, and Switzerland. Certified by LF, NSF, and UPC.
                    Elegant designs for a sophisticated lifestyle.
                </span>
            </p>
        </div>
    );
}