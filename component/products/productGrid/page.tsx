'use client';

import {useEffect, useState} from 'react';

import {ProductCard} from "../productCard/page";

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

import {db} from "@/firebase-config";
import {Product} from "@/types/product";

const defaultImage =
    "https://images.pexels.com/photos/18185916/pexels-photo-18185916.png?auto=compress&cs=tinysrgb&h=350";

const PAGE_SIZE = 12;

interface ProductGridProps {
    activeCategory: string;
    activePrice: string;
    searchTerm: string;
}

export function ProductGrid({
                                activeCategory,
                                activePrice,
                                searchTerm,
                            }: ProductGridProps) {

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [loadingMore, setLoadingMore] =
        useState(false);
    const [page, setPage] =
        useState(1);

    // NORMALIZE TEXT
    const normalizeText = (text: string) =>
        text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    // FETCH FIRST PRODUCTS
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const q = query(
                collection(db, 'products'),
                orderBy('createdAt', 'desc'),            
            );

            const snapshot = await getDocs(q);

            const data: Product[] = snapshot.docs.map((doc) => {

                const docData = doc.data();

                const product: Product = {

                    id: doc.id,

                    name:
                        docData.name || 'Sản phẩm',

                    code:
                        docData.code || undefined,

                    description:
                        docData.description || undefined,

                    category:
                        docData.category || 'Tất cả',

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

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    // LOAD MORE
    const handleLoadMore =  () => {

      setPage((prev) => prev + 1);
    };

    // FILTER PRODUCTS
    const filteredProducts = products.filter((product) => {

        // CATEGORY
        const productCategory =
            product.category?.trim().toLowerCase();

        const selectedCategory =
            activeCategory.trim().toLowerCase();

        const matchCategory =
            selectedCategory === 'tất cả'
            || productCategory === selectedCategory;

        // PRICE
        let matchPrice = true;

        if (activePrice === '0 - 3.000.000') {
            matchPrice =
                product.price >= 0 &&
                product.price <= 3000000;
        }

        if (activePrice === '3.000.000 - 5.000.000') {
            matchPrice =
                product.price > 3000000 &&
                product.price <= 5000000;
        }

        if (activePrice === '5.000.000 - 10.000.000') {
            matchPrice =
                product.price > 5000000 &&
                product.price <= 10000000;
        }

        if (activePrice === '10.000.000 - 30.000.000') {
            matchPrice =
                product.price > 10000000 &&
                product.price <= 30000000;
        }

        // SEARCH
        const matchSearch =
            normalizeText(product.name)
                .includes(
                    normalizeText(searchTerm)
                ) || normalizeText(product.category || '')
                .includes(
                    normalizeText(searchTerm)
                );

        return (
            matchCategory &&
            matchPrice &&
            matchSearch
        );
    });

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

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                {filteredProducts.length > 0 ? (

                    filteredProducts.slice(0, PAGE_SIZE * page).map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))

                ) : (

                    <div className="col-span-full text-center py-20 text-gray-500">
                        Không tìm thấy sản phẩm phù hợp
                    </div>

                )}

            </div>

            {/* LOAD MORE */}
            { filteredProducts.length >= PAGE_SIZE * page && (

                <div className="flex justify-center">

                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="
                            border border-black rounded-full
                            px-8 py-3 text-sm font-medium
                            hover:bg-black hover:text-white
                            transition disabled:opacity-50
                        "
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