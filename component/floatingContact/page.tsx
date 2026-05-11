"use client";

import Link from "next/link";
import {useState} from "react";

import {
    FaFacebookF,
    FaFacebookMessenger,
    FaPhoneAlt,
    FaTimes,
} from "react-icons/fa";

import {SiZalo} from "react-icons/si";

export default function FloatingContact() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Contact Buttons */}
            <div
                className={`flex flex-col items-end gap-2 transition-all duration-300 ${
                    open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5 pointer-events-none"
                }`}
            >

                {/* Phone */}
                <Link
                    href="tel:0971617101"
                    className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    <FaPhoneAlt size={20}/>
                </Link>

                {/* Facebook */}
                <Link
                    href="https://www.facebook.com/thietbivesinhdailoanhanoi"
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    <FaFacebookF size={20}/>
                </Link>

                {/* Messenger */}
                <Link
                    href="https://m.me/thietbivesinhdailoanhanoi"
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    <FaFacebookMessenger size={20}/>
                </Link>

                {/* Zalo */}
                <Link
                    href="https://zalo.me/0971617101"
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
                >
                    <SiZalo size={20}/>
                </Link>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition animate-pulse"
            >
                {open ? <FaTimes size={20}/> : <FaPhoneAlt size={20}/>}
            </button>
        </div>
    );
}