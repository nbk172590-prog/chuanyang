'use client'

import Link from "next/link";

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    arrowUrl: string;
    href: string;
    contentPosition?: "top-left" | "bottom-left";
}

function CategoryCard({
                          title,
                          imageUrl,
                          arrowUrl,
                          href,
                          contentPosition = "top-left",
                      }: CategoryCardProps) {

    const positionClass =
        contentPosition === "bottom-left"
            ? "absolute bottom-4 left-4 md:bottom-8 md:left-8"
            : "absolute top-4 left-4 md:top-12 md:left-8";

    return (
        <div
            className="relative w-full h-full rounded-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <div className={positionClass}>
                <h2 className="text-lg md:text-3xl font-medium text-[#141718]">
                    {title}
                </h2>

                <Link href={href} className="inline-flex items-center gap-1 mt-2 md:mt-3">
                    <span className="text-sm md:text-base border-b border-[#141718]">
                        Mua sắm ngay
                    </span>

                    <img
                        src={arrowUrl}
                        alt="arrow"
                        className="w-4 h-4 md:w-5 md:h-5"
                    />
                </Link>
            </div>
        </div>
    );
}

export default function BannerGrid() {
    return (
        <section className="w-full bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* LEFT BIG */}
                <div className="aspect-[4/5] md:aspect-[548/664]">
                    <CategoryCard
                        title="Phòng tắm"
                        href="/products?category=Sen tắm"
                        imageUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-1d6c5bfc5ee9cf06.png"
                        arrowUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-0db9131d45f1b116.svg"
                    />
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-4 md:gap-6">

                    <div className="aspect-[4/3] md:aspect-[548/319]">
                        <CategoryCard
                            title="Lavabo/Nhà vệ sinh"
                            href="/products?category=Vòi chậu"
                            imageUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-0569f57b8e21f96b.png"
                            arrowUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-7079d2de927937b5.svg"
                            contentPosition="bottom-left"
                        />
                    </div>

                    <div className="aspect-[4/3] md:aspect-[548/319]">
                        <CategoryCard
                            title="Phòng bếp"
                            href="/products?category=Vòi bếp"
                            imageUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-78deba1751c9c6a2.png"
                            arrowUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-788131a26ffffd29.svg"
                            contentPosition="bottom-left"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}