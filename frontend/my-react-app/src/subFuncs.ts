import axios from "axios";

const api: string = 'http://localhost:8080'


 

export async function fetchPost<T>(url: string, data: T) {
    return await axios.post(`${api}/${url}`, data, {withCredentials: true});
}

export async function fetchGet(url: string) {
   try {
        const response = await axios.get(`${api}/${url}`, {withCredentials: true});
        return response.data
    } catch (error) {
        console.error('GET request failed:', error);
        throw error; 
    }
}


export async function fetchPatch<T>(url: string, data: T) {
    return await axios.patch(`${api}/${url}`, data, {withCredentials: true});
}


export async function fetchDelete(url: string) {
    return await axios.delete(`${api}/${url}`, {withCredentials: true});
}

