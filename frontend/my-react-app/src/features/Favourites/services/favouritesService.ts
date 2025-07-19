import { fetchGet } from "../../../shared/api/http";

import type { productCartT } from "../../../shared/types/productCart";

export const fetchFavourites = async (): Promise<productCartT[]> => {
    return await fetchGet(`favourites/`)
}