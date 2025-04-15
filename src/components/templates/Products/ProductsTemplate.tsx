import React from 'react';
import {
    IProduct,
    TPaginationDirections,
    TTabSelect,
} from '../../../types/common.types';
import {
    OFFSET_ALL_PRODUCTS,
    OFFSET_FAVOURITE_PRODUCTS,
    PRODUCT_LIMIT_PER_PAGE,
    PRODUCT_TABS,
    TAB_ALL,
    TAB_FAVOURITE,
} from '../../../constants/common.constants';
import TabNavigation from '../../molecules/TabNavigation/TabNavigation';
import ProductsGrid from '../../organisms/ProductsGrid/ProductsGrid';
import Pagination from '../../molecules/Pagination/Pagination';
import NotFoundElement from '../../atoms/NotFoundElement/NotFoundElement';
import Loading from '../../atoms/Loading/Loading';

interface ProductsTemplateProps {
    products: Array<IProduct>;
    favouriteProducts: Array<IProduct>;
    limitedFavouriteProducts: Array<IProduct>;
    handlePaginationAllProducts: (direction: TPaginationDirections) => void;
    handlePaginationFavouriteProducts: (
        direction: TPaginationDirections
    ) => void;
    handleChangeTab: (value: string) => void;
    selectedTab: TTabSelect;
    isLoading: boolean;
}

const ProductsTemplate: React.FC<ProductsTemplateProps> = ({
    products,
    favouriteProducts,
    handlePaginationAllProducts,
    handlePaginationFavouriteProducts,
    handleChangeTab,
    selectedTab,
    limitedFavouriteProducts,
    isLoading,
}) => {
    return (
        <div>
            <TabNavigation
                tabs={PRODUCT_TABS}
                changeValue={handleChangeTab}
                value={selectedTab}
            />
            {isLoading ? (
                <Loading />
            ) : products.length === 0 && selectedTab === TAB_ALL ? (
                <NotFoundElement text="Products were not found" />
            ) : favouriteProducts.length === 0 &&
              selectedTab === TAB_FAVOURITE ? (
                <NotFoundElement text="You don't have any favourite products" />
            ) : (
                <>
                    <ProductsGrid
                        favouriteProducts={favouriteProducts}
                        selectedTab={selectedTab}
                        products={
                            selectedTab === TAB_ALL
                                ? products
                                : limitedFavouriteProducts
                        }
                    />
                    <Pagination
                        paginationMaxOffset={
                            selectedTab === TAB_ALL
                                ? 16
                                : favouriteProducts.length -
                                  PRODUCT_LIMIT_PER_PAGE
                        }
                        paginationSearchParamName={
                            selectedTab === TAB_ALL
                                ? OFFSET_ALL_PRODUCTS
                                : OFFSET_FAVOURITE_PRODUCTS
                        }
                        handlePagination={
                            selectedTab === TAB_ALL
                                ? handlePaginationAllProducts
                                : handlePaginationFavouriteProducts
                        }
                    />
                </>
            )}
        </div>
    );
};

export default ProductsTemplate;
