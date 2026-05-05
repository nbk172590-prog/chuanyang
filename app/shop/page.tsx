import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";
import { PromoBar } from "@/app/component/announcementBar/page";
import { ProductCard } from "@/app/component/productCard/page";
import React from "react";

const products = [
  {
    id: 1,
    name: "CY Kitchen Faucet",
    code: "CY-3273",
    price: 199.0,
    originalPrice: 249.0,
    rating: 4.8,
    reviewCount: 18,
    image:
      "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=650",
    isNew: true,
    discount: 20,
    category: "Kitchen",
  },
  {
    id: 2,
    name: "Luxury Sink Tap",
    code: "CY-3421",
    price: 129.0,
    originalPrice: 180.0,
    rating: 4.6,
    reviewCount: 24,
    image:
      "https://images.pexels.com/photos/29412579/pexels-photo-29412579.jpeg?auto=compress&cs=tinysrgb&h=650",
    isNew: false,
    discount: 28,
    category: "Kitchen",
  },
  {
    id: 3,
    name: "Heatproof Glass Kettle",
    code: "CY-4502",
    price: 89.99,
    originalPrice: 110.0,
    rating: 4.5,
    reviewCount: 12,
    image:
      "https://images.pexels.com/photos/5556176/pexels-photo-5556176.jpeg?auto=compress&cs=tinysrgb&h=650",
    isNew: true,
    discount: 18,
    category: "Dining",
  },
  {
    id: 4,
    name: "Bamboo Serving Basket",
    code: "CY-5050",
    price: 34.99,
    rating: 4.2,
    reviewCount: 8,
    image:
      "https://images.pexels.com/photos/10557895/pexels-photo-10557895.jpeg?auto=compress&cs=tinysrgb&h=650",
    isNew: true,
    discount: undefined,
    category: "Dining",
  },
  {
    id: 5,
    name: "Smart Air Purifier",
    code: "CY-7801",
    price: 179.0,
    originalPrice: 225.0,
    rating: 4.9,
    reviewCount: 32,
    image:
      "https://images.pexels.com/photos/29399427/pexels-photo-29399427.jpeg?auto=compress&cs=tinysrgb&h=650",
    isNew: false,
    discount: 20,
    category: "Living Room",
  },
  {
    id: 6,
    name: "Wooden Table Lamp",
    code: "CY-6600",
    price: 59.0,
    rating: 4.3,
    reviewCount: 10,
    image:
      "https://images.pexels.com/photos/32473242/pexels-photo-32473242.png?auto=compress&cs=tinysrgb&h=650",
    isNew: true,
    discount: undefined,
    category: "Living Room",
  },
];

export default function ShopPage() {
  return (
    <main className="bg-white min-h-screen">
      <PromoBar />
      <HeaderComponent />

      <section className="bg-[#F6F7F8] py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Shop</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Explore the full Chuan Yang collection
              </h1>
              <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
                Discover premium home essentials, curated kitchen and living products, and design-led details for every room.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Free shipping</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">On orders over $100</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Premium materials</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">Quality sourced from Taiwan and Europe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Featured products</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Shop our best sellers</h2>
            </div>
            <a href="/product" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              View product details
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#141718] py-14 px-4 sm:px-6 lg:px-10 text-white">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Need help?</p>
            <h3 className="mt-4 text-2xl font-bold">Expert product advice</h3>
            <p className="mt-3 text-sm text-slate-200">Our team can help you choose the right fixtures, finishes, and styling for your home.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Secure checkout</p>
            <h3 className="mt-4 text-2xl font-bold">Fast and safe payments</h3>
            <p className="mt-3 text-sm text-slate-200">We support local and international payment methods with full security.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300">Delivery</p>
            <h3 className="mt-4 text-2xl font-bold">Free shipping over $100</h3>
            <p className="mt-3 text-sm text-slate-200">Enjoy fast delivery across the region and easy returns if you change your mind.</p>
          </div>
        </div>
      </section>

      <FooterComponent />
    </main>
  );
}
