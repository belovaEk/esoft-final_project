import { fetchFavourites } from "../services/favouritesService";

import { useState, useEffect } from "react";
import { checkAuthStatus } from "../../../shared/services/authService";
import { useNavigate } from "react-router-dom";
import type { productCartT } from "../../../shared/types/productCart";

export const useFavourites = () => {
    const [favouritesItems, setFavouritesItem] =  useState<productCartT[]>();

    const [authStatus, setAuthStatus] = useState(false)

    const navigate = useNavigate()

    const fetchFavouriteItems = async () => {
        const clientStatus = await checkAuthStatus()
        if (clientStatus) {
            const data = await fetchFavourites();
            console.log(data)
            setFavouritesItem(data)
            setAuthStatus(true)
        }
        else{
            setAuthStatus(false)
        }
    }

    const deleteFavouriteItem = (id: number) => {
        setFavouritesItem(prev => prev?.filter(item => item.id !== id))
    }

    useEffect(()=> {
        fetchFavouriteItems()
    }, [])

    
    return {
        favouritesItems,
        authStatus,
        navigate,
        deleteFavouriteItem
    }

}