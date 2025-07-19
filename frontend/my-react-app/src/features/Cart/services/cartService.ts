import { fetchGet, fetchPatch } from "../../../shared/api/http";
import type { cartItemT } from "../types/cartItem";

export const fetchCartItems = async (): Promise<cartItemT[]> => {
    return await fetchGet('cart/');
}

export const updateCartItem = async (tea_id: number, newAmount: number): Promise<void> => {
  return await fetchPatch(`cart/`, { tea_id, newAmount });
};
