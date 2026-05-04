import { ArrowRight } from "lucide-react";
import {ProductCard} from "../productCard/page";


const faucet1 = "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=350";
const faucet2 = "https://images.pexels.com/photos/29412579/pexels-photo-29412579.jpeg?auto=compress&cs=tinysrgb&h=350";
const faucet3 = "https://images.pexels.com/photos/29399427/pexels-photo-29399427.jpeg?auto=compress&cs=tinysrgb&h=350";
const faucet4 = "https://images.pexels.com/photos/32473242/pexels-photo-32473242.png?auto=compress&cs=tinysrgb&h=350";
const toaster1 = "https://images.pexels.com/photos/36573009/pexels-photo-36573009.jpeg?auto=compress&cs=tinysrgb&h=350";
const toaster2 = "https://images.pexels.com/photos/5556176/pexels-photo-5556176.jpeg?auto=compress&cs=tinysrgb&h=350";
const basket1 = "https://images.pexels.com/photos/10557895/pexels-photo-10557895.jpeg?auto=compress&cs=tinysrgb&h=350";

const products = [
    {
        id: 1,
        name: "CY-3273",
        code: "CY-3273",
        price: 199.0,
        originalPrice: 400.0,
        rating: 5,
        reviewCount: 12,
        image: faucet1,
        isNew: true,
        discount: 25,
    },
    {
        id: 2,
        name: "CY-3273",
        code: "CY-3273",
        price: 24.99,
        rating: 5,
        reviewCount: 8,
        image: faucet2,
        isNew: true,
        discount: 25,
    },
    {
        id: 3,
        name: "Luxury Kitchen Sink Tap",
        code: undefined,
        price: 24.99,
        rating: 5,
        reviewCount: 15,
        image: faucet3,
        isNew: true,
        discount: 25,
    },
    {
        id: 4,
        name: "Luxury Kitchen Sink Tap",
        code: undefined,
        price: 24.99,
        rating: 5,
        reviewCount: 11,
        image: faucet4,
        isNew: true,
        discount: 25,
    },
    {
        id: 5,
        name: "Luxury Kitchen Sink Tap",
        code: undefined,
        price: 24.99,
        rating: 5,
        reviewCount: 9,
        image: faucet1,
        isNew: true,
        discount: 25,
    },
    {
        id: 6,
        name: "Toasted",
        code: undefined,
        price: 224.99,
        rating: 5,
        reviewCount: 7,
        image: toaster1,
        isNew: true,
        discount: 25,
    },
    {
        id: 7,
        name: "Bamboo basket",
        code: undefined,
        price: 24.99,
        rating: 5,
        reviewCount: 5,
        image: basket1,
        isNew: true,
        discount: undefined,
    },
    {
        id: 8,
        name: "CY-3273",
        code: "CY-3273",
        price: 24.99,
        rating: 5,
        reviewCount: 6,
        image: faucet2,
        isNew: false,
        discount: 25,
    },
    {
        id: 9,
        name: "CY-3273",
        code: "CY-3273",
        price: 24.99,
        rating: 5,
        reviewCount: 4,
        image: faucet3,
        isNew: true,
        discount: 25,
    },
    {
        id: 10,
        name: "CY-3273",
        code: "CY-3273",
        price: 24.99,
        rating: 5,
        reviewCount: 3,
        image: faucet4,
        isNew: false,
        discount: 25,
    },
    {
        id: 11,
        name: "CY-3273",
        code: "CY-3273",
        price: 199.0,
        originalPrice: 400.0,
        rating: 5,
        reviewCount: 10,
        image: faucet1,
        isNew: true,
        discount: 25,
    },
    {
        id: 12,
        name: "Toasted",
        code: undefined,
        price: 224.99,
        rating: 5,
        reviewCount: 8,
        image: toaster2,
        isNew: true,
        discount: 25,
    },
    {
        id: 13,
        name: "Bamboo basket",
        code: undefined,
        price: 24.99,
        rating: 5,
        reviewCount: 5,
        image: basket1,
        isNew: true,
        discount: undefined,
    },
    {
        id: 14,
        name: "CY-3273",
        code: "CY-3273",
        price: 24.99,
        rating: 5,
        reviewCount: 6,
        image: faucet3,
        isNew: false,
        discount: 25,
    },
];

export function NewArrivals() {
    return (
        <section className="w-full">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight py-12">New Arrivals</h2>
                <a
                    href="#"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    More Products
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {products.slice(0, 12).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
