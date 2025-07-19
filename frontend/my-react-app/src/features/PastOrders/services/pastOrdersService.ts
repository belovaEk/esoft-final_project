import { fetchGet } from "../../../shared/api/http";

import type { OrdersProps } from "../types/pastOrder";
import type { productCartT } from "../../../shared/types/productCart";

export const fetchOrders = async(): Promise<OrdersProps[]> => {
    return await fetchGet(`orders/`)
} 

export const fetchPurchases = async(): Promise<productCartT[]> => {
    return await fetchGet(`orders/prevPurchased`);
}