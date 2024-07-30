"use client"

import { useState, useEffect } from "react"
import ProductList from "../_components/ProductList"
import { getProducts } from "../_utils/api"

export default function Products() {
    const [products, setProducts] = useState<any[]>([])
    useEffect(() => {
        const result = getProducts()
        setProducts(result)
    }, [getProducts])

    if (!products.length) return <></>
    return (
        <ProductList products={products} />
    )
}