import React from 'react';


const products = [
    {
        id: 1,
        title: 'Free Shipping',
        icon: '/shipping.png',
        content: 'Order above $200'
    },
    {
        id: 2,
        title: 'Money-back',
        icon: '/money.png',
        content: '30 days guarantee'
    },
    {
        id: 3,
        title: 'Secure Payments',
        icon: '/lock.png',
        content: 'Secured by Stripe'
    },
    {
        id: 4,
        title: '24/7 Support',
        icon: '/call.png',
        content: 'Phone and Email support'
    },
]

function StormService() {
    return (
        <div className="w-full grid grid-cols-4 gap-6">
            {
                products.map((product) => (
                    <div key={product.id}>
                        <div className="bg-[#F3F5F7] px-8 py-12 rounded">
                            <div className="">
                                <img className={'w-10 h-8 mb-6'} src={product.icon} alt=""/>
                                <p className={'text-[#141718] font-medium text-xl mb-2'}>{product.title}</p>
                                <p className={'text-[#6C7275] font-normal text-[12px]'}>{product.content}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default StormService;