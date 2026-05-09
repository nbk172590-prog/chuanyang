'use client'

import React from 'react';
import {ArrowRight} from "lucide-react";

interface ArticlesProduct {
    id: number;
    name: string;
    image: string;
}

interface ArticlesCardProps {
    product: ArticlesProduct;
}

function ArticlesCard({product}: ArticlesCardProps) {
    return (

        <div>
            <img
                height={400}
                width={400}
                src={product.image}
                alt={product.name}
            />
            <div className='pt-6 pb-2'>
                {product.name}
            </div>
          {/*  <div className="flex items-center">*/}
          {/*      <span*/}
          {/*          className="text-[#141718] font-medium leading-7 tracking-[-0.4px]"*/}
          {/*          style={{fontSize: "16px", borderBottom: "1px solid #141718"}}*/}
          {/*      >*/}
          {/*  Xem thêm*/}
          {/*</span>*/}
          {/*      <ArrowRight className="w-4 h-4"/>*/}
          {/*  </div>*/}
        </div>

    );
}

export default ArticlesCard;