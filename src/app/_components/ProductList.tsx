"use client"

import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "../_utils/index"
import { useState } from "react"
import gsap from "gsap"
import { useWindowDimensions } from "../_hooks/responsiveness"

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
    const onMouseEnter = () => {setIsHovering(true);togglePreview(product.id)}
    const onMouseLeave = () => {setIsHovering(false);togglePreview(product.id)}
    const windowDimensions = useWindowDimensions()

    const togglePreview = (id: string) => {
        if (windowDimensions.width > 1024) {
            document.querySelector(`#preview-${id}`)?.classList.toggle('hidden')
            gsap.fromTo(`#preview-${id}`, { x: -200, opacity: 0 }, { x: -1, opacity: 1, ease: "power2.out", });
        }
    }

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
            <div className="w-full flex row">
                <h2 className="sr-only">Products</h2>
                <div className="w-0 md:w-1/4 mr-12 invisible md:visible fixed">
                    {products.map(product => (
                        <div className="hidden w-full product-large-preview" id={`preview-${product.id}`} key={`preview-${product.id}`}>
                            <Image src={product.images[product.images.length - 1]} alt={`Render 3d de ${product.name}`} />
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-3/4 ml-10 md:ml-[25%] py-16 sm:px-6 sm:py-24">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map(product => (
                            <Link href={`/produtos/${product.id}`} className="group" key={product.id}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <ProductImage product={product} />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)} {product.priceOld ? <span className="text-red-400 text-sm" style={{ textDecorationLine: 'line-through' }}>{formatCurrency(product.priceOld)}</span> : ''}</p>
                            </Link>
                        ))}
                        {/* <!-- More products... --> */}
                    </div>
                </div>
                
            </div>
        </div>
    )
}