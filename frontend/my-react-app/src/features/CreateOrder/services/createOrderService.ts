import { fetchPost } from "../../../shared/api/http";
import type { OrderDataT } from "../types/formType";

export const postOrder =  async(orderData: OrderDataT) => {
    return await fetchPost('orders/', orderData)
}