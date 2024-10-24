"use client"

import { useEffect } from "react"
import ProductList from "../_components/ProductList"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { fetchProducts } from "@/lib/features/product/product.actions"
import { Product } from "@/lib/features/product/product.slice"

export default function Products() {
    const dispatch = useAppDispatch()
    const products: Product[] = useAppSelector(state => state.product.allProducts)

    useEffect(() => {
        if (!products?.length) {
            dispatch(fetchProducts)
        }
    }, [products])

    if (!products.length) return <></>
    return (
        <ProductList products={products} />
    )
}