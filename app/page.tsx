import HeaderComponent from "@/app/component/hader/page";
import {Slider} from "@/app/component/slider/page";
import {BrandHeader} from "@/app/component/brandHeader/page";
import BannerGrid from "@/app/component/bannerGrid/page";
import {NewArrivals} from "./component/newArrivals/page";
import Videos from "./component/videos/page";
import FooterComponent from "@/app/component/footer/page";
import StormService from "@/app/component/stormService/page";
import SuperiorQuality from "@/app/component/superiorQuality/page";
import SponsorBrand from "@/app/component/sponsorBrand/page";
import {PromoBar} from "@/app/component/announcementBar/page";
import Preference from "@/app/component/peference/page";
import React from "react";

/**
 * Reusable layout container
 */
const Container = ({children}: { children: React.ReactNode }) => {
    return (
        <div
            className="mx-auto w-full max-w-360 px-4 md:px-8 xl:px-20 2xl:px-40 pb-10 flex flex-col gap-8 items-center">
            {children}
        </div>
    );
};

export default function Home() {
    return (
        <main className="bg-white min-h-screen flex flex-col">
            {/* 🔥 Top announcement */}
            <PromoBar/>

            {/* 🔝 Main hero section */}
            <Container>
                <HeaderComponent/>
                <Slider/>
                <BrandHeader/>
                <BannerGrid/>
                <NewArrivals/>
                <Videos/>
            </Container>

            {/* 💎 Quality highlight (full width section) */}
            <SuperiorQuality/>

            {/* 🎯 Middle content */}
            <Container>
                <Preference/>
            </Container>

            {/* 🤝 Brands */}
            <SponsorBrand/>

            {/* 📰 Articles + services */}
            <Container>
                {/*<Articles/>*/}
                <StormService/>
            </Container>

            {/* 🔚 Footer */}
            <FooterComponent/>
        </main>
    );
}