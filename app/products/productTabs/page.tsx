'use client';

import {useState} from 'react';

const SPEC_ROWS = [
    {label: 'Chức năng', value: 'Nóng lạnh'},
    {label: 'Chất liệu', value: 'Chrome'},
    {label: 'Bề mặt', value: 'PVD Chrome'},
    {label: 'Linh phụ kiện', value: 'Mateu Đức'},
    {label: 'Xuất xứ', value: 'Taiwan'},
];

const DESCRIPTION = `1. Thông số kỹ thuật (Technical Specifications)
Mã sản phẩm: CY-3273 (Crom / Black / Rose Gold)
Hãng sản xuất: CHUANYANG GLOBAL
Công nghệ: Tiêu chuẩn Châu Âu (Linh kiện Đức & Thụy Sỹ)
Chất liệu: Đồng thau cao cấp (tỉ lệ đồng >60%), không chì, an toàn cho sức khỏe.
Lớp mạ: Công nghệ mạ PVD 6 lớp (chống bám bẩn, chống ăn mòn muối biển).
Áp suất nước: 0.05 ~ 1.0 MPa
Lưu lượng nước: 5.0L/phút (Tiết kiệm nước tối ưu).
Chiều cao vòi: 279 mm (Dòng vòi cổ cao).
Loại van: Lõi Ceramic chịu nhiệt, độ bền lên đến 500.000 lần đóng mở (tương đương 100 năm sử dụng).

2. Đặc điểm nổi bật (Key Features)
Thiết kế công thái học: Kiểu dáng hiện đại, chiều cao vòi được tối ưu hóa giúp tăng không gian thao tác tại chậu rửa thêm 33%.
Đầu vòi Neoperl (Thụy Sỹ): Trang bị lưới tạo bọt chống bắn tóe, giúp dòng nước đi ra mịn màng và tiết kiệm 30% lượng nước tiêu thụ.
Điều khiển chính xác: Tay gạt vận hành êm ái, hỗ trợ điều chỉnh nóng/lạnh linh hoạt với phản hồi xúc giác cực tốt.
Bền bỉ với thời gian: Thân vòi đúc từ đồng nguyên khối, chịu được áp lực cao và va đập mạnh.
Tiêu chuẩn xanh: Sản phẩm đạt các chứng chỉ quốc tế (NSF, LF, UPC), phù hợp cho các dự án kiến trúc xanh yêu cầu chứng chỉ LEED.

3. Cam kết chất lượng (Our Commitment)
Chính hãng 100%: Đầy đủ tem chống hàng giả và phiếu bảo hành điện tử từ Chuanyang Global.
Mới 100%: Cam kết hàng xuất kho trực tiếp, không bán hàng trưng bày, hàng tồn kho lâu ngày.
Giá trị vượt trội: Chính sách chiết khấu hấp dẫn cho các đối tác thiết kế và đơn hàng dự án lớn.
Hỗ trợ toàn diện: Giao hàng hỏa tốc, thanh toán linh hoạt và miễn phí vận chuyển toàn quốc.

4. Quy cách đóng gói (Packaging Standard)
Sản phẩm được đóng gói theo tiêu chuẩn "Luxury Protection" gồm 3 lớp:
Lớp bảo vệ: Sản phẩm được bọc trong túi vải nhung mềm để tránh trầy xước lớp mạ PVD.
Lớp chống sốc: Hệ thống bọt khí xốp định hình ôm khít thân vòi.
Lớp thương hiệu: Hộp Carton 5 lớp chịu lực cao cấp với logo Chuanyang Global in nổi.`;

export default function ProductTabs() {
    const [open, setOpen] = useState(true);

    return (
        <section className="bg-white py-10">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 md:px-8 min-[1440px]:flex-row min-[1440px]:items-start min-[1440px]:px-[160px]">

                {/* Specs */}
                <div className="order-1 flex w-full flex-col gap-6 rounded-[8px] bg-[#F3F5F7] p-6 min-[1440px]:order-2 min-[1440px]:w-[400px] min-[1440px]:flex-shrink-0">
                    <h3 className="font-inter text-[16px] font-semibold leading-[26px] text-black">
                        Thông số kỹ thuật
                    </h3>

                    <div className="flex flex-col gap-4">
                        {SPEC_ROWS.map((row, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between border-b border-[rgba(108,114,117,0.25)] pb-4 ${
                                    i === SPEC_ROWS.length - 1 ? "border-b-0 pb-0" : ""
                                }`}
                            >
            <span className="font-inter text-[14px] font-normal leading-[22px] text-black">
              {row.label}
            </span>

                                <span className="font-inter text-[14px] font-semibold leading-[22px] text-black">
              {row.value}
            </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="order-2 flex flex-1 flex-col gap-4 rounded-[8px] bg-[#F3F5F7] p-6 min-[1440px]:order-1">
                    <div
                        className="flex cursor-pointer select-none items-center justify-between"
                        onClick={() => setOpen(!open)}
                    >
        <span className="font-inter text-[16px] font-semibold leading-[26px] text-black">
          Thông tin sản phẩm
        </span>

                        <img
                            src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-d67e74873be8c82a.svg"
                            alt=""
                            width={20}
                            height={20}
                            className={`transition-transform duration-200 ${
                                open ? "rotate-0" : "rotate-180"
                            }`}
                        />
                    </div>

                    {open && (
                        <>
                            <img
                                src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-4d7c0fdee89aa10e.png"
                                alt="Product"
                                className="max-h-[400px] w-full rounded-[4px] object-cover"
                            />

                            <p className="whitespace-pre-line font-inter text-[14px] font-normal leading-6 text-[#141718]">
                                {DESCRIPTION}
                            </p>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
}