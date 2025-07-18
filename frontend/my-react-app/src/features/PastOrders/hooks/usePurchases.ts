import { fetchPurchases } from "../services/pastOrdersService";
import { checkAuthStatus } from "../../../shared/services/authService";

import type { Tea } from "../../../type/teaItem";


import { useState, useEffect } from "react";

export const usePurchases = () => {
    const [teas, setTeas] = useState([] as Tea[])
    const [authStatus, setAuthStatus] = useState(false);

    const getTeas = async() => {
            const clientStatus = await checkAuthStatus();
            setAuthStatus(clientStatus)
            if(clientStatus) {
                const teasData = await fetchPurchases() as [Tea];
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