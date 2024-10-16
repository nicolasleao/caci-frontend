import { database } from './_database'

export const getCartItems = () => {
    return database.products
}