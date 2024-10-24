"use client"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { CartItem, addToCart, removeFromCart } from "@/lib/features/cart/cartSlice"
import { closeCart } from "@/lib/features/cart/uiSlice"
import { formatCurrency } from "@/app/_utils/index"
import Image from "next/image"
import gsap from "gsap"

export default function Header() {
    const dispatch = useAppDispatch()
    const cartData = useAppSelector(state => state.cart)
    const { cartActive } = useAppSelector(state => state.ui)

    useEffect(() => {
        if (cartActive) {
            document.querySelector('#cart-backdrop')?.classList.remove('hidden')
            document.querySelector('#cart-wrapper')?.classList.remove('hidden')
            gsap.fromTo(`#cart-backdrop`, { opacity: 0 }, { opacity: 1, ease: "power2.out" });
            gsap.fromTo(`#cart-wrapper`, { x: '100%' }, { x: 1, ease: "power2.out", });
        } else {
            console.log('close cart')
            gsap.fromTo(`#cart-backdrop`, { opacity: 1 }, { opacity: 0, ease: "power2.in", onComplete: () => {
                document.querySelector('#cart-backdrop')?.classList.add('hidden')
            }});
            gsap.fromTo(`#cart-wrapper`, { x: 1 }, { x: '100%', ease: "power2.in", });
        }
    }, [cartActive])

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
                            <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => dispatch(closeCart())}>
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
                                {cartData?.items?.map((item: CartItem) => (
                                    <li className="flex py-6" key={`cart-product-${item.id}`}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Image src={item.images?.[0]} alt={`Foto de ${item.name}`} className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                <a href="#">{item.name}</a>
                                                </h3>
                                                <p className="ml-4">{formatCurrency(item.price)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 italic">caci__debut__collection</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                                <div className="ml-auto flex align-center justify-center rounded-md border border-gray-300">
                                                    <button type="button" onClick={() => dispatch(removeFromCart({...item, quantity: 1}))}
                                                        className="flex items-center px-3 py-1.5 text-black text-xs outline-none bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                                                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>

                                                    <span className="mx-3 font-bold text-black">{item.quantity}</span>
                                                    <button type="button" onClick={() => dispatch(addToCart({...item, quantity: 1}))}
                                                        className="flex items-center px-3 py-1.5 text-black text-xs outline-none bg-transparent">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                                                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </p>

                                            <div className="flex">
                                                <button onClick={() => {dispatch(removeFromCart(item))}} type="button" className="font-medium text-gray-600 hover:text-gray-500">Remover</button>
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
                            <p>{formatCurrency(cartData?.totalOld)}</p>
                        </div>
                        {!!cartData?.totalOld && (
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                                <p>Descontos</p>
                                <div className="text-right">
                                    <p className="text-red-400">- {formatCurrency(cartData?.totalOld - cartData?.total)}</p>
                                    {/* <p className="text-red-400">(10% OFF) - {formatCurrency(subtotal * 0.1)}</p> */}
                                </div>
                            </div>
                        )}
                        {cartData?.totalOld != cartData?.total && (
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                                <p>Subtotal</p>
                                <p>{formatCurrency(cartData?.total || 0 - cartData.totalOld || 0)}</p>
                            </div>
                        )}

                        <p className="mt-0.5 text-sm text-gray-500">O valor do frete será calculado no checkout.</p>
                        {!!cartData?.total && (
                            <div className="mt-6">
                                <a href="/carrinho" className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">Finalizar Compra</a>
                            </div>)
                        }
                        <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                            <button onClick={() => dispatch(closeCart())} type="button" className="font-medium text-gray-600 hover:text-gray-500">
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