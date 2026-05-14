"use client";

import { db } from "@/firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Check, Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarShopProps {
  activeCategory: string;
  setActiveCategory: (value: string) => void;

  activePrice: string;
  setActivePrice: (value: string) => void;

  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
interface Category {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function SidebarShop({
  activeCategory,
  setActiveCategory,
  activePrice,
  setActivePrice,
  searchTerm,
  setSearchTerm,
}: SidebarShopProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const priceRanges = [
    "Tất cả",
    "0 - 3.000.000",
    "3.000.000 - 5.000.000",
    "5.000.000 - 10.000.000",
    "10.000.000 - 30.000.000",
  ];
  useEffect(() => {
    try {
      const q = query(
        collection(db, "categories"),
        orderBy("createdAt", "desc"),
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              id: doc.id,
              name: docData.name,
              description: docData.description,
              createdAt: docData.createdAt?.toDate() || new Date(),
              updatedAt: docData.updatedAt?.toDate() || new Date(),
            };
          });
          setCategories([
            {
              id: "all",
              name: "Tất cả",
              description: "",
            },
            ...data,
          ]);
          setLoading(false);
        },
        (err: any) => {
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err: any) {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Đang tải danh mục...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <aside
      className="
                hidden lg:flex
                lg:w-[240px] xl:w-[260px] 2xl:w-[280px]
                shrink-0 flex-col
                gap-6 xl:gap-8 2xl:gap-10
            ">
      {/* SEARCH */}
      <div className="flex flex-col gap-3">
        <h3
          className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    ">
          Tìm kiếm
        </h3>

        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
                        w-full
                        border border-gray-300
                        rounded-lg
                        px-4 py-2.5
                        text-[14px]
                        outline-none
                        focus:border-black
                        transition
                    "
        />
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col gap-4 xl:gap-5">
        <h3
          className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    ">
          Danh mục
        </h3>

        <ul className="flex flex-col gap-2 xl:gap-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCategory(cat.name)}
                className={`
                                    text-left font-semibold transition
                                    text-[13px] xl:text-[14px] 2xl:text-[15px]

                                    ${
                                      activeCategory === cat.name
                                        ? "text-[#121212] border-b border-[#121212] pb-[2px]"
                                        : "text-[#807E7E] hover:text-[#121212]"
                                    }
                                `}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* PRICE */}
      <div className="flex flex-col gap-4 xl:gap-5">
        <h3
          className="
                        font-semibold
                        text-[14px] xl:text-[15px] 2xl:text-[16px]
                        tracking-[0.02em] text-[#121212]
                    ">
          Giá tiền
        </h3>

        <ul className="flex flex-col gap-2 xl:gap-3">
          {priceRanges.map((price) => (
            <li
              key={price}
              onClick={() => setActivePrice(price)}
              className="
                                flex justify-between items-center
                                cursor-pointer group
                            ">
              <span
                className={`
                                    font-semibold transition
                                    text-[13px] xl:text-[14px] 2xl:text-[15px]

                                    ${
                                      activePrice === price
                                        ? "text-[#121212]"
                                        : "text-[#6C7275] group-hover:text-[#121212]"
                                    }
                                `}>
                {price}
              </span>

              {/* CHECKBOX */}
              <div
                className={`
                                    w-4 h-4 xl:w-5 xl:h-5
                                    border rounded-sm
                                    flex items-center justify-center
                                    transition

                                    ${
                                      activePrice === price
                                        ? "bg-black border-black"
                                        : "border-gray-300 bg-white"
                                    }
                                `}>
                {activePrice === price && (
                  <Check
                    className="
                                            w-3 h-3 xl:w-3.5 xl:h-3.5
                                            text-white
                                        "
                    strokeWidth={3}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
