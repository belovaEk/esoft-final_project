import { fetchGet } from "../../../shared/api/http";

import type { ProductCart } from "../../../shared/types/productCart";

export const fetchFavourites = async () :Promise<ProductCart[]> => {
    return await fetchGet(`favourites/`)
}