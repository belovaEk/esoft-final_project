
import styles from './MainContent.module.scss'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes';

function MainContent(){

    const navigate = useNavigate();

    return(
        <main>
            <section className={styles.top_section}>
                <div className={styles.container}>
                    <div className={styles.top_inner}>
                        <h1 className={styles.top__title}>Чашка чая — это момент спокойствия в хаосе жизни.</h1>
                        <p className={styles.top__text}>Широкий выбор высококачественного чая со всего мира, тщательно отобранного экспертами по чаю.</p>
                        </div>
                </div>
            </section>
            
            <section className={styles.assortment}>
                <div className={styles.container}>
                    <h2 className={styles.title}> Попробуйте всю коллекцию</h2>
                    <ul className={styles.assortment__list} onClick={() => navigate(ROUTES.catalog)}>
                        <li className={styles.assortment_item}>
                            <img className={styles.assortment__img} src="/img_main/black.jpg" alt="" />
                            <p className={styles.assortment__name}>Чёрный</p>
                        </li>
                        <li className={styles.assortment_item}>
                            <img className={styles.assortment__img}  src="/img_main/white.jpg" alt="" />
                            <p className={styles.assortment__name}>Белый</p>
                        </li>
                        <li className={styles.assortment_item}>
                            <img className={styles.assortment__img}  src="/img_main/green.jpg" alt="" />
                            <p className={styles.assortment__name}>Зелёный</p>
                        </li>
                        <li className={styles.assortment_item}>
                            <img className={styles.assortment__img}  src="/img_main/oolong.jpg" alt="" />
                            <p className={styles.assortment__name}>Улун</p>
                        </li>
                        <li className={styles.assortment_item}>
                            <img className={styles.assortment__img}  src="/img_main/pu-erh.jpg" alt="" />
                            <p className={styles.assortment__name}>Пуэр</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.prioritise}>
                 <div className={styles.container}>
                    <h2 className={styles.title}> Наши приоритеты</h2>
                    <ul className={styles.prioritise__list}>
                        <li className={styles.prioritise__item}>
                            <h3 className={styles.prioritise__title}>Чаи из своих садов</h3>
                            <p className={styles.prioritise__text}>Высшее качество</p>
                            <img src="/img_main/prioritise-1.svg" alt="" />
                        </li>
                        <li className={styles.prioritise__item}>
                            <h3 className={styles.prioritise__title}>Только листовой чай</h3>
                            <p className={styles.prioritise__text}>Лучшие напитки</p>
                            <img src="/img_main/prioritise-2.svg" alt="" />
                        </li>
                        <li className={styles.prioritise__item}>
                            <h3 className={styles.prioritise__title}>Поддержка клиентов</h3>
                            <p className={styles.prioritise__text}>Живые ответы</p>
                            <img src="/img_main/prioritise-3.svg" alt="" />
                        </li>
                        <li className={styles.prioritise__item}>
                            <h3 className={styles.prioritise__title}>Быстрая доставка</h3>
                            <p className={styles.prioritise__text}>Экономно, удобно, надежно</p>
                            <img src="/img_main/prioritise-4.svg" alt="" />
                        </li>
                    </ul>
                 </div>
                
            </section>
        </main>
    )
}

export default MainContent