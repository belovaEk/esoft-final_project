import styles from './Cart.module.scss'

import { ROUTES } from '../../constants/routes'

import { useCart } from './hooks/useCart'
import CartItem from './components/CartItem'
import { deleteInCart } from '../../shared/services/cartService'

import AuthProposal from '../../shared/components/auth/AuthProposal'

function Cart(){

    const {
        cartItems,
        authStatus,
        totalCartPrice,
        increaseAmount,
        decreaseAmount,
        onCartChange,
        navigate
    } = useCart();
         

    


    return (
        <div>
             <div className={styles.container}>
                <h1>Корзина</h1>
                {authStatus ?  (
                    <div className={styles.content}>
                    <div className={styles.product_items}>
                        {cartItems?.length > 0 ? (
                            cartItems.map(item => (
                               <CartItem
                               key={item.cartitem_id}
                               teaId={item.id}
                               name={item.name}
                               img_name={item.img_name}
                               description={item.description}
                               price={item.price}
                               amount={item.amount}
                               onIncrease={() => increaseAmount(item.id)}
                               onDecrease={() => decreaseAmount(item.id)}
                               deleteInCart={deleteInCart}
                               onCartChange={onCartChange}
                               /> 
                            ))
                            ) : (
                            <div className={styles.conteinerNoItems}>
                                    <a 
                                    className={styles.linkToCatalog}
                                    onClick={() => navigate(ROUTES.catalog)} >Исследуйте мир чая!</a>
                            </div>
                        )}
                    </div>
                    <div className={styles.order_container}>
                        <button className={cartItems.length !== 0 ? styles.mk_order_btn : `${styles.mk_order_btn} ${styles.mk_order_btn_disabled}`} disabled={cartItems.length === 0} onClick={()=> navigate(ROUTES.createOrder)}>оформить заказ</button>
                        <div className={styles.order_price}>
                            <p>Общая стоимость</p>
                            <span><i>{totalCartPrice} P</i></span>
                        </div>
                        <div className={styles.order_delivery}>Доставим бесплатно</div>
                        
                    </div>
                </div>
                ) : (
                   <AuthProposal /> 
                )}
                
             </div>
        </div>
    )
}

export default Cart