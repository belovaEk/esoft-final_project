import { fetchPost, fetchDelete } from "../api/http"
export const postInCart = async(teaId: number) =>{
    return await fetchPost('cart/', {tea_id: teaId})
}

export const deleteInCart = async( teaId: number) =>{
    return await fetchDelete(`cart?teaId=${teaId}`)
}