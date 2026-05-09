'use client';

import {useState} from 'react';

const THUMBNAILS = [
    'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-41480f83b5246784.png',
    'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-c79cff22d8b93d7a.png',
];

const MAIN_IMAGE =
    'https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-fc5cd39762c9dfc0.png';

export default function ProductDetail() {
    const [activeImg, setActiveImg] = useState(0);

    return (
        <section className="bg-white px-0 pt-4">
            <div
                className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 lg:flex-row lg:items-start lg:gap-[63px] lg:px-[160px]">
                {/* Gallery */}
                <div className="flex w-full flex-col gap-4 lg:w-[345px] lg:flex-shrink-0">
                    <div className="relative h-[458px] w-full lg:w-[345px]">
                        <button
                            className="absolute left-0 top-1/2 z-[2] flex -translate-y-1/2 items-center drop-shadow-[0px_8px_16px_rgba(0,0,0,0.04)] cursor-pointer"
                            aria-label="Previous"
                        >
                            <img
                                src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-2684314e6ef15538.svg"
                                alt=""
                                width={40}
                                height={40}
                            />
                        </button>

                        <div
                            className="relative h-full w-full overflow-hidden rounded-[8px] bg-[#F3F5F7] bg-cover bg-center"
                            style={{backgroundImage: `url(${MAIN_IMAGE})`}}
                        >
                            <div className="absolute left-5 top-5 flex flex-col gap-2">
                <span
                    className="inline-flex items-center justify-center rounded-[4px] bg-white px-[10px] py-1 font-inter text-[14px] font-bold text-[#FF5630]">
                  NEW
                </span>

                                <span
                                    className="inline-flex items-center justify-center rounded-[4px] bg-[#38CB89] px-[10px] py-1 font-inter text-[14px] font-bold text-[#FEFEFE]">
                  -25%
                </span>
                            </div>
                        </div>

                        <button
                            className="absolute right-0 top-1/2 z-[2] flex -translate-y-1/2 items-center drop-shadow-[0px_8px_16px_rgba(0,0,0,0.04)] cursor-pointer"
                            aria-label="Next"
                        >
                            <img
                                src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-a91aa7024baf852a.svg"
                                alt=""
                                width={40}
                                height={40}
                            />
                        </button>
                    </div>

                    <div className="flex gap-[11px]">
                        {THUMBNAILS.map((src, i) => (
                            <button
                                key={i}
                                className={`h-[167px] flex-1 overflow-hidden rounded-[8px] border-2 transition-colors ${
                                    activeImg === i
                                        ? 'border-[#141718]'
                                        : 'border-transparent'
                                }`}
                                onClick={() => setActiveImg(i)}
                            >
                                <img
                                    src={src}
                                    alt={`Product view ${i + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-col gap-4 border-b border-[#E8ECEF] pb-6">
                        <h1 className="font-poppins text-[40px] font-medium leading-[44px] tracking-[-0.4px] text-[#141718]">
                            CY-3273
                        </h1>

                        <span
                            className="inline-flex w-fit items-center justify-center rounded-full bg-[#FF5630] px-[14px] py-1 font-inter text-[14px] font-bold uppercase tracking-[0.03em] text-[#FEFEFE]">
              Must Have
            </span>

                        <div className="flex items-center gap-3">
              <span className="font-poppins text-[28px] font-medium leading-[34px] tracking-[-0.6px] text-[#B91C1C]">
                $199.00
              </span>

                            <span
                                className="font-poppins text-[20px] font-medium leading-7 text-[#6C7275] line-through">
                $400.00
              </span>
                        </div>
                    </div>

                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col items-center gap-2 rounded-[8px] bg-[#F3F5F7] p-4">
                <span className="font-inter text-[14px] font-normal leading-[22px] text-[#6C7275]">
                  Mã sản phẩm
                </span>

                                <span className="font-inter text-[16px] font-normal leading-[26px] text-black">
                  CY-3273
                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2 rounded-[8px] bg-[#F3F5F7] p-4">
                <span className="font-inter text-[14px] font-normal leading-[22px] text-[#6C7275]">
                  Chế độ nước
                </span>

                                <span className="font-inter text-[16px] font-normal leading-[26px] text-black">
                  Nóng/Lạnh
                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2 rounded-[8px] bg-[#F3F5F7] p-4">
                <span className="font-inter text-[14px] font-normal leading-[22px] text-[#6C7275]">
                  Color
                </span>

                                <span
                                    className="text-center font-inter text-[16px] font-normal leading-[26px] text-black">
                  Crom / Black / Rose Gold
                </span>
                            </div>

                            <div className="flex flex-col items-center gap-2 rounded-[8px] bg-[#F3F5F7] p-4">
                <span className="font-inter text-[14px] font-normal leading-[22px] text-[#6C7275]">
                  Vật liệu
                </span>

                                <span className="font-inter text-[16px] font-normal leading-[26px] text-black">
                  Chrome
                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}