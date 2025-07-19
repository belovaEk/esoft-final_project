import { fetchPurchases } from "../services/pastOrdersService";
import { checkAuthStatus } from "../../../shared/services/authService";

import type { ProductCart } from "../../../shared/types/productCart";


import { useState, useEffect } from "react";

export const usePurchases = () => {
    const [teas, setTeas] = useState<ProductCart[]>()
    const [authStatus, setAuthStatus] = useState(false);

    const getTeas = async() => {
            const clientStatus = await checkAuthStatus();
            setAuthStatus(clientStatus)
            if(clientStatus) {
                const teasData = await fetchPurchases();
                console.log(teasData)
                setTeas(teasData);
            }
        }
    
    useEffect(() =>{
        getTeas()
    }, [])

    return {
        teas,
        authStatus
    }

}