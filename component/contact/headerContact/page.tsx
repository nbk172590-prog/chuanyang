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
                    Chúng tôi tin vào trang trí nội thất bền vững. Chúng tôi đam mê cuộc sống tại gia.
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
                    Vòi nước cao cấp Chuan Yang được sản xuất tại Đài Loan. Sử dụng các linh kiện hàng đầu thế giới từ
                    Đức, Hàn Quốc và Thụy Sĩ. Được chứng nhận bởi LF, NSF và UPC. Thiết kế thanh lịch dành cho phong
                    cách sống tinh tế.
                </p>

            </div>
        </header>
    );
}