

import { fetchPost, fetchDelete } from "../subFuncs";

export const postFavourite = async(clientId: number, teaId: number) =>{
    return await fetchPost('favourites', {client_id: clientId, tea_id: teaId})
}
    
export const deleteInFavourite = async(clientId: number, teaId: number) =>{
    
        const params = new URLSearchParams();
        params.append('clientId', String(clientId))
        params.append('teaId', String(teaId))
    
        return await fetchDelete(`favourites?${params.toString()}`)
    }