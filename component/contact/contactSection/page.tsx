"use client";

import dynamic from "next/dynamic";
import {useState} from "react";
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import {db} from "@/firebase-config";


const ContactMap = dynamic(
    () => import("../mapComponent/page"),
    {
        ssr: false,
    }
);

const INFO_CARDS = [
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-5707d1ead947ed07.svg",
        label: "Địa chỉ",
        value:
            "Y01-L13, An Phú Shop Villa\nKĐT Dương Nội, Hà Đông, Hanoi, Viet Nam",
    },
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-00294d00a8ec7367.svg",
        label: "Liên hệ",
        value: "+84 971 617 101",
    },
    {
        icon: "https://cdn.codia.ai/figma/TwVJpJ9GPMQBhVfqGBVrZG/img-4f9617ef71a8148d.svg",
        label: "Email",
        value: "chuanyangvn@gmail.com",
    },
];

export function ContactSection() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        setSuccessMessage("");
        setErrorMessage("");
    };

    const validate = () => {

        let valid = true;

        const newErrors = {
            name: "",
            email: "",
            message: "",
        };

        // NAME
        if (!formData.name.trim()) {

            newErrors.name =
                "Vui lòng nhập họ và tên";

            valid = false;

        } else if (
            formData.name.trim().length < 2
        ) {

            newErrors.name =
                "Họ và tên quá ngắn";

            valid = false;
        }

        // EMAIL
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {

            newErrors.email =
                "Vui lòng nhập email";

            valid = false;

        } else if (
            !emailRegex.test(formData.email)
        ) {

            newErrors.email =
                "Email không hợp lệ";

            valid = false;
        }

        // MESSAGE
        if (!formData.message.trim()) {

            newErrors.message =
                "Vui lòng nhập tin nhắn";

            valid = false;

        } else if (
            formData.message.trim().length < 10
        ) {

            newErrors.message =
                "Tin nhắn phải ít nhất 10 ký tự";

            valid = false;
        }

        setErrors(newErrors);

        return valid;
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!validate()) return;

        try {

            setLoading(true);

            await addDoc(
                collection(db, "contacts"),
                {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    message:
                        formData.message.trim(),

                    createdAt:
                        serverTimestamp(),
                }
            );

            setSuccessMessage(
                "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất."
            );

            setFormData({
                name: "",
                email: "",
                message: "",
            });

        } catch (error) {

            console.error(error);

            setErrorMessage(
                "Có lỗi xảy ra. Vui lòng thử lại!"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col gap-8 md:gap-10">

            {/* TITLE */}
            <h2
                className="
                    font-[Poppins]
                    font-bold
                    text-[30px]
                    leading-[36px]
                    tracking-[-0.3px]
                    sm:text-[34px]
                    sm:leading-[40px]
                    md:text-[40px]
                    md:leading-[44px]
                    md:tracking-[-0.4px]
                    text-[#121212]
                    text-center
                "
            >
                Liên hệ với chúng tôi
            </h2>

            {/* INFO CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                {INFO_CARDS.map((card) => (
                    <div
                        key={card.label}
                        className="
                            bg-[#F3F5F7]
                            flex
                            flex-col
                            items-center
                            gap-4
                            px-5
                            sm:px-8
                            py-6
                            md:py-4
                            text-center
                        "
                    >
                        <img
                            src={card.icon}
                            alt={card.label}
                            className="
                                w-7
                                h-7
                                md:w-8
                                md:h-8
                            "
                        />

                        <div className="
                            flex
                            flex-col
                            items-center
                            gap-2
                        ">

                            <span
                                className="
                                    font-[Inter]
                                    font-bold
                                    text-[12px]
                                    leading-[16px]
                                    uppercase
                                    text-[#6C7275]
                                "
                            >
                                {card.label}
                            </span>

                            <span
                                className="
                                    font-[Inter]
                                    font-semibold
                                    text-[14px]
                                    leading-[24px]
                                    md:leading-[26px]
                                    text-[#141718]
                                    whitespace-pre-line
                                    break-words
                                "
                            >
                                {card.value}
                            </span>

                        </div>
                    </div>
                ))}

            </div>

            {/* FORM + MAP */}
            <div
                className="
                    flex
                    flex-col
                    xl:flex-row
                    gap-10
                    md:gap-16
                    py-10
                    md:py-20
                "
            >

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        w-full
                        xl:w-[544px]
                        flex
                        flex-col
                        gap-5
                        md:gap-6
                    "
                >

                    {/* NAME */}
                    <div className="flex flex-col gap-2">

                        <label
                            className="
                                font-[Inter]
                                font-bold
                                text-[12px]
                                uppercase
                                text-[#6C7275]
                            "
                        >
                            Họ và tên
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tên của bạn"
                            className="
                                w-full
                                h-11
                                px-4
                                border
                                border-[#CBCBCB]
                                rounded-[6px]
                                bg-white
                                text-[14px]
                                text-[#141718]
                                outline-none
                                focus:border-[#141718]
                            "
                        />

                        {errors.name && (
                            <span
                                className="
                                    text-red-500
                                    text-sm
                                "
                            >
                                {errors.name}
                            </span>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className="flex flex-col gap-2">

                        <label
                            className="
                                font-[Inter]
                                font-bold
                                text-[12px]
                                uppercase
                                text-[#6C7275]
                            "
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="
                                w-full
                                h-11
                                px-4
                                border
                                border-[#CBCBCB]
                                rounded-[6px]
                                bg-white
                                text-[14px]
                                text-[#141718]
                                outline-none
                                focus:border-[#141718]
                            "
                        />

                        {errors.email && (
                            <span
                                className="
                                    text-red-500
                                    text-sm
                                "
                            >
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* MESSAGE */}
                    <div className="flex flex-col gap-2">

                        <label
                            className="
                                font-[Inter]
                                font-bold
                                text-[12px]
                                uppercase
                                text-[#6C7275]
                            "
                        >
                            Tin nhắn
                        </label>

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Lời nhắn của bạn"
                            rows={5}
                            className="
                                w-full
                                h-[140px]
                                p-4
                                border
                                border-[#CBCBCB]
                                rounded-[6px]
                                bg-white
                                text-[14px]
                                text-[#141718]
                                resize-none
                                outline-none
                                focus:border-[#141718]
                            "
                        />

                        {errors.message && (
                            <span
                                className="
                                    text-red-500
                                    text-sm
                                "
                            >
                                {errors.message}
                            </span>
                        )}
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {successMessage && (
                        <div
                            className="
                                w-full
                                rounded-[8px]
                                border
                                border-green-200
                                bg-green-50
                                px-4
                                py-3
                                text-sm
                                text-green-700
                            "
                        >
                            {successMessage}
                        </div>
                    )}

                    {/* ERROR MESSAGE */}
                    {errorMessage && (
                        <div
                            className="
                                w-full
                                rounded-[8px]
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-700
                            "
                        >
                            {errorMessage}
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            w-full
                            sm:w-fit
                            px-10
                            py-3
                            bg-[#141718]
                            rounded-[8px]
                            text-white
                            text-[14px]
                            font-medium
                            tracking-[-0.4px]
                            hover:bg-[#2d3132]
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading
                            ? "Đang gửi..."
                            : "Gửi đi"}
                    </button>

                </form>

                {/* MAP */}
                <div className="w-full xl:flex-1">
                    <ContactMap/>
                </div>

            </div>

        </section>
    );
}