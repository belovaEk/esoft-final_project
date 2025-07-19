
import { useState } from "react";
import { ROUTES } from "../../../../constants/routes";
import { postInFavourite, deleteInFavourite as deleteFav } from "../../../services/favouriteService";
import { postInCart } from "../../../services/cartService";
import { useNavigate, useLocation } from "react-router-dom";


export const useProductCart = (isFav: boolean, isCart: boolean, authStatus: boolean, authModal?: ()=> void, onFavouriteChange?: ((id:number )=> void)) => {
    const [isFavourite, setIsFavourite] = useState(isFav);
    const [isInCart, setIsInCart] = useState(isCart);


    const isOnFavouritesPage = useLocation().pathname === ROUTES.favourites
    const navigate = useNavigate();
    
    const changeFavourite = async( teaId: number, e: React.MouseEvent): Promise<void> =>{
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
                return await postInFavourite(teaId)
            }
        }   
    }

    const deleteInFavourite = async(teaId: number, e: React.MouseEvent): Promise<void> =>{
        e.stopPropagation();
        if(onFavouriteChange){
            onFavouriteChange(teaId);
        }

        return await deleteFav(teaId);
    }


    const addToCart = (e: React.MouseEvent, teaId: number): void => {
         e.stopPropagation();
         if (!authStatus) {
            authModal?.()
        } else {
            e.stopPropagation();
            postInCart(teaId);
            setIsInCart(true);
        }
    }

    return {
        navigate,
        isOnFavouritesPage,
        isFavourite,
        isInCart,
        changeFavourite,
        deleteInFavourite,
        setIsInCart,
        addToCart,

    }
}