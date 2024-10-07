"use client"
import { useState, useEffect } from "react"
import { getProducts } from "@/app/_utils/api"
import { formatCurrency } from "../_utils"
import Image from "next/image"

export default function FullCart() {
  const [products, setProducts] = useState<any[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)
  const [subtotalOld, setSubtotalOld] = useState<number>(0)

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
    <>
    <div className="font-sans container mx-auto bg-white py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center mt-12">Carrinho</h1>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="md:col-span-2 space-y-4">
                  {products.map((product: any) => (
                    <>
                      <div className="grid grid-cols-3 items-start gap-4">
                          <div className="col-span-2 flex items-start gap-4">
                              <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 p-2 rounded-md">
                                  <Image src={product.images[0]} alt={`Foto de ${product.name}`} className="w-full h-full object-contain" />
                              </div>

                              <div className="flex flex-col">
                                  <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
                                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Tam. G</p>

                                  <button type="button" className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                                          <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                      </svg>
                                      Remover
                                  </button>
                              </div>
                          </div>

                          <div className="ml-auto">
                              <h4 className="text-lg max-sm:text-base font-bold text-gray-800">{formatCurrency(product.price)}</h4>

                              <button type="button"
                                  className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                                      <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                  </svg>

                                  <span className="mx-3 font-bold">1</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                                      <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                  </svg>
                              </button>
                          </div>
                      </div>
                      <hr className="border-gray-300" />
                    </>
                  ))}
                </div>
                  

                <div className="bg-gray-100 rounded-md p-4 h-max">
                    <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Resumo do Pedido</h3>

                    <form className="mt-6">
                        <div>
                            <h3 className="text-base text-gray-800  font-semibold mb-4">Informações Pessoais</h3>
                            <div className="space-y-3">
                                <div className="relative flex items-center">
                                    <input type="text" placeholder="Nome Completo"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input type="email" placeholder="Email"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4"
                                        viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                data-original="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input type="text" placeholder="CEP (Ex. 111.111.111-11)"
                                        className="px-4 py-2.5 bg-white text-gray-800 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none" />
                                </div>
                                <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-700 hover:bg-gray-800 text-white rounded-md">Calcular Frete</button>
                            </div>
                        </div>
                    </form>

                    <ul className="text-gray-800 mt-6 space-y-3">
                        <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">{formatCurrency(subtotalOld)}</span></li>
                        <li className="flex flex-wrap gap-4 text-sm">Frete <span className="ml-auto font-bold">-</span></li>
                        <li className="gap-4 text-sm">Descontos <div className="flex flex-col"><span className="ml-auto font-bold text-red-400">- {formatCurrency(subtotalOld - subtotal)}</span><span className="ml-auto font-bold text-red-400">(10% OFF) - {formatCurrency(subtotal * 0.1)}</span></div></li>
                        <hr className="border-gray-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">{formatCurrency(subtotal - 5600)}</span></li>
                    </ul>

                    <div className="mt-6 space-y-3">
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md w-full" onClick={() => window.location.href = '/checkout'}>Continuar para Pagamento</button>
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md" onClick={() => window.location.href = '/produtos'}>Continuar Comprando</button>
                    </div>
                </div>

                
            </div>
        </div>
        <div className="bg-white w-full">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Você também pode gostar</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map(product => (
                                <div className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <Image src={product.images[0]} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {product.name}
                                        </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">caci__debut__collection</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </>
  )
}
