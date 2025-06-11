import styles from '/src/assets/styles/Footer.module.scss'

function Footer(){
    return (
        <footer>
        <section className={styles.section__subscript}>
            <div className={styles.container}>
                <div className={styles.subscript_content}>
                    <div className={styles.subscript_desc}>
                        <h2>Хотите знать больше?</h2>
                        <p>Подпишитесь на нашу рассылку и будьте в курсе последних новостей, акций и эксклюзивных предложений нашего чайного магазина.</p>
                    </div>
                    <div className={styles.subscript_form}>
                        <form>
                            <input type="text" placeholder='e-mail' id='form_input' className={styles.subscript_form_input}/>
                            <button className={styles.subscript_form_btn}>Отправить</button>
                        </form>
                        <div>
                            <input type="checkbox" id='approval'/>
                            <label htmlFor="approval">Cогласие на обработку персональных данных.</label>
                        </div>
                        
                    </div>
                    <ul className={styles.subscript_social}>
                        <li><a href="/" className={styles.link_vk}>Vkontakte</a></li>
                        <li><a href="/" className={styles.link_tg}>Telegram</a></li>
                    </ul>
                </div>
            </div>
        </section>
        <section className={styles.section__menu}>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>Контакты</h3>
                        <ul className={styles.menu_item__list}>
                            <li>Контакты</li>
                            <li>Магазины</li>
                            <li>Офисы</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>О компании</h3>
                        <ul className={styles.menu_item__list}>
                            <li>Вакансии</li>
                            <li>О нас</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>Бизнесу</h3>
                        <ul className={styles.menu_item__list}>
                            <li>Поставщикам</li>
                            <li>Франчайзинг</li>
                            <li>Корпоративные подарки</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>Клиентам</h3>
                        <ul className={styles.menu_item__list}>
                            <li>Доставка и оплата</li>
                            <li>Скидки и акции</li>
                            <li><img src="/ico/user.svg" alt="" />Кабинет</li>
                        </ul>
                    </div>
                    </div>        
                </div>
        </section>
        </footer>
    )
}

export default Footer