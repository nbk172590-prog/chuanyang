import HeaderComponent from "@/app/component/hader/page";
import {Slider} from "@/app/component/slider/page";
import {BrandHeader} from "@/app/component/brandHeader/page";
import BannerGrid from "@/app/component/bannerGrid/page";
import {NewArrivals} from "./component/newArrivals/page";
import Videos from "./component/videos/page";
import Articles from "@/app/component/articles/page";
import Peference from "@/app/component/peference/page";
import FooterComponent from "@/app/component/footer/page";
import StormService from "@/app/component/stormService/page";
import SuperiorQuality from "@/app/component/superiorQuality/page";
import SponsorBrand from "@/app/component/sponsorBrand/page";
import {PromoBar} from "@/app/component/announcementBar/page";

export default function Home() {
    return (
        <main className="bg-white min-h-screen">
            {/* 🔥 Banner quảng cáo */}
            <PromoBar />

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
                <NewArrivals/>
                <Videos/>
            </div>
            <div>
                <SuperiorQuality/>
                <div
                    className="mx-auto flex flex-col items-center"
                    style={{
                        maxWidth: "1440px",
                        padding: "0px 160px 40px",
                        gap: "32px",
                    }}
                >
                    <Peference/>
                </div>

                <SponsorBrand/>
                <div
                    className="mx-auto flex flex-col items-center"
                    style={{
                        maxWidth: "1440px",
                        padding: "0px 160px 40px",
                        gap: "32px",
                    }}
                >
                    <Articles/>
                    <StormService/>
                </div>

                <FooterComponent/>
            </div>
        </main>

    );
}
