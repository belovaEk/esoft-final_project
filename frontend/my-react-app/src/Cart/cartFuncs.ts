
import { fetchDelete, fetchPost } from "../subFuncs"

export const postInCart = async(clientId: number, teaId: number) =>{
    return await fetchPost('cart', {client_id: clientId, tea_id: teaId})
}

export const deleteInCart = async(clientId: number, teaId: number) =>{
    const params = new URLSearchParams();
    params.append('clientId', String(clientId))
    params.append('teaId', String(teaId))
    return await fetchDelete(`cart?${params}`)
}