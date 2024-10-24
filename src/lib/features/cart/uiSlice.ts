import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

interface UiState {
    cartActive: boolean,
}


const initialState = { cartActive: false } satisfies UiState as UiState

const uiSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart(state) {
            state.cartActive = true
        },
        closeCart(state) {
            state.cartActive = false
        }
    },
})

export const { openCart, closeCart } = uiSlice.actions
export default uiSlice.reducer