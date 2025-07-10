
import { fetchDelete, fetchPost } from "../subFuncs"

export const postInCart = async(teaId: number) =>{
    return await fetchPost('cart', {tea_id: teaId})
}

export const deleteInCart = async( teaId: number) =>{
    const params = new URLSearchParams();
    params.append('teaId', String(teaId))
    return await fetchDelete(`cart?${params}`)
}