"use client"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { addToCart } from "@/lib/features/cart/cart.slice"
import { openCart } from "@/lib/features/ui/ui.slice"
import { fetchProducts } from "@/lib/features/product/product.actions"
import Image from "next/image"
import sizingGuide from "@/assets/img/sizing-guide.webp"
import { formatCurrency } from "@/lib/utils"
import { Variation } from "@/lib/features/product/product.slice"

export default function Product({ params, search }: any) {
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<any>(null)
  const products = useAppSelector(state => state.product.allProducts)
  const [selectedVariation, setSelectedVariation] = useState<number>(0)

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts)
      return
    }

    if (params.id) {
      const prod = products.find((p: any) => p.id == params.id)
      if (prod) {
        setProduct(prod)
      }
    }
  }, [products, params])

  const findVariation = (id: number) => {
    if (!product || !product.variations.length) {
      return 'G'
    }

    let found = product.variations[0].name
    for (let i = 0; i < product.variations.length; i++) {
      if (product.variations[i].id == id) {
        found = product.variations[i].name
        break
      }
    }
    return found
  }

  const addItem = () => {
    if (!selectedVariation) {
      alert('por favor selecione um tamanho')
      return
    }
    dispatch(addToCart({
      id: product.id,
      name: `${product.name} - ${findVariation(selectedVariation)}`,
      price: product.price,
      priceOld: product.priceOld,
      quantity: 1,
      images: product.images,
      collection: 'caci_debut_collection',
      variation: "M",
    }))
  }

  if (!product) return <></>
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <a href="/produtos" className="mr-2 text-sm font-medium text-gray-900">Masculino</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="/produtos" className="mr-2 text-sm font-medium text-gray-900">Camisetas</a>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a href="/produtos" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">{product.name}</a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {product.images.toReversed().map((image: any, index: number) => (
            <div key={`image-gallery-item-${index}`} className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <Image src={image} alt={`foto de ${product.name}`} className="h-full w-full object-cover object-center" />
            </div>
          ))}
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg lg:hidden">
            <Image src={product.images[product.images.length - 1]} alt={`foto de ${product.name}`} className="h-full w-full object-cover object-center" />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{formatCurrency(product.price)} <span className="text-red-400 line-through text-lg">{formatCurrency(product.priceOld)}</span></p>

            <form className="mt-10">
              {/* Colors

              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center space-x-3">
                    <label aria-label="White" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                      <input type="radio" name="color-choice" value="White" className="sr-only"/>
                      <span aria-hidden="true" className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-white"></span>
                    </label>
                    <label aria-label="Gray" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                      <input type="radio" name="color-choice" value="Gray" className="sr-only"/>
                      <span aria-hidden="true" className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-200"></span>
                    </label>
                    <label aria-label="Black" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none">
                      <input type="radio" name="color-choice" value="Black" className="sr-only"/>
                      <span aria-hidden="true" className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-900"></span>
                    </label>
                  </div>
                </fieldset>
              </div>

              */}

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-500">Guia de Tamanhos</a>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.variations?.map((variation: Variation) => {
                      const inStockClass = 'group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4'
                      const outOfStockClass = 'group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50 px-4 py-3 text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-4'
                      return (
                        <div
                          key={`prod-variation-${variation.id}`}
                          onClick={() => setSelectedVariation(variation.id)} 
                          className={variation.inStock ? `${inStockClass} ${selectedVariation == variation.id ? 'ring-2 ring-gray-500' : ''}` : outOfStockClass}
                        >
                          <span>{variation.name}</span>
                          {!variation.inStock && (
                            <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                              <svg className="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                                <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div
                onClick={() => { if (selectedVariation) { addItem(); dispatch(openCart()) } }}
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent ${selectedVariation ? 'bg-black cursor-pointer hover:bg-gray-800' : 'bg-gray-300 cursor-no-drop'} px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
              >
                Adicionar ao Carrinho
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">A Sun Faded Basics Tee - Black é fabricada em malha premium 100% algodão com alta gramatura de 270 GSM. Com modelagem relaxed e gola de 2,5 cm, a peça exibe um visual vintage, com desbotamento leve e pequenos puídos na gola, mangas e barras. A camiseta conta com uma pequena estampa em silk na parte frontal e um detalhe em pedra turquesa próximo à gola na parte traseira.

O modelo mede 1,83m e veste o tamanho M.</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Atributos</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400"><span className="text-gray-600">Modelagem Street confeccionada em 100% algodão heavyweight desenvolvido exclusivamente pela CACI</span></li>
                  <li className="text-gray-400"><span className="text-gray-600">Gráfico exclusivo disponível em edição limitada</span></li>
                  <li className="text-gray-400"><span className="text-gray-600">Pre-lavada e pre-encolhida</span></li>
                </ul>
              </div>
            </div>

            <Image src={sizingGuide} alt="Guia de tamanhos" className="w-[70%]"/>
          </div>
        </div>
      </div>
    </div>
  )
}
