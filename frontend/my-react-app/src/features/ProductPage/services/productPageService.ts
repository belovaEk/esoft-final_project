import { fetchGet } from "../../../shared/api/http";
import type { productPageT } from "../types/productPage";

export const fetchTea = async (id: number): Promise<productPageT> => {
    return await fetchGet(`teas/${id}`);
}

