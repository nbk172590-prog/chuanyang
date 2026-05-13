"use client";

export function BrandHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 w-full">

            {/* Left: headline */}
            <h1 className="text-[#141718]
                           text-2xl sm:text-3xl md:text-4xl
                           leading-tight md:leading-11
                           tracking-tight md:tracking-[-0.4px]
                           md:max-w-107.5 font-bold">
                Thiết kế tinh tế
                <br/>
                Sang trọng đến từng chi tiết.
            </h1>

            {/* Right: description */}
            <p className="text-sm sm:text-base leading-6 md:leading-6.5 flex-1">
                <span className="font-bold text-[#343839]">
                    Chuan Yang
                </span>
                <span className="text-[#6C7275]">
                    {" "}
                    Vòi nước cao cấp sản xuất tại Đài Loan. Sử dụng các linh kiện đẳng cấp thế giới từ Đức, Hàn Quốc và Thụy Sĩ.
                    Được chứng nhận bởi LF, NSF và UPC.
                    Thiết kế trang nhã cho một phong cách sống tinh tế.
                </span>
            </p>
        </div>
    );
}

export default BrandHeader;