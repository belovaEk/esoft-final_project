import { fetchPost } from "../../../shared/api/http";
import type { orderDataT } from "../types/formType";

export const postOrder =  async(orderData: orderDataT): Promise<void> => {
    return await fetchPost('orders/', orderData)
}