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

export const database = {
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
            ]
        },
    ],
    cart: {
        items: [
            {
                id: 1,
                name: 'CACI Cursiva Branca',
                price: 13999,
                priceOld: 17000,
                images: [
                    cursivaBranca,
                    cursivaBrancaAlt,
                    cursivaBrancaPreview
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
                ]
            },
        ]
    }
}