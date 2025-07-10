import { fetchGet, fetchPatch, fetchDelete } from '../subFuncs';

import styles from './PersonalAccount.module.scss'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';



interface ClientI{
    name: string;
    email: string;
    is_mailing: boolean;
}

function PersonalAccount(){

    const navigate = useNavigate();
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const [favQuantity, setfavQuantity] = useState(0);
    const [client, setClient] = useState<ClientI>();
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        is_mailing: false,
    });

    const getClientData = async() => {
        const quantity = await fetchGet(`favourites/count`);
        let clientData = await fetchGet(`client/`);
        clientData = clientData[0] as ClientI
        setfavQuantity(Number(quantity[0].count));
        setClient(clientData);
        setFormData({
            name: clientData?.name || '',
            email: clientData?.email || '',
            is_mailing: clientData?.is_mailing || false,
        })
    }

     const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const changeClientData = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const dataToSend: Partial<ClientI> = {};
        
        if (formData.name.trim() && formData.name.trim() !== client?.name) {
            dataToSend.name = formData.name.trim();
        }
        
        if (formData.email.trim() && formData.email.trim() !== client?.email) {
            if (!validateEmail(formData.email)) {
                return;
            }
            dataToSend.email = formData.email.trim();
        }

        if (formData.is_mailing != client?.is_mailing) {
            dataToSend.is_mailing = formData.is_mailing
        }

        if (Object.keys(dataToSend).length === 0) {
            setIsUserModalOpen(false);
            return;
            
        }

        try {
            await fetchPatch(`client/`, dataToSend);
            
            setClient(prev => ({
                ...prev!,
                ...dataToSend
            }));
            
            setIsUserModalOpen(false);
            setIsSettingsModalOpen(false);
        } catch (err) {
            console.error('Ошибка обновления клиента:', err);
        }
        
    };

    const deleteAccount = async () => {
        await fetchDelete(`client/`)
        navigate('/')
    }


    const logout = async () => {
        await fetchGet('auth/logout')
        navigate('/')
    }

    useEffect(() =>{
        getClientData();
    }, [])

    return (
        <>
         <main>
            <div className={styles.main_container}>
                <div className={styles.lk_container}>
                    <div className={styles.lk_aside}>
                        <div className={[styles.ico, styles.user_info].join(' ')}>
                            <span onClick={() => setIsUserModalOpen(true)}>{client?.name || 'Укажите ваше имя'}</span>
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
                                        <p>Количество товаров: {favQuantity}</p>
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
                                {/* <li>
                                    <div>
                                        <h2>Ждут оценки</h2>
                                        <p>{11} товаров</p>
                                    </div>
                                    <img src="/ico/star_color.png" alt="" />
                                </li> */}
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
                            <input type="text" id='name' placeholder='name' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            <label htmlFor="email">Почта</label>
                            <input type="email" placeholder='email' id='email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                            <button onClick={(e)=> changeClientData(e)}>Сохранить</button>
                        </form>

                        <button className={[styles.ico, styles.logout].join(' ')}
                        onClick={()=> logout()}>Выйти</button>
                        <button className={styles.delete_btn} onClick={()=> {
                            setIsUserModalOpen(false)
                            setIsDeleteModalOpen(true)
                        }}>Удалить профиль</button>
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
                                <label htmlFor="mailing" className={styles.settings_lable}>Получать рассылки по почте</label>
                                <input type="checkbox" id='mailing' className={styles.settings_checkbox} checked={formData.is_mailing} onChange={(e) => setFormData({...formData, is_mailing: e.target.checked})}/>
                            </form>
                            <p className={styles.settings_email}>{client?.email}</p>
                            <button 
                            className={styles.settings_btn}
                            type="submit"
                            onClick={(e) => changeClientData(e)}>Сохранить</button>
                        </div>
                    </div>
                </>
)}

    {isDeleteModalOpen && (
                        <>
                            <div 
                                className={styles.overlay}
                                onClick={() => setIsDeleteModalOpen(false)}
                            ></div>
                            <div className={styles.modal}>
                                <button 
                                    className={styles.btn_exit}
                                    onClick={() => setIsDeleteModalOpen(false)}
                                ></button>
                                <div className={styles.modal_container}>
                                    <h1 className={styles.delete_warning}>ВЫ УВЕРЕНЫ?</h1>
                                    <button className={styles.delete_btnNO}
                                    onClick={() => setIsDeleteModalOpen(false)}>НЕТ</button>
                                    <button className={styles.delete_btnYES}
                                    onClick={() => deleteAccount()}>да</button>
                                </div>
                            </div>
                        </>
        )}

        </>
    )



}



export default PersonalAccount