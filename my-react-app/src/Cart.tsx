import styles from '/src/assets/styles/Cart.module.scss'

import { useNavigate } from 'react-router-dom'

function Cart(){
    const navigate = useNavigate()
    return (
        <main>
             <div className={styles.container}>
                <h1>Корзина</h1>
                <div className={styles.content}>
                    <div className={styles.product_items}>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                    </div>
                    <div className={styles.order_container}>
                        <button className={styles.mk_order_btn} onClick={()=> navigate('/order')}>оформить заказ</button>
                        <div className={styles.order_price}>
                            <p>Общая стоимость</p>
                            <span><i>1000 P</i></span>
                        </div>
                        <div className={styles.order_delivery}>Доставим бесплатно</div>
                        
                    </div>
                </div>
             </div>
        </main>
    )
}

function Item(){
    return(
        <article className={styles.item_container}>
            <div className={styles.item_heder}>
                <button></button>
            </div>
            <div className={styles.item_content}>
                <div className={styles.img}><img src="/tea/kapuaro.png" alt="" /></div>
                <div className={styles.description}>
                    <h2>Капуэро</h2>
                    <p>Чай с яркими фруктовыми нотами горяч и пылок, как бразильское боевое искусство капоэйра.</p>
                </div>
                <div className={styles.count}>
                    <button><img src="/ico/minus.png" alt="" /></button>
                    <input type="numeric" value={2}/>
                    <button><img src="/ico/plus.png" alt="" /></button>
                </div>
                <div className={styles.price}>
                    <span>554,68</span>
                    <p>277,34</p>
                </div>
            </div>
        </article>
    )
}


export default Cart