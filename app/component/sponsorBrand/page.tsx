import React from 'react';

const dataSponsor = [
    {
        id: 1,
        image: '/sponsorBrand/anh1.png'
    },
    {
        id: 2,
        image: '/sponsorBrand/anh2.png'
    },
    {
        id: 3,
        image: '/sponsorBrand/anh3.png'
    },
    {
        id: 4,
        image: '/sponsorBrand/anh4.png'
    },
    {
        id: 5,
        image: '/sponsorBrand/anh5.png'
    },
    {
        id: 6,
        image: '/sponsorBrand/anh6.png'
    },
]

function SponsorBrand() {
    return (
        <section className="w-full">
            {/*<div className="flex items-center justify-between mb-4">*/}
            {/*    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">*/}
            {/*    </h2>*/}

            {/*    <a*/}
            {/*        href="#"*/}
            {/*        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"*/}
            {/*        style={{ fontSize: "16px", borderBottom: "1px solid #141718" }}*/}
            {/*    >*/}
            {/*        More SponsorBrand*/}
            {/*        <ArrowRight className="w-4 h-4" />*/}
            {/*    </a>*/}
            {/*</div>*/}

            <div className="grid grid-cols-6 gap-4">
                {dataSponsor.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-center py-[50px]"
                    >
                        <img
                            src={item.image}
                            alt=""
                            className="h-12 object-contain"
                        />
                    </div>
                ))}
            </div>
        </section>

    );
}

export default SponsorBrand;