import { fetchGet } from "../../../shared/api/http";

export const fetchFavourites = async () => {
    return await fetchGet(`favourites/`)
}