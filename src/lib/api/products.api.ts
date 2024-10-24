import { database } from "../database";
import { Product } from "../features/product/product.slice";

export async function fetchAllProducts(): Promise<Product[]> {
    return database.products
}