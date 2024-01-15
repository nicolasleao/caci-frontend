"use client"

import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "../_components/utils"
import { useState } from "react"

interface Product {
    id: number | string,
    name: string,
    description?: string,
    images: any[],
    price: number,
    priceOld?: number
}

interface ProductListProps {
    products: Product[]
}

function ProductImage({ product }: { product: any }) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isHovering && product.images.length > 1 ? (
                <Image src={product.images[1]} alt={`Foto de ${product.name}`} className="product-image h-full w-full object-cover object-center" />
            ) : (
                <Image src={product.images[0]} alt={`Foto de ${product.name}`} className="product-image h-full w-full object-cover object-center" />
            )}
        </div>
    )
}

export default function ProductList({ products }: ProductListProps) {
    

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map(product => (
                        <Link href={`/produtos/${product.id}`} className="group" key={product.id}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <ProductImage product={product} />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
                        </Link>
                    ))}
                    {/* <!-- More products... --> */}
                </div>
            </div>
        </div>
    )
}