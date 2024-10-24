import cursivaBranca from "@/assets/img/caci-cursivo.jpg"
import cursivaBrancaAlt from "@/assets/img/caci-cursivo-frente.jpg"
import cursivaBrancaPreview from "@/assets/img/caci-cursiva-branca-costas.png"
// import cursivaBrancaPreview from "@/assets/img/render-caci-cursivo.gif"
import cursivaPreta from "@/assets/img/caci-cursivo-preta.jpg"
import cursivaPretaAlt from "@/assets/img/caci-cursivo-preta-frente.jpg"
import cloudyPreta from "@/assets/img/caci-cloudy.jpg"
import cloudyPretaAlt from "@/assets/img/caci-cloudy-costas.jpg"
import cloudyPretaPreview from "@/assets/img/caci-cloudy-preta-preview.png"

import seagulls from "@/assets/img/caci-seagulls.jpg"
import seagullsAlt from "@/assets/img/caci-seagulls-alt.jpg"
import seagullsPreview from "@/assets/img/caci-seagulls-preview.jpg"
// import cursivaPretaPreview from "@/assets/img/render-caci-cursivo-laranja.gif"
import { Product } from "../features/product/product.slice"

export const database: { products: Product[] } = {
    products: [
        {
            id: 1,
            name: 'CACI Cursiva Branca',
            price: 13999,
            priceOld: 17000,
            images: [
                cursivaBranca,
                cursivaBrancaAlt,
                cursivaBrancaPreview
            ],
            variations: [
                { id: 1, name: 'P', inStock: true },
                { id: 2, name: 'M', inStock: true },
                { id: 3, name: 'G', inStock: true },
                { id: 4, name: 'GG', inStock: true }
            ]
        },
        {
            id: 2,
            name: 'CACI Cloudy',
            price: 13999,
            priceOld: 17000,
            images: [
                cloudyPreta,
                cloudyPretaAlt,
                cloudyPretaPreview
            ],
            variations: [
                { id: 5, name: 'P', inStock: true },
                { id: 6, name: 'M', inStock: true },
                { id: 7, name: 'G', inStock: true },
                { id: 8, name: 'GG', inStock: true }
            ]
        },
        {
            id: 3,
            name: 'CACI Seagulls',
            price: 13999,
            priceOld: 17000,
            images: [
                seagulls,
                seagullsAlt,
                seagullsPreview
            ],
            variations: [
                { id: 9, name: 'P', inStock: true },
                { id: 10, name: 'M', inStock: true },
                { id: 11, name: 'G', inStock: true },
                { id: 12, name: 'GG', inStock: true }
            ]
        },
        {
            id: 4,
            name: 'CACI Cursiva v002',
            price: 13999,
            priceOld: 17000,
            images: [
                cursivaPreta,
                cursivaPretaAlt,
                cursivaBrancaPreview
            ],
            variations: [
                { id: 13, name: 'P', inStock: true },
                { id: 14, name: 'M', inStock: true },
                { id: 15, name: 'G', inStock: true },
                { id: 16, name: 'GG', inStock: true }
            ]
        },
    ]
}