'use client'


import PromoBar from "@/component/announcementBar/page";
import { ContactSection } from "@/component/contact/contactSection/page";
import { FeatureSection } from "@/component/contact/featureSection/page";
import { HeaderContact } from "@/component/contact/headerContact/page";
import FooterComponent from "@/component/footer/page";
import HeaderComponent from "@/component/hader/page";
import StormService from "@/component/stormService/page";
import React from "react";


export default function ContactUsPage() {
    return (
        <main className="bg-white min-h-screen">

            <PromoBar/>

            <HeaderComponent/>

            {/* MAIN CONTENT */}
            <div
                className="
                    max-w-[1440px]
                    mx-auto

                    px-4
                    sm:px-6
                    md:px-10
                    lg:px-20
                    xl:px-[160px]

                    pt-6
                    md:pt-8

                    pb-14
                    md:pb-20

                    flex
                    flex-col

                    gap-10
                    md:gap-12

                    bg-white
                "
            >

                <HeaderContact/>

                <FeatureSection/>

                <ContactSection/>

            </div>

            {/* SERVICE */}
            <div className="w-full bg-[#F3F5F7]">
                <StormService/>
            </div>

            <FooterComponent/>

        </main>
    );
}