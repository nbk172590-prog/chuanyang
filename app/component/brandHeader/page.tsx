"use client"

export function BrandHeader() {
    return (
        <div className="flex flex-row items-center gap-10 w-full">
            {/* Left: headline */}
            <h1
                className="shrink-0 text-[#141718]"
                style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
                    lineHeight: "44px",
                    letterSpacing: "-0.4px",
                    width: "430px",
                }}
            >
                Exquisite in Design
                <br />
                Classy in every detail.
            </h1>

            {/* Right: brand description */}
            <p
                style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: "26px",
                    flex: 1,
                }}
            >
                <span style={{ fontWeight: 600, color: "#343839" }}>Chuan Yang</span>
                <span style={{ fontWeight: 400, color: "#6C7275" }}>
          {" "}
                    Premium faucets crafted in Taiwan. Featuring world-class components
          from Germany, Korea, and Switzerland. Certified by LF, NSF, and UPC.
          Elegant designs for a sophisticated lifestyle.
        </span>
            </p>
        </div>
    );
}
