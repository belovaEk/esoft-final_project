import { fetchGet } from "../api/http"

export const fetchClient = async() => {
    return await fetchGet('client/')
}
