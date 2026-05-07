"use client";

export function HeaderContact() {
    return (
        <header className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-4 md:gap-6">

                <h1
                    className="
                        font-[Poppins]
                        font-medium
                        text-[32px]
                        leading-[40px]
                        tracking-[-0.5px]
                        text-[#141718]

                        sm:text-[40px]
                        sm:leading-[48px]

                        md:text-[54px]
                        md:leading-[58px]
                        md:tracking-[-1px]
                    "
                >
                    We believe in sustainable decor. We&apos;re passionate about life at home.
                </h1>

                <p
                    className="
                        font-[Inter]
                        font-normal
                        text-[14px]
                        leading-[24px]
                        text-[#6C7275]
                        sm:text-[15px]
                        md:text-[16px]
                        md:leading-[26px]
                        max-w-full
                        md:max-w-[760px]
                    "
                >
                    <span className="text-[#343839] font-normal">
                        Chuan Yang
                    </span>
                    {" "}
                    Premium faucets crafted in Taiwan. Featuring world-class
                    components from Germany, Korea, and Switzerland. Certified
                    by LF, NSF, and UPC. Elegant designs for a sophisticated
                    lifestyle.
                </p>

            </div>
        </header>
    );
}