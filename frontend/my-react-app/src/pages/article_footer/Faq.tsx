import styles from './Articles.module.scss'
function Faq(){
    return (
        <>
             <div className={styles.container}>
                <h1>Частые вопросы</h1>
                <div className={styles.faq_items}>
                    <div className={styles.faq_item}>
                        <details>
                            <summary className={styles.faq_item_name}>Как узнать статус заказа?</summary>
                             <p className={styles.faq_item_p}>Зайдите в личный кабинет, и перейдите в раздел покупки</p>       
                        </details>
                    </div>
                    <div className={styles.faq_item}>
                        <details>
                            <summary className={styles.faq_item_name}>Как оплатить заказ?</summary>
                             <p className={styles.faq_item_p}>Вы можете оплатить онлайн при оформлении заказа или оплатить покупку в магазине</p>       

                        </details>
                    </div>
                    <div className={styles.faq_item}>
                        <details>
                            <summary className={styles.faq_item_name}>Что будет, если не прийти за заказом?</summary>
                             <p className={styles.faq_item_p}>Мы расстроимся, но деньги будут возвращены на ваш счёт</p>       
                                    
                        </details>
                    </div>
                </div>
             </div>
        </>
    )
}

export default Faq