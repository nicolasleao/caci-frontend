import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cart.slice'
import uiReducer from './features/ui/ui.slice'
import productReducer from './features/product/product.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            ui: uiReducer,
            product: productReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']