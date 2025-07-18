import styles from './CartItem.module.scss'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { itemCartProps } from '../types/cartItem';


const CartItem = React.memo(({teaId, name, img_name, description, price, amount, onIncrease, onDecrease, deleteInCart, onCartChange}: itemCartProps) => {
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
                <div className={styles.img}><img src={`/tea/${img_name}.png`}alt="" onClick={()=> navigate(`${ROUTES.catalog}/${teaId}`)}/></div>
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

export default CartItem