import { fetchGet } from "../../../shared/api/http";

export const fetchTea = async (id: number) => {
    return await fetchGet(`teas/${id}`);
}

