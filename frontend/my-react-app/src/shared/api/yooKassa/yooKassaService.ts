import { fetchPost } from "../http";

export const createPayment = async (amount: string): Promise<void> => {
    const confirmationUrl: string = await fetchPost('yooKassa/create-payment', {amount: amount})
    window.location.href = confirmationUrl
}