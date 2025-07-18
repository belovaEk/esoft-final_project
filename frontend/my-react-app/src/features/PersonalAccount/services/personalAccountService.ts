import { fetchPatch, fetchDelete } from "../../../shared/api/http";
import type { ClientI } from "../../../shared/types/client";

export const patchClient = async(dataToSend: Partial<ClientI>) => {
    return await fetchPatch(`client/`, dataToSend); 
}


export const deleteClient = async() => {
    return await fetchDelete(`client/`)
}