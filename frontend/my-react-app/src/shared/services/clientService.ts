import { fetchGet } from "../api/http"
import type { clientT } from "../types/client"


export const fetchClient = async(): Promise<clientT[]> => {
    return await fetchGet('client/')
}
