import styles from '/src/assets/styles/PersonalAccount.module.scss'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function PersonalAccount(){
    const navigate = useNavigate();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    

    return (
        <>
         <main>
            <div className={styles.main_container}>
                <div className={styles.lk_container}>
                    <div className={styles.lk_aside}>
                        <div className={[styles.ico, styles.user_info].join(' ')}>
                            <span onClick={() => setIsUserModalOpen(true)}>Екатерина</span>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Финансы</h3>
                            <ul>
                                <li className={[styles.ico, styles.credit_card].join(' ')} onClick={() => setIsCardModalOpen(true)}>Способы оплаты</li>
                                {/* <li className={[styles.ico, styles.letterhead].join(' ')}>Реквизиты</li> */}
                            </ul>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Управление</h3>
                            <ul>
                                <li className={[styles.ico, styles.settings].join(' ')} onClick={() => setIsSettingsModalOpen(true)}>Настройки</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.lk_content}>
                        <div className={styles.lk_wrapper}>
                            <ul>
                                <li>
                                    <div onClick={()=> navigate('/favourites')}>
                                        <h2>Избранное</h2>
                                        <p>{56} товаров</p>
                                    </div>
                                    <img src="ico/heart_color.png" alt="" />
                                </li>
                                <li>
                                    <div onClick={()=> navigate('/shopping')}>
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
                                    <a href='mailto:support_TeaTime@mail.ru' className={[styles.ico, styles.support].join(' ')}>Написать в поддержку</a>
                                </li>
                                <li>
                                    <span className={[styles.ico, styles.faq].join(' ')} onClick={()=> navigate('/faq')}>Частые вопросы</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {isUserModalOpen && (
            <>
            <div className={styles.overlay} onClick={() => setIsUserModalOpen(false)}></div>
                <div className={styles.modal}>
                    <button className={styles.btn_exit} onClick={() => setIsUserModalOpen(false)}></button>
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
                </div>
            </>
        )
            
        }
                

        {isCardModalOpen && (
                        <>
                            <div 
                                className={styles.overlay}
                                onClick={() => setIsCardModalOpen(false)}
                            ></div>
                            <div className={styles.modal}>
                                <button 
                                    className={styles.btn_exit}
                                    onClick={() => setIsCardModalOpen(false)}
                                ></button>
                                <div className={styles.modal_container}>
                                    <h2>Привязка карты</h2>
                                    <form action="">
                                        <input type="text" id='number' placeholder='номер карты'/>
                                        <div className={styles.cart_content}>
                                            <input className={styles.cart_date} type="month" placeholder='ММ/ГГ' id='date'/>
                                            <input className={styles.cart_cvc} type="text" placeholder='CVV/CVC' id='cvc'/>
                                        </div>
                                        <button>Привязать</button>
                                    </form>
                                    <div className={styles.cart_disclaimer_container}>
                                        <p className={styles.cart_disclaimer}>Данные карты надёжно защищены</p>
                                    </div>
                                </div>
                            </div>
                        </>
        )}

        {isSettingsModalOpen && (
                <>
                    <div 
                        className={styles.overlay}
                        onClick={() => setIsSettingsModalOpen(false)}
                    ></div>
                    <div className={styles.modal}>
                        <button 
                            className={styles.btn_exit}
                            onClick={() => setIsSettingsModalOpen(false)}
                        ></button>
                        <div className={styles.modal_container}>
                            <h2>Настройки</h2>
                            <form action="" className={styles.settings_form}>
                                <label htmlFor="mailing" className={styles.settings_lable}>Получать СМС‑рассылки</label>
                                <input type="checkbox" id='mailing' className={styles.settings_checkbox}/>
                            </form>
                            <p className={styles.settings_email}>bbb@mail.ri</p>
                            <button className={styles.settings_btn}>Сохранить</button>
                        </div>
                    </div>
                </>
)}


        </>
    )



}



export default PersonalAccount