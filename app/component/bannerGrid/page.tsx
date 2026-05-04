'use client'

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    arrowUrl: string;
    contentPosition?: "top-left" | "bottom-left";
}

function CategoryCard({title, imageUrl, arrowUrl, contentPosition = "top-left"}: CategoryCardProps) {
    const positionClass = contentPosition === "bottom-left"
        ? "absolute bottom-8 left-8"
        : "absolute top-12 left-8";

    return (
        <div
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className={positionClass}>
                <h2
                    className="text-[#141718] font-medium leading-[38px] tracking-[-0.6px]"
                    style={{fontFamily: "Poppins, sans-serif", fontSize: "34px"}}
                >
                    {title}
                </h2>
                <a
                    href="#"
                    className="inline-flex items-center gap-1 mt-3"
                    style={{fontFamily: "Inter, sans-serif"}}
                >
          <span
              className="text-[#141718] font-medium leading-7 tracking-[-0.4px]"
              style={{fontSize: "16px", borderBottom: "1px solid #141718"}}
          >
            Shop Now
          </span>
                    <img
                        src={arrowUrl}
                        alt="arrow"
                        className="w-5 h-5"
                    />
                </a>
            </div>
        </div>
    );
}

export default function BannerGrid() {
    return (
        <section className="w-full bg-white">
            <div className="flex flex-row gap-6">
                {/* Large left productCard */}
                <div className="flex-none" style={{width: "548px", height: "664px"}}>
                    <CategoryCard
                        title="Bathroom"
                        imageUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-1d6c5bfc5ee9cf06.png"
                        arrowUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-0db9131d45f1b116.svg"
                        contentPosition="top-left"
                    />
                </div>

                {/* Right column with two stacked cards */}
                <div className="flex flex-col gap-6 flex-none" style={{width: "548px", height: "664px"}}>
                    <div style={{height: "319px"}}>
                        <CategoryCard
                            title="Lavabo/Restroom"
                            imageUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-0569f57b8e21f96b.png"
                            arrowUrl="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-7079d2de927937b5.svg"
                            contentPosition="bottom-left"
                        />
                    </div>
                    <div style={{height: "319px"}}>
                        <CategoryCard
                            title="Kitchen"
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
