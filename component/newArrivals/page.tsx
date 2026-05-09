'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from "lucide-react";
import { ProductCard } from "../productCard/page";
import Link from "next/link";
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase-config';
import {Product} from "@/types/product";



const defaultImage = "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=350";

export function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'products'),
            orderBy('createdAt', 'desc'),
            limit(12)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => {
                    const docData = doc.data() as any;
                    return {
                        id: doc.id,
                        name: docData.name || 'Sản phẩm',
                        description: docData.description  || undefined,
                        price: typeof docData.price === 'number' ? docData.price : 0,
                        originalPrice: typeof docData.originalPrice === 'number' ? docData.originalPrice : undefined,
                        rating: typeof docData.rating === 'number' ? docData.rating : 5,
                        reviewCount: typeof docData.reviewCount === 'number' ? docData.reviewCount : 0,
                        image: docData.image || docData.images?.[0] || defaultImage,
                        isNew: typeof docData.isNew === 'boolean' ? docData.isNew : true,
                        discount: typeof docData.discount === 'number' ? docData.discount : undefined,
                    } as Product;
                });
                setProducts(data);
                console.log('Fetched products:', data);
                setLoading(false);
            },
            (error) => {
                console.error('Firestore error:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <section className="w-full">
                <div className="flex items-center justify-center py-16 text-gray-500">
                    Đang tải sản phẩm...
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Sản phẩm
                </h2>

                <Link
                    href="/products"
                    className="flex items-center gap-1 text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors border-b border-[#141718] w-fit"
                >
                    Xem thêm
                    <ArrowRight className="w-4 h-4"/>
                </Link>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default NewArrivals;