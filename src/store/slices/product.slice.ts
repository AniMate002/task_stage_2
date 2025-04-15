import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../types/common.types';
import {
    fetchDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../../helpers/localStorage.helper';
import { LOCAL_STORAGE_KEY_PRODUCTS } from '../../constants/common.constants';
import { fetchProducts } from '../../services/product.service';

interface IInitialState {
    products: Array<IProduct>;
    favouriteProducts: Array<IProduct>;
    isLoading: boolean;
    error: string | null;
}

const initialState: IInitialState = {
    products: [],
    favouriteProducts: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getFavouriteProductsFromStore: (state) => {
            const recievedProducts = fetchDataFromLocalStorage<Array<IProduct>>(
                LOCAL_STORAGE_KEY_PRODUCTS
            );
            state.favouriteProducts = recievedProducts || [];
        },
        addFavouriteProduct: (state, action: PayloadAction<IProduct>) => {
            const foundProductIndex = state.favouriteProducts.findIndex(
                (product) => product.id === action.payload.id
            );
            if (foundProductIndex !== -1) return;
            state.favouriteProducts.push(action.payload);
            saveDataToLocalStorage(
                LOCAL_STORAGE_KEY_PRODUCTS,
                state.favouriteProducts
            );
        },
        removeFavoutiteProduct: (state, action: PayloadAction<number>) => {
            state.favouriteProducts = state.favouriteProducts.filter(
                (product) => product.id !== action.payload
            );
            saveDataToLocalStorage(
                LOCAL_STORAGE_KEY_PRODUCTS,
                state.favouriteProducts
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload!;
            });
    },
});

export const {
    getFavouriteProductsFromStore,
    addFavouriteProduct,
    removeFavoutiteProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
