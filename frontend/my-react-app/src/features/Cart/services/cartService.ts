import { fetchGet, fetchPatch } from "../../../shared/api/http";

export const fetchCartItems = async () => {
    return await fetchGet('cart/');
}

export const updateCartItem = async (tea_id: number, newAmount: number) => {
  return await fetchPatch(`cart/`, { tea_id, newAmount });
};
