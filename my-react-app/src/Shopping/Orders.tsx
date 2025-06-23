import styles from './Shopping.module.scss'

function Orders(){
    return(
        <section>
            <div className={styles.orders_content}>
                <Order />
                <Order />
                <Order />
            </div>
            
        </section>
    )
}

export default Orders


function Order(){
    return(
        <article>
            <div className={styles.order_container}>
                <div>
                    <h2>Заказ от {'6 июня'}</h2>
                    <span>0147418270-0107</span>
                    <div className={styles.order_status__content}>
                        <div>Статус:</div>
                        <div className={styles.order_status}>Получен</div>
                    </div> 
                    <button>Повторить</button>               
                </div>
                <div className={styles.order_items}>
                    <div className={styles.order_item}>
                        <img className={styles.order_img} src="/img_main/fruit1.png" alt="" />
                        <span>Фруктовый</span>
                    </div>
                    <div className={styles.order_item}>
                        <img className={styles.order_img} src="/img_main/black.png" alt="" />
                        <span>Черный</span>
                    </div>
                    <div className={styles.order_item}>
                        <img className={styles.order_img} src="/img_main/berry.png" alt="" />
                        <span>Ягодный</span>
                    </div>
                    <div className={styles.order_item}>
                        <img className={styles.order_img} src="/img_main/berry.png" alt="" />
                        <span>Ягодный</span>
                    </div>
                    <div className={styles.order_item}>
                        <img className={styles.order_img} src="/img_main/berry.png" alt="" />
                        <span>Ягодный</span>
                    </div>
                </div>
            </div>
        </article>
    )
}