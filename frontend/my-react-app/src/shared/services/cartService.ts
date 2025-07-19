import { fetchPost, fetchDelete } from "../api/http"


export const postInCart = async(teaId: number): Promise<void> =>{
    return await fetchPost('cart/', {tea_id: teaId})
}

export const deleteInCart = async( teaId: number): Promise<void> =>{
    return await fetchDelete(`cart?teaId=${teaId}`)
}