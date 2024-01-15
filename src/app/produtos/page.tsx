import Image from "next/image"
import { formatCurrency } from "../_components/utils"
import ProductList from "../_components/ProductList"
import lisaBranca from "@/assets/img/camiseta-lisa-branca-frente.png"
import lisaBrancaAlt from "@/assets/img/camiseta-lisa-branca-verso.png"
import lisaPreta from "@/assets/img/camiseta-lisa-preta-frente.png"
import lisaPretaAlt from "@/assets/img/camiseta-lisa-preta-verso.png"

export default function Products() {
    const products = [
        {
            id: 1,
            name: 'Camiseta Lisa Branca',
            price: 11000,
            priceOld: 12999,
            images: [
                lisaBranca,
                lisaBrancaAlt
            ]
        },
        {
            id: 2,
            name: 'Camiseta Lisa Preta',
            price: 11000,
            priceOld: 12999,
            images: [
                lisaPreta,
                lisaPretaAlt
            ]
        }
    ]
    return (
        <ProductList products={products} />
    )
}