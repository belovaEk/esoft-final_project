import { fetchGet } from "../../../shared/api/http";

export const fetchOrders = async() => {
    return await fetchGet(`orders/`)
} 

export const fetchPurchases = async() => {
    return await fetchGet(`orders/prevPurchased`);
}