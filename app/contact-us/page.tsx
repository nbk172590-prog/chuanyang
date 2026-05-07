'use client'

import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";
import {PromoBar} from "@/app/component/announcementBar/page";
import React from "react";
import {HeaderContact} from "@/app/contact-us/headerContact/page";
import {FeatureSection} from "@/app/contact-us/featureSection/page";
import {ContactSection} from "@/app/contact-us/contactSection/page";
import StormService from "@/app/component/stormService/page";

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