import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchCartItems, updateCartItem  } from '../services/cartService';
import { checkAuthStatus } from '../../../shared/services/authService';
import type { cartItemT } from '../types/cartItem';
import { useNavigate } from 'react-router-dom';

export const useCart = () => {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<cartItemT[]>([]);
  const [authStatus, setAuthStatus] = useState(false);

  const totalCartPrice = useMemo((): number => {
    return cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  }, [cartItems]);

  const fetchItems = async (): Promise<void> => {
    const status = await checkAuthStatus();
    setAuthStatus(status);
    if (status) {
      const data = await fetchCartItems();
      setCartItems(data);
    }
  };



  const updateAmount = async (tea_id: number, newAmount: number): Promise<void> => {
    try {
      await updateCartItem(tea_id, newAmount);
    } catch (error) {
      console.error('Ошибка при обновлении корзины:', error);
    }
  };

  const increaseAmount = useCallback((teaId: number): void => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === teaId ? { ...item, amount: item.amount + 1 } : item
      );
      const newAmount = updatedItems.find(item => item.id === teaId)!.amount;
      updateAmount(teaId, newAmount);
      return updatedItems;
    });
  }, []); 

  const decreaseAmount = useCallback((teaId: number): void => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === teaId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
      );
      const updatedItem = updatedItems.find(item => item.id === teaId);
      if (updatedItem && updatedItem.amount >= 1) {
        updateAmount(teaId, updatedItem.amount);
      }
      return updatedItems;
    });
  }, []);

  const onCartChange = useCallback((teaId: number): void => {
    setCartItems((prev) => prev.filter(item => item.id !== teaId));
  }, []);


  useEffect(()=> {
        fetchItems()
    }, [])

  return {
    cartItems,
    authStatus,
    totalCartPrice,
    fetchItems,
    increaseAmount,
    decreaseAmount,
    onCartChange,
    navigate
  };
};