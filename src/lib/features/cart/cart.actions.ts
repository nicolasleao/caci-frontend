import { fetchAllProducts } from "@/lib/api/products.api";
import { AppDispatch } from "@/lib/store";
import { setCartItems, CartState } from "./cart.slice";

const getCartFromStorage = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem('dex-cart')
        return cart ? JSON.parse(cart) : {items: [], total: 0, totalOld: 0}
    }
}

export const saveCartToStorage = (state: CartState) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('dex-cart', JSON.stringify(state))
    }
}

export async function fetchCart(dispatch: AppDispatch, getState: any) {
    const cartData = getCartFromStorage();
    if (cartData.items.length) {
        dispatch(setCartItems(cartData.items))
    }
}