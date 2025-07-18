
import styles from './ProductCart.module.scss'
import React from 'react';
import { ROUTES } from '../../../constants/routes';
import { deleteInCart } from '../../services/cartService';
import { useProductCart } from './hooks/useProductCart';
import type { ProductCartProps } from './types/productCart';

const ProductCart = React.memo(({id, name, type_name, description, price, isFav, isCart, onFavouriteChange, authStatus, authModal, img_name}: ProductCartProps) => {
    const {
        navigate,
        isOnFavouritesPage,
        isFavourite,
        isInCart,
        changeFavourite,
        deleteInFavourite,
        setIsInCart,
        addToCart,

    } = useProductCart(isFav, isCart,  authStatus, authModal, onFavouriteChange);
    
    return(
        <article className={styles.cart} onClick={()=> navigate(`${ROUTES.catalog}/${id}`)}>
            <div className={styles.cart_inner}>
                <div className={styles.cart_header}>
                    <img className={styles.img_cross} 
                    src={
                        !isOnFavouritesPage && isFavourite 
                            ? '/ico/favourite.png'  
                            : !isOnFavouritesPage 
                            ?  "/ico/heart_lineColor.png"
                            : undefined} alt=""
                            
                    onClick={(e)=> changeFavourite( id, e)}/>
                    <img 
                    className={styles.img_cross} 
                    src={isOnFavouritesPage 
                            ? "/ico/cross_color.png" 
                            : undefined} alt="" 
                    onClick={(e)=>deleteInFavourite(id, e)}/>
                </div>
                <div className={styles.cart_content}>
                    <div className={styles.cart_img}>
                        <img src={`/tea/${img_name}.png`}alt="" />  
                    </div>
                    <h2>{name}</h2>
                    <p><i>{type_name}</i></p>
                    <div>
                        <div className={styles.cart_description}>{description}</div>
                    {!isInCart ? (
                        <button
                            className={styles.cart_btn}
                            onClick={(e) => addToCart(e, id)}>
                            <span>{price} Р/100унц</span>
                        </button>
                    ) : 
                    (
                        <div className={`${styles.cart_btn} ${styles.inCart_btn}`} onClick={(e) =>{
                            e.stopPropagation();
                            deleteInCart(id);
                            setIsInCart(false);
                        }}>
                                <span>В корзине!</span>
                        </div>
                    )
                    }
                    </div>
                    
                    
                </div>
            </div>
        </article>

    )
})

export default ProductCart