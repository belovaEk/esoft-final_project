import styles from './PersonalAccount.module.scss'

import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes';

import { useEffect } from 'react';
import AuthorizationModal from '../../components/UI/auth/AuthModal';

import DeleteAccount from './components/modal/DaleteAccount';
import UserSettingsModal from './components/modal/UserSettings';
import { usePersonalAccount } from './hooks/usePersonalAccount';
import SettingsModal from './components/modal/Settings';
import CardSettingsModal from './components/modal/CardSettings';

function PersonalAccount(){
    
    const {
        authStatus,
        client,
        isCardModalOpen,
        isAuthModalOpen,
        isDeleteModalOpen,
        isSettingsModalOpen,
        isUserModalOpen,
        favQuantity,
        formData,
        clickName,
        setIsCardModalOpen,
        setIsSettingsModalOpen,
        setIsDeleteModalOpen,
        setIsUserModalOpen,
        getClientData,
        deleteAccount,
        changeClientData,
        setIsAuthModalOpen,
        setFormData,
        navigate
    } = usePersonalAccount();

    
   
    
    useEffect(() =>{
        getClientData();
    }, [])



    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.lk_container}>
                    <div className={styles.lk_aside}>
                        <div className={[styles.ico, styles.user_info].join(' ')}>
                            <span onClick={clickName}>{client?.name || 'Войти в аккаунт'}</span>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Финансы</h3>
                            <ul>
                                <li className={[styles.ico, styles.credit_card].join(' ')} onClick={() => {
                                    if (authStatus) {
                                        setIsCardModalOpen(true)
                                    } else {
                                        setIsAuthModalOpen(true)
                                    }
                                }}>Способы оплаты</li>
                                {/* <li className={[styles.ico, styles.letterhead].join(' ')}>Реквизиты</li> */}
                            </ul>
                        </div>
                        <div className={styles.lk_aside__item}>
                            <h3>Управление</h3>
                            <ul>
                                <li className={[styles.ico, styles.settings].join(' ')} onClick={() =>{
                                    if (authStatus) {
                                         setIsSettingsModalOpen(true)
                                    } else { setIsAuthModalOpen(true)}
                                }}>Настройки</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.lk_content}>
                        <div className={styles.lk_wrapper}>
                            <ul>
                                <li>
                                    <div onClick={()=> navigate(ROUTES.favourites)}>
                                        <h2>Избранное</h2>
                                        <p>Количество товаров: {favQuantity}</p>
                                    </div>
                                    <img src="ico/heart_color.png" alt="" />
                                </li>
                                <li>
                                    <div onClick={()=> navigate(ROUTES.shopping)}>
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
                                    <span className={[styles.ico, styles.faq].join(' ')} onClick={()=> navigate(ROUTES.faq)}>Частые вопросы</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        {isUserModalOpen && client && (
            <UserSettingsModal
            client={client}
            formData={formData}
            closeFun={()=> setIsUserModalOpen(false)}
            setIsDeleteModalOpen={()=> setIsDeleteModalOpen(true)}
            changeClientData={changeClientData}
            setFormData={setFormData}
            />
        )
            
        }

        {isAuthModalOpen && (
               <AuthorizationModal 
               closeFun={() => setIsAuthModalOpen(false)}/>
)}
                

        {isCardModalOpen && (
                        <CardSettingsModal
                        closeFun={() => setIsCardModalOpen(false)}/>
        )}

        {isSettingsModalOpen && client && (
                <SettingsModal
                client={client}
                closeFun={()=> setIsSettingsModalOpen(false)}
                formData={formData}
                changeClientData={changeClientData}
                setFormData={setFormData}
                />
)}

        {isDeleteModalOpen && (
                      < DeleteAccount
                      closeFun={()=>setIsDeleteModalOpen(false)}
                      deleteAccount={deleteAccount}  />
                      
        )}

        </>
    )



}



export default PersonalAccount