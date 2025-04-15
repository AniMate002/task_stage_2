import React from 'react';
import styles from './ProductsGrid.module.scss';
import { IProduct, TTabSelect } from '../../../types/common.types';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import { TAB_FAVOURITE } from '../../../constants/common.constants';

interface ProductsGridProps {
    products: Array<IProduct>;
    favouriteProducts: Array<IProduct>;
    selectedTab: TTabSelect;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
    products,
    favouriteProducts,
    selectedTab,
}) => {
    const renderedProductCards = products.map((product) => (
        <ProductCard
            key={product.id}
            product={product}
            isInFavourites={
                selectedTab === TAB_FAVOURITE ||
                !!favouriteProducts.find((curr) => curr.id === product.id)
            }
        />
    ));
    return <div className={styles.container}>{renderedProductCards}</div>;
};

export default ProductsGrid;
