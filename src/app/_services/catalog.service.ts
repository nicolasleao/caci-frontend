import { database } from './_database'

export const getProducts = () => {
    return database.products
}