import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import {
    fetchProducts,
    getLimitedProducts,
} from '../../services/product.service';
import ProductsTemplate from '../templates/Products/ProductsTemplate';
import { useSearchParams } from 'react-router';
import {
    OFFSET_ALL_PRODUCTS,
    OFFSET_FAVOURITE_PRODUCTS,
    PRODUCT_LIMIT_PER_PAGE,
    TAB_ALL,
    TAB_FAVOURITE,
} from '../../constants/common.constants';
import { IProduct, TTabSelect } from '../../types/common.types';
import { getFavouriteProductsFromStore } from '../../store/slices/product.slice';
import { handlePagination } from '../../helpers/pagination.helper';
import Error from '../atoms/Error/Error';

const ProductsPage: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<TTabSelect>(TAB_ALL);
    const [limitedFavouriteProducts, setLimitedFavouriteProducts] = useState<
        Array<IProduct>
    >([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { products, favouriteProducts, isLoading, error } = useAppSelector(
        (state) => state.products
    );

    // fetch liked products from local storage on first render, set tab and search params
    useEffect(() => {
        if (
            !searchParams.get(OFFSET_ALL_PRODUCTS) &&
            !searchParams.get(OFFSET_FAVOURITE_PRODUCTS)
        )
            setSearchParams({ [OFFSET_ALL_PRODUCTS]: '0' });
        dispatch(getFavouriteProductsFromStore());
        setSelectedTab(
            searchParams.get(OFFSET_FAVOURITE_PRODUCTS)
                ? TAB_FAVOURITE
                : TAB_ALL
        );
    }, []);

    // get products from localStorage when search params changed
    useEffect(() => {
        if (selectedTab === TAB_FAVOURITE)
            setLimitedFavouriteProducts(
                getLimitedProducts(
                    favouriteProducts,
                    Number(searchParams.get(OFFSET_FAVOURITE_PRODUCTS))
                )
            );
    }, [dispatch, favouriteProducts, searchParams, selectedTab]);

    // fetch products from API when offset in search params changed
    useEffect(() => {
        if (selectedTab === TAB_ALL)
            dispatch(
                fetchProducts(
                    Number(searchParams.get(OFFSET_ALL_PRODUCTS)) || 0
                )
            );
    }, [dispatch, searchParams, selectedTab]);

    // handle changing tabs
    const handleChangeTab = (value: string) => {
        setSelectedTab(value as TTabSelect);
        if ((value as TTabSelect) === TAB_FAVOURITE)
            setSearchParams({ [OFFSET_FAVOURITE_PRODUCTS]: '0' });
        else setSearchParams({ [OFFSET_ALL_PRODUCTS]: '0' });
    };

    if (error) return <Error message={error} />;

    return (
        <ProductsTemplate
            isLoading={isLoading}
            products={products}
            favouriteProducts={favouriteProducts}
            limitedFavouriteProducts={limitedFavouriteProducts}
            handlePaginationAllProducts={handlePagination(
                OFFSET_ALL_PRODUCTS,
                PRODUCT_LIMIT_PER_PAGE,
                setSearchParams,
                searchParams
            )}
            handlePaginationFavouriteProducts={handlePagination(
                OFFSET_FAVOURITE_PRODUCTS,
                PRODUCT_LIMIT_PER_PAGE,
                setSearchParams,
                searchParams
            )}
            handleChangeTab={handleChangeTab}
            selectedTab={selectedTab}
        />
    );
};

export default ProductsPage;
