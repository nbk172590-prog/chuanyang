import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";
import { PromoBar } from "@/app/component/announcementBar/page";
import React from "react";

export default function ContactUsPage() {
  return (
    <main className="bg-white min-h-screen">
      <PromoBar />
      <HeaderComponent />

      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Let’s build the perfect home together.
            </h1>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              Reach out for product guidance, showroom appointments, or custom project support. Our team is here to help you choose the right fixtures for every space.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Customer care</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">support@chuanyang.com</p>
                <p className="mt-2 text-sm text-slate-600">Available Monday to Friday, 9am–6pm</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Visit us</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">123 Chuan Yang Street</p>
                <p className="mt-2 text-sm text-slate-600">Taipei, Taiwan</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-800">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">Email</label>
                <input
                  type="email"
                  placeholder="hello@domain.com"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project"
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F7F8] py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Get in touch</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-3 rounded-[24px] border border-slate-200 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Phone</p>
              <p className="text-lg font-semibold text-slate-900">+886 2 1234 5678</p>
            </div>
            <div className="space-y-3 rounded-[24px] border border-slate-200 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Email</p>
              <p className="text-lg font-semibold text-slate-900">hello@chuanyang.com</p>
            </div>
            <div className="space-y-3 rounded-[24px] border border-slate-200 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Working hours</p>
              <p className="text-lg font-semibold text-slate-900">Mon–Fri 9am–6pm</p>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />
    </main>
  );
}
