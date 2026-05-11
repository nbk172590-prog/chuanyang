"use client";

import React from "react";

const products = [
    {
        id: 1,
        title: "Miễn phí vận chuyển",
        icon: "/shipping.png",
        content: "Miễn phí vận chuyển cho đơn hàng trên 3 triệu đồng",
    },
    {
        id: 2,
        title: "Hoàn tiền",
        icon: "/money.png",
        content: "Thời gian làm việc 30 ngày",
    },
    {
        id: 3,
        title: "Thanh toán an toàn",
        icon: "/lock.png",
        content: "Được bảo mật bởi Stripe",
    },
    {
        id: 4,
        title: "Hỗ trợ 24/7",
        icon: "/call.png",
        content: "Hỗ trợ qua điện thoại và email",
    },
];

function StormService() {
    return (
        <section className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#F3F5F7] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 rounded-lg flex flex-col"
                    >
                        <img
                            className="w-8 h-6 md:w-10 md:h-8 mb-4 md:mb-6"
                            src={product.icon}
                            alt={product.title}
                        />

                        <p className="text-[#141718] font-medium text-sm sm:text-base md:text-xl mb-1 md:mb-2">
                            {product.title}
                        </p>

                        <p className="text-[#6C7275] text-xs sm:text-sm">
                            {product.content}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default StormService;