'use client'

import HeaderComponent from "@/component/hader/page";
import {Slider} from "@/component/slider/page";
import {BrandHeader} from "@/component/brandHeader/page";
import BannerGrid from "@/component/bannerGrid/page";
import FooterComponent from "@/component/footer/page";
import StormService from "@/component/stormService/page";
import SuperiorQuality from "@/component/superiorQuality/page";
import SponsorBrand from "@/component/sponsorBrand/page";
import {PromoBar} from "@/component/announcementBar/page";
import Preference from "@/component/peference/page";
import React from "react";
import FooterBackground from "@/component/footer/footerBg/page";
import NewArrivals from "@/component/newArrivals/page";
import Videos from "@/component/videos/page";

/**
 * Reusable layout container
 */
const Container = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="w-full px-4 md:px-10 lg:px-10 xl:px-40">
            {children}
        </div>
    );
};

export default function Home() {
    return (
        <main className="bg-white min-h-screen flex flex-col">

            <PromoBar/>

            <Container>
                <div className="flex flex-col gap-8">
                    <HeaderComponent/>
                    <Slider/>
                    <BrandHeader/>
                    <BannerGrid/>
                    <NewArrivals/>
                    <Videos/>
                </div>
            </Container>

            <SuperiorQuality/>

            <Container>
                <div className="flex flex-col gap-8">
                    <Preference/>
                </div>
            </Container>

            <SponsorBrand/>

            <Container>
                <div className="flex flex-col gap-8">
                    <StormService/>
                </div>
            </Container>

            <FooterBackground/>
            <FooterComponent/>

        </main>
    );
}