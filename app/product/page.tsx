import HeaderComponent from "@/app/component/hader/page";
import FooterComponent from "@/app/component/footer/page";
import { PromoBar } from "@/app/component/announcementBar/page";
import { ProductCard } from "@/app/component/productCard/page";
import React from "react";
import FooterBackground from "@/app/component/footer/footerBg/page";

const featuredProduct = {
  id: 1,
  name: "CY Signature Kitchen Faucet",
  code: "CY-3273",
  price: 199.0,
  originalPrice: 249.0,
  rating: 4.9,
  reviewCount: 42,
  image:
    "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=650",
  isNew: true,
  discount: 20,
  category: "Kitchen",
};

const relatedProducts = [
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
];

export default function ProductPage() {
  return (
    <main className="bg-white min-h-screen">
      <PromoBar />
      <HeaderComponent />

      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Product</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              CY Signature Kitchen Faucet
            </h1>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              A premium kitchen faucet with precision engineering, elegant matte finish, and smart water flow control. Designed for modern interiors and built for long-lasting performance.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">${featuredProduct.price.toFixed(2)}</p>
                <p className="text-sm text-slate-500 line-through">${featuredProduct.originalPrice?.toFixed(2)}</p>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8">
                <p className="text-sm text-slate-500">Rating</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">{featuredProduct.rating} / 5</p>
                <p className="text-sm text-slate-500">{featuredProduct.reviewCount} reviews</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Product details</h2>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  <li>High-performance ceramic cartridge</li>
                  <li>360° swivel spout for flexible use</li>
                  <li>Easy-to-clean anti-fingerprint finish</li>
                  <li>Water-saving aerator included</li>
                </ul>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">What makes it unique</h2>
                <p className="mt-5 text-sm text-slate-600">
                  Crafted with premium materials and engineered for quiet operation, the CY Signature faucet blends luxury design with everyday convenience.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-sm">
              <img src={featuredProduct.image} alt={featuredProduct.name} className="w-full object-cover" />
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-[#F8FAFC] p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Quick specs</p>
              <div className="mt-6 grid gap-4 text-sm text-slate-700">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span>Finish</span>
                  <span>Matte Black</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span>Flow rate</span>
                  <span>1.8 GPM</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span>Warranty</span>
                  <span>5 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F7F8] py-14 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-slate-900">Related products</h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600">Browse more items that complement this premium kitchen collection.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <FooterBackground/>
      <FooterComponent />
    </main>
  );
}
