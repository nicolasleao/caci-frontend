import { database } from './_database'

export interface CartItem {
    id: number,
    name: string,
    price: number,
    priceOld: number,
    quantity: number,
    images: string[],
    collection: string,
    variation: string,
}

const CLEAN_CART = "{\"items\":[],\"totalOld\":0,\"total\":0}"

let localCart: any = {}
if (typeof window !== "undefined") {
    if (!localStorage.getItem("caci-cart")) {
        localStorage.setItem("caci-cart", CLEAN_CART)
    }
    localCart = JSON.parse(localStorage.getItem("caci-cart") || CLEAN_CART)
}

export const getCartItems = () => {
    console.log(localCart)
    // return database.products
    return localCart.items
}

export const getCartData = () => {
    // return database.products
    return localCart
}

export const addToCart = (item: CartItem) => {
    // find if item exists in cart
    let index = -1
    let total = 0
    let totalOld = 0

    for (let i = 0; i < localCart['items'].length; i++) {
        if (localCart['items'][i].name === item.name) {
            localCart['items'][i].quantity += item.quantity
            index = i
            if (localCart['items'][i].quantity <= 0) {
                localCart['items'].splice(i, 1)
            } else {
                total += localCart['items'][i].price * localCart['items'][i].quantity
                totalOld += localCart['items'][i].priceOld * localCart['items'][i].quantity
            }
        } else {
            total += localCart['items'][i].price * localCart['items'][i].quantity
            totalOld += localCart['items'][i].priceOld * localCart['items'][i].quantity
        }
    }

    // If item is not already in cart, add it and update total
    if (index == -1) {
        localCart['items'].push(item)
        total += item.price * item.quantity
        totalOld += item.priceOld * item.quantity
    }

    localCart['total'] = total
    localCart['totalOld'] = totalOld

    // update local storage
    localStorage.setItem("caci-cart", JSON.stringify(localCart))

    console.log(localCart)
    return localCart
}
