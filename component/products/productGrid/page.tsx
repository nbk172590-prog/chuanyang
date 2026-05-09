'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from "../productCard/page";

import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot,
} from 'firebase/firestore';

import { db } from "@/firebase-config";
import { Product } from "@/types/product";

const defaultImage =
    "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=350";

const PAGE_SIZE = 12;

export function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [lastDoc, setLastDoc] =
        useState<QueryDocumentSnapshot<DocumentData> | null>(null);

    const [hasMore, setHasMore] = useState(true);

    // FETCH FIRST 12 PRODUCTS
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const q = query(
                collection(db, 'products'),
                orderBy('createdAt', 'desc'),
                limit(PAGE_SIZE)
            );

            const snapshot = await getDocs(q);

            const data: Product[] = snapshot.docs.map((doc) => {
                const docData = doc.data();

                const product: Product = {
                    id: doc.id,

                    name: docData.name || 'Sản phẩm',

                    code: docData.code || undefined,

                    description:
                        docData.description || undefined,

                    price:
                        typeof docData.price === 'number'
                            ? docData.price
                            : 0,

                    originalPrice:
                        typeof docData.originalPrice === 'number'
                            ? docData.originalPrice
                            : undefined,

                    rating:
                        typeof docData.rating === 'number'
                            ? docData.rating
                            : 5,

                    reviewCount:
                        typeof docData.reviewCount === 'number'
                            ? docData.reviewCount
                            : 0,

                    image:
                        docData.image ||
                        docData.images?.[0] ||
                        defaultImage,

                    isNew:
                        typeof docData.isNew === 'boolean'
                            ? docData.isNew
                            : true,

                    discount:
                        typeof docData.discount === 'number'
                            ? docData.discount
                            : undefined,
                };

                return product;
            });

            setProducts(data);

            // SAVE LAST DOCUMENT
            const lastVisible =
                snapshot.docs[snapshot.docs.length - 1];

            setLastDoc(lastVisible);

            // CHECK HAS MORE
            if (snapshot.docs.length < PAGE_SIZE) {
                setHasMore(false);
            }

        } catch (error) {
            console.error('Fetch products error:', error);
        } finally {
            setLoading(false);
        }
    };

    // LOAD MORE PRODUCTS
    const handleLoadMore = async () => {
        if (!lastDoc) return;

        try {
            setLoadingMore(true);

            const q = query(
                collection(db, 'products'),
                orderBy('createdAt', 'desc'),
                startAfter(lastDoc),
                limit(PAGE_SIZE)
            );

            const snapshot = await getDocs(q);

            const newProducts: Product[] = snapshot.docs.map((doc) => {
                const docData = doc.data();

                const product: Product = {
                    id: doc.id,

                    name: docData.name || 'Sản phẩm',

                    code: docData.code || undefined,

                    description:
                        docData.description || undefined,

                    price:
                        typeof docData.price === 'number'
                            ? docData.price
                            : 0,

                    originalPrice:
                        typeof docData.originalPrice === 'number'
                            ? docData.originalPrice
                            : undefined,

                    rating:
                        typeof docData.rating === 'number'
                            ? docData.rating
                            : 5,

                    reviewCount:
                        typeof docData.reviewCount === 'number'
                            ? docData.reviewCount
                            : 0,

                    image:
                        docData.image ||
                        docData.images?.[0] ||
                        defaultImage,

                    isNew:
                        typeof docData.isNew === 'boolean'
                            ? docData.isNew
                            : true,

                    discount:
                        typeof docData.discount === 'number'
                            ? docData.discount
                            : undefined,
                };

                return product;
            });

            // APPEND NEW PRODUCTS
            setProducts((prev) => [...prev, ...newProducts]);

            // UPDATE LAST DOC
            const lastVisible =
                snapshot.docs[snapshot.docs.length - 1];

            setLastDoc(lastVisible);

            // CHECK HAS MORE
            if (snapshot.docs.length < PAGE_SIZE) {
                setHasMore(false);
            }

        } catch (error) {
            console.error('Load more error:', error);
        } finally {
            setLoadingMore(false);
        }
    };

    // LOADING
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
        <section className="w-full flex flex-col gap-10">

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="border border-black rounded-full px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-50"
                    >
                        {loadingMore
                            ? 'Đang tải...'
                            : 'Xem thêm'}
                    </button>
                </div>
            )}

        </section>
    );
}

export default ProductGrid;