import HeaderComponent from "@/app/component/hader/page";
import {Slider} from "@/app/component/slider/page";
import {BrandHeader} from "@/app/component/brandHeader/page";
import BannerGrid from "@/app/component/bannerGrid/page";
import {NewArrivals} from "./component/newArrivals/page";
import Videos from "./component/videos/page";
import Articles from "@/app/component/articles/page";
import Peference from "@/app/component/peference/page";
import FooterComponent from "@/app/component/footer/page";

export default function Home() {
    return (
        <main className="bg-white min-h-screen">
            {/* Slider Section — 1440px wide, centered, padded 160px sides, 40px bottom */}
            <div
                className="mx-auto flex flex-col items-center"
                style={{
                    maxWidth: "1440px",
                    padding: "0px 160px 40px",
                    gap: "32px",
                }}
            >
                <HeaderComponent/>
                <Slider/>
                <BrandHeader/>
                <BannerGrid/>
                <NewArrivals />
                <Videos/>
                <Peference/>
                <Articles/>

                <FooterComponent/>
            </div>
        </main>

    );
}
