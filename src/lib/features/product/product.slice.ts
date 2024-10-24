import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Variation {
    id: number,
    name: string,
    inStock: boolean
}

export interface Product {
    id: number | string,
    name: string,
    description?: string,
    images: any[],
    price: number,
    priceOld?: number
    variations: Variation[]
}

interface ProductState {
    allProducts: Product[],
}

const initialState = { allProducts: [] } satisfies ProductState as ProductState

const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAllProducts(state, action: PayloadAction<Product[]>) {
            state.allProducts = action.payload
        },
    },
})

export const { setAllProducts } = productSlice.actions
export default productSlice.reducer