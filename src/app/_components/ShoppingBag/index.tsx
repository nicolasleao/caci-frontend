"use client"
import { useEffect, useState } from "react"
import { formatCurrency } from "@/app/_utils/index"
import Image from "next/image"
import { useWindowDimensions } from "@/app/_hooks/responsiveness"
import { getProducts } from "@/app/_utils/api"
import gsap from "gsap"

export default function Header() {
    const [cartActive, setCartActive] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [subtotal, setSubtotal] = useState<number>(0)
    const [subtotalOld, setSubtotalOld] = useState<number>(0)

    const openCart = () => {
        document.querySelector('#cart-backdrop')?.classList.remove('hidden')
        document.querySelector('#cart-wrapper')?.classList.remove('hidden')
        gsap.fromTo(`#cart-backdrop`, { opacity: 0 }, { opacity: 1, ease: "power2.out" });
        gsap.fromTo(`#cart-wrapper`, { x: '100%' }, { x: 1, ease: "power2.out", });
        setCartActive(true)
    }
    
    const closeCart = () => {
        gsap.fromTo(`#cart-backdrop`, { opacity: 1 }, { opacity: 0, ease: "power2.in", onComplete: () => { document.querySelector('#cart-backdrop')?.classList.add('hidden') } });
        gsap.fromTo(`#cart-wrapper`, { x: 1 }, { x: '100%', ease: "power2.in", });
        setCartActive(false)
    }

    const toggleCart = () => cartActive ? closeCart() : openCart()

    const windowDimensions = useWindowDimensions()

    useEffect(() => {
        const result = getProducts()
        let total = 0, totalOld = 0
        result.forEach(product => {
            total += product.price
            totalOld += product.priceOld || 0
        })
        setProducts(result)
        setSubtotal(total)
        setSubtotalOld(totalOld)
    }, [getProducts])
    
    return (
        <div className="relative z-10 caci-cart-ajax" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div id="cart-backdrop" className="fixed inset-0 bg-gray-500 bg-opacity-75 hidden cursor-pointer"></div>
            <div id="cart-wrapper" className="fixed inset-0 overflow-hidden hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                    <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Sacola de compras</h2>
                            <div className="ml-3 flex h-7 items-center">
                            <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={closeCart}>
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Fechar carrinho</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.map(product => (
                                    <li className="flex py-6" key={`cart-product-${product.id}`}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Image src={product.images[0]} alt={`Foto de ${product.name}`} className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                <a href="#">{product.name}</a>
                                                </h3>
                                                <p className="ml-4">{formatCurrency(product.price)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 italic">caci__debut__collection</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qtd 1</p>

                                            <div className="flex">
                                                <button type="button" className="font-medium text-gray-600 hover:text-gray-500">Remover</button>
                                            </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </div>
                        </div>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                            <p>Valor Cheio</p>
                            <p>{formatCurrency(subtotalOld)}</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                            <p>Descontos</p>
                            <div className="text-right">
                                <p className="text-red-400">- {formatCurrency(subtotalOld - subtotal)}</p>
                                <p className="text-red-400">(10% OFF) - {formatCurrency(subtotal * 0.1)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                            <p>Subtotal</p>
                            <p>{formatCurrency(subtotal - 5600)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">O valor do frete será calculado no checkout.</p>
                        <div className="mt-6">
                            <a href="/carrinho" className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">Finalizar Compra</a>
                        </div>
                        <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                            <button onClick={closeCart} type="button" className="font-medium text-gray-600 hover:text-gray-500">
                                Continuar Comprando
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}