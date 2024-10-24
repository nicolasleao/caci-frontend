import { fetchAllProducts } from "@/lib/api/products.api";
import { AppDispatch } from "@/lib/store";
import { setAllProducts } from "./product.slice";

export async function fetchProducts(dispatch: AppDispatch, getState: any) {
    const products = await fetchAllProducts();
    dispatch(setAllProducts(products))
}