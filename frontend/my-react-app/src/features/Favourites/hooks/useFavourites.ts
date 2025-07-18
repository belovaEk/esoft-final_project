import { fetchFavourites } from "../services/favouritesService";

import { useState, useEffect } from "react";
import { checkAuthStatus } from "../../../shared/services/authService";
import type { Tea } from "../../../interface/teaItem";
import { useNavigate } from "react-router-dom";

export const useFavourites = () => {
    const [favouritesItems, setFavouritesItem] = useState([] as Tea[]);

    const [authStatus, setAuthStatus] = useState(false)

    const navigate = useNavigate()

    const fetchFavouriteItems = async () => {
        const clientStatus = await checkAuthStatus()
        if (clientStatus) {
            const data = await fetchFavourites() as [Tea];
            setFavouritesItem(data)
            setAuthStatus(true)
        }
        else{
            setAuthStatus(false)
        }
    }

    const deleteFavouriteItem = (id: number) => {
        setFavouritesItem(prev => prev.filter(item => item.id !== id))
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