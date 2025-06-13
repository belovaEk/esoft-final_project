import styles from '/src/assets/styles/Articles.module.scss'

function  Delivery(){
    return (
        <main>
            <div className={styles.container}>
                <h1>Доставка и оплата<br />Мы доставляем все заказы бесплатно. </h1>
                <div className={[styles.ContactCity_container, styles.delivery_container].join(' ')}>
                    <h2>По Тюмени</h2>
                    <p><strong>Сроки доставки</strong> по вашему адресу уточняйте у оператора.</p>
                    <p><strong>Доставка бесплатна для всех заказов.</strong> Минимальная сумма заказа — 0 рублей. </p>
                    <p>Доставка в Бизнес-центры или торговые центры до входа или до ресепшн.</p>
                </div>

                <div className={[styles.ContactCity_container, styles.delivery_container].join(' ')}>
                    <h2>По Казани</h2>
                    <p><strong>Сроки доставки</strong> по вашему адресу уточняйте у оператора.</p>
                    <p><strong>Доставка бесплатна для всех заказов.</strong> Минимальная сумма заказа — 0 рублей. </p>
                    <p>Доставка в Бизнес-центры или торговые центры до входа или до ресепшн.</p>
                </div>

                <div className={[styles.ContactCity_container, styles.delivery_container].join(' ')}>
                    <h2>По России</h2>
                    <p><strong>Сроки доставки</strong> от 3 до 15 рабочих дней курьерской службой, в пункты самовывоза Яндекс, Почтой России. Доступные для Вашего адреса опции доставки будут показаны при вводе адреса на этапе оформления заказа..</p>
                    <p><strong>Доставка бесплатна для всех заказов.</strong> Минимальная сумма заказа — 0 рублей. </p>
                    <p>Доставка в Бизнес-центры или торговые центры до входа или до ресепшн.</p>
                </div>
            </div>
        </main>
    )
}

export default Delivery