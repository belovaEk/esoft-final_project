import axios from "axios";

const api: string = import.meta.env.VITE_BACK_HOST

export const http = axios.create({
  baseURL: api,
  withCredentials: true,
});
    


export async function fetchGet <T>(url: string): Promise<T> {
  try {
    const response = await http.get<T>(url);
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};



export async function fetchPost<T, R>(url: string, data: T): Promise<R> {
    try{
        const response = await http.post<R>(url, data);
        return response.data;
    } catch (error) {
        console.log('POST request failed:', error)
        throw error;
    }
    
}


export async function fetchPatch<T, R>(url: string, data: T): Promise<R> {
    try{
        const response = await http.patch<R>(url, data);
        return response.data
    } catch (error) {
        console.log('PATCH request failed:', error)
        throw error;
    }
}


export async function fetchDelete(url: string): Promise<void> {
    try{
        await http.delete(url);
    } catch (error) {
        console.log('DELETE request failed:', error)
        throw error;
    }
}

