import styles from '/src/assets/styles/PersonalAccount.module.scss'

function PersonalAccount(){
    return (
        <>
         <main>
            <div className={styles.main_container}>
                <div className={styles.lk_container}>
                    <div className={styles.lk_aside}>
                        <div className={[styles.ico, styles.user_info].join(' ')}>
                            <span>Екатерина</span>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Финансы</h3>
                            <ul>
                                <li className={[styles.ico, styles.credit_card].join(' ')}>Способы оплаты</li>
                                <li className={[styles.ico, styles.letterhead].join(' ')}>Реквизиты</li>
                            </ul>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Управление</h3>
                            <ul>
                                <li className={[styles.ico, styles.settings].join(' ')}>Настройки</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.lk_content}>
                        <div className={styles.lk_wrapper}>
                            <ul>
                                <li>
                                    <div>
                                        <h2>Избранное</h2>
                                        <p>{56} товаров</p>
                                    </div>
                                    <img src="ico/heart_color.png" alt="" />
                                </li>
                                <li>
                                    <div>
                                        <h2>Покупки</h2>
                                        <p>Смотреть</p>
                                    </div>
                                    <img src="/ico/bag_color.png" alt="" />
                                </li>
                                <li>
                                    <div>
                                        <h2>Ждут оценки</h2>
                                        <p>{11} товаров</p>
                                    </div>
                                    <img src="/ico/star_color.png" alt="" />
                                </li>
                            </ul>
                        </div>

                        <div className={styles.lk_service}>
                            <h2>Сервис и помощь</h2>
                            <ul>
                                <li>
                                    <span className={[styles.ico, styles.support].join(' ')}>Написать в поддержку</span>
                                </li>
                                <li>
                                    <span className={[styles.ico, styles.return].join(' ')}>Вернуть товар</span>
                                </li>
                                <li>
                                    <span className={[styles.ico, styles.faq].join(' ')}>Частые вопросы</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* <div className={styles.overlay}></div> */}
        {/* <div className={styles.modal}>
            <button className={styles.btn_exit}></button>
            <div className={styles.modal_container}>
                <h2>Личные данные</h2>
                <form action="">
                    <label htmlFor="name">Имя</label>
                    <input type="text" id='name' placeholder='name'/>
                    <label htmlFor="email">Почта</label>
                    <input type="email" placeholder='email' id='email'/>
                    <button>Сохранить</button>
                </form>

                <button className={[styles.ico, styles.logout].join(' ')}>Выйти</button>
                <button className={styles.delete_btn}>Удалить профиль</button>
            </div>
        </div> */}
        </>
       
    )
}

export default PersonalAccount