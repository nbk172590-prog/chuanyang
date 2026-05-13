'use client'

import PromoBar from "@/component/announcementBar/page";
import {ContactSection} from "@/component/contact/contactSection/page";
import {FeatureSection} from "@/component/contact/featureSection/page";
import {HeaderContact} from "@/component/contact/headerContact/page";
import FooterComponent from "@/component/footer/page";
import HeaderComponent from "@/component/hader/page";
import StormService from "@/component/stormService/page";
import React from "react";

/**
 * Reusable container
 */
const Container = ({
                       children,
                       className = "",
                   }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`
                w-full
                px-4
                md:px-10
                lg:px-10
                xl:px-40
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default function ContactUsPage() {

    return (
        <main className="bg-white min-h-screen flex flex-col">

            <PromoBar/>

            {/* HEADER */}
            <Container>
                <HeaderComponent/>
            </Container>

            {/* MAIN CONTENT */}
            <Container
                className="
                    pt-6
                    md:pt-8
                    pb-14
                    md:pb-20
                "
            >
                <div className="flex flex-col gap-10 md:gap-12">

                    <HeaderContact/>

                    <FeatureSection/>

                    <ContactSection/>

                </div>
            </Container>

            {/* SERVICE */}
            <div className="w-full bg-[#F3F5F7] py-10 md:py-14">
                <Container>
                    <StormService/>
                </Container>
            </div>

            <FooterComponent/>

        </main>
    );
}