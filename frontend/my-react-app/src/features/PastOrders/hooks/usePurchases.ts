import { fetchPurchases } from "../services/pastOrdersService";
import { checkAuthStatus } from "../../../shared/services/authService";

import type { productCartT } from "../../../shared/types/productCart";


import { useState, useEffect } from "react";

export const usePurchases = () => {
    const [teas, setTeas] = useState<productCartT[]>([])
    const [authStatus, setAuthStatus] = useState(false);

    const getTeas = async(): Promise<void> => {
            const clientStatus = await checkAuthStatus();
            setAuthStatus(clientStatus)
            if(clientStatus) {
                const teasData = await fetchPurchases();
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