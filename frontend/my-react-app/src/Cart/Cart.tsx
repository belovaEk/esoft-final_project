import { clientId } from '../subFuncs'

import styles from './Cart.module.scss'

import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { fetchGet, fetchPatch } from '../subFuncs'
import { deleteInCart } from './cartFuncs'

import type { Tea } from '../interface/teaItem'

function Cart(){
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([] as Tea[]);

    const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price*item.amount, 0);

    const fetchCartItems = async (clientId: number) => {
         const data = await fetchGet(`cart/${clientId}`);
         setCartItems(data)
    }

    const updateCartItem = async (cartitem_id: number, newAmount: number) => {
        try {
            await fetchPatch(`cart`, { cartitem_id: cartitem_id, newAmount: newAmount })
        } catch (error) {
            console.error('Ошибка при обновлении корзины:', error);
        }
    }

    const increaseAmount = (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartitem_id === itemId
                    ? { ...item, amount: item.amount + 1}
                    : item
            )
        );
        const newAmount = cartItems.find(item => item.cartitem_id === itemId)!.amount + 1;
        updateCartItem(itemId, newAmount);
    };

    const decreaseAmount = (itemId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartitem_id === itemId && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            )
        );
        const newAmount = cartItems.find(item => item.cartitem_id === itemId)!.amount - 1;
        if (newAmount >= 1) {
            updateCartItem(itemId, newAmount);
        }
    };


    const onCartChange = (cartitem_id: number) => {
         setCartItems((prev) => prev.filter(item => item.cartitem_id !== cartitem_id));
    }

         

    useEffect(()=> {
        fetchCartItems(clientId)
    }, [])




    return (
        <main>
             <div className={styles.container}>
                <h1>Корзина</h1>
                <div className={styles.content}>
                    <div className={styles.product_items}>
                        {cartItems?.length > 0 ? (
                            cartItems.map(item => (
                               <Item
                               key={item.cartitem_id}
                               cartitem_id={item.cartitem_id}
                               id={item.id}
                               name={item.name}
                               description={item.description}
                               price={item.price}
                               amount={item.amount}
                               onIncrease={() => increaseAmount(item.cartitem_id)}
                               onDecrease={() => decreaseAmount(item.cartitem_id)}
                               deleteInCart={() => deleteInCart(clientId, item.id)}
                               onCartChange={() => onCartChange(item.cartitem_id)}
                               /> 
                            ))
                            ) : (
                            <div>Пока ничего нет</div>
                        )}
                    </div>
                    <div className={styles.order_container}>
                        <button className={cartItems.length !== 0 ? styles.mk_order_btn : `${styles.mk_order_btn} ${styles.mk_order_btn_disabled}`} disabled={cartItems.length === 0} onClick={()=> navigate('/order')}>оформить заказ</button>
                        <div className={styles.order_price}>
                            <p>Общая стоимость</p>
                            <span><i>{totalCartPrice} P</i></span>
                        </div>
                        <div className={styles.order_delivery}>Доставим бесплатно</div>
                        
                    </div>
                </div>
             </div>
        </main>
    )
}

interface itemCartProps {
    cartitem_id: number;
    id: number;
    name: string;
    description?: string;
    price: number;
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
    deleteInCart: (id: number, teaId: number) => void;
    onCartChange: (cartitem_id: number) => void;
}


const Item = React.memo(({cartitem_id, id, name, description, price, amount, onIncrease, onDecrease, deleteInCart, onCartChange}: itemCartProps) => {
    const navigate = useNavigate()
    return(
        <article className={styles.item_container}>
            <div className={styles.item_heder}>
                <button onClick={()=> {
                    onCartChange(cartitem_id)
                    deleteInCart(clientId, id)
                    }}></button>
            </div>
            <div className={styles.item_content}>
                <div className={styles.img}><img src={`/tea/${name}.png`}alt="" onClick={()=> navigate(`/catalog/${id}`)}/></div>
                <div className={styles.description}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <div className={styles.count}>
                    <button onClick={onDecrease}><img src="/ico/minus.png" alt="уменьшить" /></button>
                    <input type="numeric" value={amount}/>
                    <button onClick={onIncrease}><img src="/ico/plus.png" alt="увеличить" /></button>
                </div>
                <div className={styles.price}>
                    <span>{amount*price}</span>
                    <p>{price}</p>
                </div>
            </div>
        </article>
    )
})


export default Cart