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
                    className="
                        w-full
                        h-[240px]
                        sm:h-[300px]
                        md:h-[413px]
                        object-cover
                        block
                    "
                />
            </div>

            {/* CONTENT */}
            <div
                className="
                    w-full
                    md:w-1/2
                    bg-[#F3F5F7]

                    flex
                    flex-col
                    justify-center

                    gap-6

                    px-5
                    sm:px-6
                    md:pl-[72px]
                    md:pr-0

                    py-10
                    md:py-0

                    md:min-h-[413px]
                "
            >

                <div className="flex flex-col gap-4">

                    <h2
                        className="
                            font-[Poppins]
                            font-bold
                            text-[30px]
                            leading-[36px]
                            tracking-[-0.3px]
                            sm:text-[34px]
                            sm:leading-[40px]
                            md:text-[40px]
                            md:leading-[44px]
                            md:tracking-[-0.4px]
                            text-[#121212]
                        "
                    >
                        Về chúng tôi
                    </h2>

                    <p
                        className="
                            font-[Inter]
                            font-normal
                            text-[14px]
                            leading-[24px]
                            sm:text-[15px]
                            md:text-[16px]
                            md:leading-[26px]
                            text-[#343839]
                            max-w-full
                            md:max-w-[400px]
                        "
                    >
                        Thiết bị vệ sinh Toàn Dương được thành lập vào năm 1971 tại Chương Hóa Đài Loan. với khái niệm
                        cốt lõi là cung cấp các sản phẩm chất lượng cao và dịch vụ vượt trội, thiết bị vệ sinh Toàn
                        Dương đã tích hợp nghệ thuật và công nghệ vào các sản phẩm của mình trong nhiều năm qua, trở
                        thành một thương hiệu nổi tiếng quốc tế. Trong tương lai chúng tôi cũng sẻ tích cực đáp ứng các
                        Mục tiêu phát triển bền vững (SDGs) của liên hợp quốc, tiếp tục phát triển các sản phẩm thông
                        minh và thân thiện hơn với môi trường đồng thời cung cấp thêm nhiều sản phẩm chất lượng cao hơn,
                        để đáp ứng nhu cầu đang thay đổi của thị trường.
                    </p>

                </div>

                {/* BUTTON */}
                <Link
                    href="/products"
                    className="
                        inline-flex
                        items-center
                        gap-1
                        font-[Inter]
                        font-medium
                        text-[14px]
                        leading-[24px]
                        md:text-[16px]
                        md:leading-[28px]
                        md:tracking-[-0.4px]
                        text-[#121212]
                        border-b
                        border-[#121212]
                        w-fit
                        pb-[2px]
                    "
                >
                    <span>Mua sắm ngay</span>

                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-88a7e52176096d6e.svg"
                        alt="arrow right"
                        className="w-4 h-4 md:w-5 md:h-5"
                    />
                </Link>

            </div>
        </section>
    );
}