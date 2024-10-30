import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { saveCartToStorage } from './cart.actions'

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

export interface CartState {
    items: CartItem[],
    totalOld: number,
    total: number,
}


const initialState = { total: 0, totalOld: 0, items: [] } satisfies CartState as CartState

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            state.total = 0
            state.totalOld = 0
            state.items = []
        },
        addToCart(state, action: PayloadAction<CartItem>) {
            // find if item exists in cart
            let index = -1
            let total = 0
            let totalOld = 0

            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].name === action.payload.name) {
                    state.items[i].quantity += action.payload.quantity
                    index = i
                    total += state.items[i].price * state.items[i].quantity
                    totalOld += state.items[i].priceOld * state.items[i].quantity
                } else {
                    total += state.items[i].price * state.items[i].quantity
                    totalOld += state.items[i].priceOld * state.items[i].quantity
                }
            }

            // If item is not already in cart, add it and update total
            if (index == -1) {
                state.items.push(action.payload)
                total += action.payload.price * action.payload.quantity
                totalOld += action.payload.priceOld * action.payload.quantity
            }

            state.total = total
            state.totalOld = totalOld
            saveCartToStorage(state)
        },
        removeFromCart(state, action: PayloadAction<CartItem>) {
            // find if item exists in cart
            let index = -1
            let total = 0
            let totalOld = 0

            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].name === action.payload.name) {
                    state.items[i].quantity -= action.payload.quantity
                    index = i
                    if (state.items[i].quantity <= 0) {
                        state.items.splice(i, 1)
                    } else {
                        total += (state.items[i].price * action.payload.quantity)
                        totalOld += (state.items[i].priceOld * action.payload.quantity)
                    }
                }
            }

            state.total = total
            state.totalOld = totalOld
            saveCartToStorage(state)
        },
        setCartItems(state, action: PayloadAction<CartItem[]>) {
            // find if item exists in cart
            let total = 0
            let totalOld = 0

            for (let i = 0; i < action.payload.length; i++) {
                total += action.payload[i].price * action.payload[i].quantity
                totalOld += action.payload[i].priceOld * action.payload[i].quantity
            }

            state.items = action.payload
            state.total = total
            state.totalOld = totalOld
        },
    },
})

export const { clearCart, addToCart, removeFromCart, setCartItems } = cartSlice.actions
export default cartSlice.reducer