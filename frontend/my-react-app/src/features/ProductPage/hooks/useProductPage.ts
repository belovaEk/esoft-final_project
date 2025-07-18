import { fetchTea } from "../services/productPageService";

import { useState, useEffect } from "react";
import { checkAuthStatus } from "../../../shared/services/authService";
import type { Tea } from "../../../type/teaItem";


import { postInFavourite, deleteInFavourite } from "../../../shared/services/favouriteService";

import { postInCart, deleteInCart } from "../../../shared/services/cartService";
import { useParams } from "react-router-dom";

export const useProductPage = () => {
    const { id } = useParams();
    const [tea, setTea] = useState<Tea | null>(null);
    const [isFavourite, setIsFavourite ] = useState(false);
    const [isInCart, setIsInCart] = useState(tea?.iscart);
    
    
    const [authModal, setAuthModal] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    
    async function getTea(id: number) {
    
        const clientStatus = await checkAuthStatus()
        setAuthStatus(clientStatus)
        try {
            const teaData = await fetchTea(id) as Tea;
            setTea(teaData);
            setIsFavourite(teaData.isfav);
            setIsInCart(teaData.iscart);
        } catch (error) {
            console.error("Ошибка при загрузке чая:", error);
        }
    }
    
    const changeFavourite = async( teaId: number, e: React.MouseEvent) =>{
        e.stopPropagation()
        if (isFavourite) {
            setIsFavourite(false);
            deleteInFavourite(teaId)
        } else{
            setIsFavourite(true);
            return await postInFavourite(teaId)
        }
    }

    useEffect(() => {
    if (id) {
      getTea(Number(id));
    }
    }, [id]);

    return {
        tea,
        isInCart,
        isFavourite,
        authStatus,
        authModal,
        changeFavourite,
        setAuthModal,
        setIsInCart,
        postInCart,
        deleteInCart
    }
    
}