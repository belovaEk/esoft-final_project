import { useNavigate } from "react-router-dom";
import type { OrderItemProps } from "../types/pastOrder";
import { postInCart } from "../../../shared/services/cartService";
import { ROUTES } from "../../../constants/routes";

export const useOrderItem = () => {
    const navigate = useNavigate();

    async function repeatOrder(items: OrderItemProps[]): Promise<void> {
        try {
            const itemsToAdd = items.filter(item => !item.isCart);
        
            const addToCartPromises = itemsToAdd.map(item => 
                postInCart(item.tea_id)
            );    
            await Promise.all(addToCartPromises);
                
            navigate(ROUTES.cart);
        } catch(error) {
            console.error('Ошибка при добавлении товаров в корзину:', error);
        }
    }

    return {
        repeatOrder
    }
}
