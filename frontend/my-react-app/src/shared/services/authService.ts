import { fetchGet } from "../api/http"



export const checkAuthStatus = async() => {
    const res = await fetchGet<{isAuthenticated: boolean}>('auth/status')
    return res.isAuthenticated
}

export const logout = async () => {
    await fetchGet('auth/logout')
}
