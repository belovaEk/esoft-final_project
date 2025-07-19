import { fetchPatch, fetchDelete } from "../../../shared/api/http";
import type { clientT } from "../../../shared/types/client";

export const patchClient = async(dataToSend: Partial<clientT>): Promise<void> => {
    return await fetchPatch(`client/`, dataToSend); 
}


export const deleteClient = async(): Promise<void> => {
    return await fetchDelete(`client/`)
}