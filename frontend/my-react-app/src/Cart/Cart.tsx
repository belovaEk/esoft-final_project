import styles from './Cart.module.scss'

import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { fetchGet, fetchPatch } from '../subFuncs'
import { deleteInCart } from './cartFuncs'

import type { Tea } from '../interface/teaItem'

import { AuthProposal, checkAuthStatus } from '../Authorization/Authorization'

function Cart(){
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([] as Tea[]);

    const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price*item.amount, 0);

    const [authStatus, setAuthStatus] = useState(false);

    const fetchCartItems = async () => {
        const clientStatus = await checkAuthStatus();
        if (clientStatus) {
            const data = await fetchGet(`cart/`);
            setCartItems(data)
            setAuthStatus(true)
        } else {
            setAuthStatus (false)
        }
         
    }

    const updateCartItem = async (tea_id: number, newAmount: number) => {
        try {
            await fetchPatch(`cart/`, { tea_id: tea_id, newAmount: newAmount })
        } catch (error) {
            console.error('Ошибка при обновлении корзины:', error);
        }
    }

    const increaseAmount = (teaId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === teaId
                    ? { ...item, amount: item.amount + 1}
                    : item
            )
        );
        const newAmount = cartItems.find(item => item.id === teaId)!.amount + 1;
        updateCartItem(teaId, newAmount);
    };

    const decreaseAmount = (teaId: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === teaId && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            )
        );
        const newAmount = cartItems.find(item => item.id === teaId)!.amount - 1;
        if (newAmount >= 1) {
            updateCartItem(teaId, newAmount);
        }
    };


    const onCartChange = (teaId: number) => {
         setCartItems((prev) => prev.filter(item => item.id !== teaId));
    }

         

    useEffect(()=> {
        fetchCartItems()
    }, [])




    return (
        <main>
             <div className={styles.container}>
                <h1>Корзина</h1>
                {authStatus && (
                    <div className={styles.content}>
                    <div className={styles.product_items}>
                        {cartItems?.length > 0 ? (
                            cartItems.map(item => (
                               <Item
                               key={item.cartitem_id}
                               teaId={item.id}
                               img_name={item.img_name}
                               description={item.description}
                               price={item.price}
                               amount={item.amount}
                               onIncrease={() => increaseAmount(item.id)}
                               onDecrease={() => decreaseAmount(item.id)}
                               deleteInCart={() => deleteInCart(item.id)}
                               onCartChange={() => onCartChange(item.id)}
                               /> 
                            ))
                            ) : (
                            <div className={styles.conteinerNoItems}>
                                    <a 
                                    className={styles.linkToCatalog}
                                    onClick={() => navigate('/')} >Исследуйте мир чая!</a>
                            </div>
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
                )}
                {!authStatus && (
                    <AuthProposal />
                )}
             </div>
        </main>
    )
}

interface itemCartProps {
    teaId: number;
    img_name: string;
    description?: string;
    price: number;
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
    deleteInCart: (teaId: number) => void;
    onCartChange: (cartitem_id: number) => void;
}


const Item = React.memo(({teaId, img_name, description, price, amount, onIncrease, onDecrease, deleteInCart, onCartChange}: itemCartProps) => {
    const navigate = useNavigate()
    return(
        <article className={styles.item_container}>
            <div className={styles.item_heder}>
                <button onClick={()=> {
                    onCartChange(teaId)
                    deleteInCart(teaId)
                    }}></button>
            </div>
            <div className={styles.item_content}>
                <div className={styles.img}><img src={`/tea/${img_name}.png`}alt="" onClick={()=> navigate(`/catalog/${teaId}`)}/></div>
                <div className={styles.description}>
                    <h2>{img_name}</h2>
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