import { fetchPost, fetchDelete } from "../api/http";

export const postInFavourite = async(teaId: number) =>{
    return await fetchPost('favourites/', { tea_id: teaId})
}
    
export const deleteInFavourite = async( teaId: number) =>{
    
        const params = new URLSearchParams();
        params.append('teaId', String(teaId))
    
        return await fetchDelete(`favourites?${params.toString()}`)
}