import React from 'react';
import styles from './ProductCard.module.scss';
import { IProduct } from '../../../types/common.types';
import Button from '../../atoms/Button/Button';
import { useAppDispatch } from '../../../hooks/store.hooks';
import {
    addFavouriteProduct,
    removeFavoutiteProduct,
} from '../../../store/slices/product.slice';

interface ProductCardProps {
    isInFavourites: boolean;
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isInFavourites,
}) => {
    const { title, description, image, id, price } = product;
    const dispatch = useAppDispatch();
    const handleAddRemoveFavouriteProduct = () => {
        if (isInFavourites) dispatch(removeFavoutiteProduct(id));
        else dispatch(addFavouriteProduct(product));
    };
    return (
        <article className={styles.container}>
            <div className={styles.image_wrapper}>
                <img src={image} alt={title} />
            </div>
            <section className={styles.info_section}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.price}>${price}</p>
                <p className={styles.description}>{description}</p>
                <Button
                    onClick={handleAddRemoveFavouriteProduct}
                    className={styles.add_to_favourites_button}
                    text={
                        isInFavourites
                            ? 'Remove from Favourites'
                            : 'Add to Favourites'
                    }
                />
            </section>
        </article>
    );
};

export default ProductCard;
