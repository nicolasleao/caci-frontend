"use client"
import Image from "next/image"
import { useState } from "react"
import gsap from "gsap"
import { useWindowDimensions } from "@/lib/hooks/responsiveness"

export default function ProductImage({ product }: { product: any }) {
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