import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct } from '../types/common.types';
import {
    BASE_URL_SHOP_PRODUCTS,
    PRODUCT_LIMIT_PER_PAGE,
} from '../constants/common.constants';

export const getLimitedProducts = (
    products: Array<IProduct>,
    offset: number
) => {
    return products.filter(
        (_: IProduct, index: number) =>
            index >= offset && index < offset + PRODUCT_LIMIT_PER_PAGE
    );
};

export const fetchProducts = createAsyncThunk<
    Array<IProduct>,
    number,
    { rejectValue: string }
>('products/fetchProducts', async (offset, { rejectWithValue }) => {
    try {
        const res = await fetch(BASE_URL_SHOP_PRODUCTS);
        if (!res.ok) throw new Error(res.statusText);
        const products = await res.json();
        return getLimitedProducts(products, offset);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Arror has accured';
        return rejectWithValue(errorMessage);
    }
});
