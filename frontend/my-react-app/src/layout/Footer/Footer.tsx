import styles from './Footer.module.scss'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ROUTES } from '../../constants/routes';

function Footer(){

    const navigate = useNavigate();

    const [subscriptionButtonText, setSubscriptionButtonText] = useState('Отправить');
    const [isChecked, setIsChecked] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!isChecked) {
            setIsWarning(true)
            setTimeout(() => setIsWarning(false), 2000)
            return;
            
        }
        setSubscriptionButtonText('Готово!');
        setTimeout(() => setSubscriptionButtonText('Отправить'), 3000);
        
       
    };

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
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='e-mail' id='form_input' className={styles.subscript_form_input} />
                            <button className={styles.subscript_form_btn}  type="submit">{subscriptionButtonText}</button>
                        </form>
                        <div>
                            <input type="checkbox" id='approval' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
                            <label htmlFor="approval">Cогласие на обработку персональных данных.</label>
                            {isWarning && (<p className=''>↑ Это обязательно ↑</p>)}
                        </div>
                        
                    </div>
                    <ul className={styles.subscript_social}>
                        <li><a href="" className={styles.link_vk} target='_blank'>Vkontakte</a></li>
                        <li><a href="" className={styles.link_tg} target='_blank'>Telegram</a></li>
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
                            <li onClick={()=> navigate(ROUTES.contacts)}>Контакты</li>
                            <li onClick={()=> navigate(ROUTES.shopsAdress)}>Магазины</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>О компании</h3>
                        <ul className={styles.menu_item__list}>
                            <li onClick={()=> navigate(ROUTES.vacancies)}>Вакансии</li>
                            <li onClick={()=> navigate(ROUTES.about)}>О нас</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>Бизнесу</h3>
                        <ul className={styles.menu_item__list}>
                            <li onClick={()=> navigate(ROUTES.supplier)}>Поставщикам</li>
                        </ul>
                    </div>
                    <div className={styles.menu_item}>
                        <h3 className={styles.menu_item__title}>Клиентам</h3>
                        <ul className={styles.menu_item__list}>
                            <li onClick={()=> navigate(ROUTES.delivery)}>Доставка и оплата</li>
                            <li onClick={()=> navigate(ROUTES.faq)}>Частые вопросы</li>
                            <li onClick={()=> navigate(ROUTES.account)}><img src="/ico/user.svg" alt="" />Кабинет</li>
                        </ul>
                    </div>
                    </div>        
                </div>
        </section>
        </footer>
    )
}

export default Footer