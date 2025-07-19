import { fetchOrders } from "../services/pastOrdersService";

import { useState, useEffect } from "react";
import { checkAuthStatus } from "../../../shared/services/authService";
import type { orderT} from "../types/pastOrder";

export const useOrders = () =>{
    const [orders, setOrders] = useState<orderT[]>()
    
    const [authStatus, setAuthStatus] = useState(false);
    
    const getOrders = async() => {
        const clientStatus = await checkAuthStatus();
        setAuthStatus(clientStatus);

        if(clientStatus) {
            const ordersData = await fetchOrders();
            console.log(ordersData)
            setOrders(ordersData)
        }     
    }
    
    useEffect(() => {
        getOrders()
    }, [])

    return {
        orders,
        authStatus,
    }
    
}



