
import styles from './ProductCart.module.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchDelete } from '../subFuncs';

import { useLocation } from 'react-router-dom';

import { postFavourite} from '../Favourites/FavFuncs';
import { postInCart, deleteInCart } from '../Cart/cartFuncs';



interface ProductCartProps {
    id: number;
    name: string;
    type_name: string;
    description?: string;
    price?: number;
    isFav: boolean;
    isCart: boolean;

    onFavouriteChange?: (id:number )=> void;

    authStatus?: boolean;
    authModal?: ()=> void;
}

const ProductCart = React.memo(({id, name, type_name, description, price, isFav, isCart, onFavouriteChange, authStatus, authModal}: ProductCartProps) => {

    const [isFavourite, setIsFavourite] = useState(isFav);
    const [isInCart, setIsInCart] = useState(isCart);


   

    const isOnFavouritesPage = useLocation().pathname === '/favourites'
    const navigate = useNavigate();
    
    const changeFavourite = async( teaId: number, e: React.MouseEvent) =>{
        e.stopPropagation();
        if (!authStatus ) {
            authModal?.()
        }
        else {
            if (isFavourite) {
            setIsFavourite(false);
            deleteInFavourite( teaId, e)
            } else{
                 
                setIsFavourite(true);
                return await postFavourite(teaId)
            }
        }   
    }

    const deleteInFavourite = async(teaId: number, e: React.MouseEvent) =>{
        e.stopPropagation();
        if(onFavouriteChange){
            onFavouriteChange(teaId);
        }

        const params = new URLSearchParams();
        params.append('teaId', String(teaId))

        return await fetchDelete(`favourites?${params.toString()}`)
    }


    const addToCart = (e: React.MouseEvent, teaId: number) => {
         e.stopPropagation();
         if (!authStatus) {
            authModal?.()
        } else {
            e.stopPropagation();
            postInCart(teaId);
            setIsInCart(true);
        }
    }
    
    return(
        <article className={styles.cart} onClick={()=> navigate(`/catalog/${id}`)}>
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
                        <img src={`/tea/${name}.png`}alt="" />  
                    </div>
                    <h2>{name}</h2>
                    <p><i>{type_name}</i></p>
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
        </article>

    )
})

export default ProductCart