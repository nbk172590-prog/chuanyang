"use client";

const INFO_CARDS = [
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-5707d1ead947ed07.svg",
        label: "Address",
        value: "Y01-L13, An Phú Shop Villa\nKĐT Dương Nội, Hà Đông, Hanoi, Viet Nam",
    },
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-00294d00a8ec7367.svg",
        label: "Contact Us",
        value: "+84 971 617 101",
    },
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-4f9617ef71a8148d.svg",
        label: "Email",
        value: " chuanyangvn@gmail.com",
    },
];

export function ContactSection() {
    return (
        <section className="flex flex-col gap-10">

            {/* TITLE */}
            <h2 className="font-[Poppins] font-medium text-[40px] leading-[44px] tracking-[-0.4px] text-[#121212] text-center">
                Contact Us
            </h2>

            {/* INFO CARDS */}
            <div className="flex flex-col md:flex-row gap-6">
                {INFO_CARDS.map((card) => (
                    <div
                        key={card.label}
                        className="flex-1 bg-[#F3F5F7] flex flex-col items-center gap-4 px-8 py-4"
                    >
                        <img src={card.icon} alt={card.label} className="w-8 h-8" />

                        <div className="flex flex-col items-center gap-2 text-center">
                            <span className="font-[Inter] font-bold text-[14px] leading-[16px] uppercase text-[#6C7275]">
                                {card.label}
                            </span>

                            <span className="font-[Inter] font-semibold text-[14px] leading-[26px] text-[#141718] whitespace-pre-line">
                                {card.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* FORM + MAP */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 py-20">

                {/* FORM */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full md:w-[544px] flex flex-col gap-6"
                >
                    {/* NAME */}
                    <div className="flex flex-col gap-3">
                        <label className="font-[Inter] font-bold text-[12px] leading-[12px] uppercase text-[#6C7275]">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full h-10 px-4 border border-[#CBCBCB] rounded-[6px] bg-white text-[14px] leading-[26px] text-[#141718] outline-none focus:border-[#141718]"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-3">
                        <label className="font-[Inter] font-bold text-[12px] leading-[12px] uppercase text-[#6C7275]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full h-10 px-4 border border-[#CBCBCB] rounded-[6px] bg-white text-[14px] leading-[26px] text-[#141718] outline-none focus:border-[#141718]"
                        />
                    </div>

                    {/* MESSAGE */}
                    <div className="flex flex-col gap-3">
                        <label className="font-[Inter] font-bold text-[12px] leading-[12px] uppercase text-[#6C7275]">
                            Message
                        </label>
                        <textarea
                            placeholder="Your message"
                            rows={5}
                            className="w-full h-[140px] p-4 border border-[#CBCBCB] rounded-[6px] bg-white text-[14px] leading-[26px] text-[#141718] resize-none outline-none focus:border-[#141718]"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-10 py-[6px] bg-[#141718] rounded-[8px] text-white text-[14px] leading-[28px] font-medium tracking-[-0.4px] w-fit hover:bg-[#2d3132] transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* MAP */}
                <div className="flex-1 h-[280px] md:h-[404px] relative overflow-hidden">
                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-f8344553d6cff069.png"
                        alt="map"
                        className="w-full h-full object-cover block"
                    />

                    <img
                        src="https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-7d917f62c6eb7e7b.svg"
                        alt="location pin"
                        className="absolute w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>

            </div>
        </section>
    );
}