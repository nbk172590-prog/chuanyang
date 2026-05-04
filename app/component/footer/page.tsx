import React from 'react';

function FooterComponent() {
    return (
        <div>
            <div>
                <img src={"/bg-ft.png"}/>
            </div>
            <div className="bg-[#141718]">
                <div className="text-white px-40 py-20 ">
                    <div className="flex items-center justify-between"
                         style={{borderBottom: "1px solid #6C7275"}}
                    >
                        <p className='text-2xl pb-10'>Chuan Yang Global</p>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-10">
                            <a href="#"
                               className="text-figma-14 font-medium font-heading leading-figma-24 texst-secondary transition-opacity hover:opacity-80">
                                Home
                            </a>
                            <a href="#"
                               className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                                Shop
                            </a>
                            <a href="#"
                               className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                                Product
                            </a>
                            <a href="#"
                               className="text-figma-14 font-medium font-heading leading-figma-24 text-figma-text-1 transition-opacity hover:opacity-80">
                                Contact Us
                            </a>
                        </nav>
                    </div>


                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-7">
                            <p className="text-[#E8ECEF] text-[12px]">
                                Copyright © 2023 Chuan Yang Global All rights reserved
                            </p>
                            <p className="text-[#FEFEFE] text-[12px]">Privacy Policy</p>
                            <p className="text-[#FEFEFE] text-[12px]">Terms of Use</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <img src={"/instagram.png"}/>
                            <img src={"/facebook.png"}/>
                            <img src={"/youtube.png"}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterComponent;