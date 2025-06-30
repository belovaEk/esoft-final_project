import styles from './ProductPage.module.scss'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchGet } from '../subFuncs';

import type { Tea } from '../interface/teaItem';

function ProductPage(){
    const { id } = useParams();

    const [tea, setTea] = useState<Tea | null>(null); 

   async function getTea(id: number) {
    try {
        const teaData = await fetchGet(`teas/${id}`);
        setTea(teaData);
    } catch (error) {
        console.error("Ошибка при загрузке чая:", error);
    }
}

     useEffect(() => {
    if (id) {
      getTea(Number(id));
    }
    }, [id]);

    console.log(tea)
    return (
        <main>
             <div className={styles.container}>
                {/* <button className={styles.back_btn}>назад</button> */}
                <h1>{tea?.name || "Загрузка..."}</h1>

                <div className={styles.main_content}>
                    <div className={styles.tea_img}>
                        <img src={`/tea/${tea?.name}.png`} alt="" />
                    </div>
                    <div className={styles.tea_description}>
                        <div className={styles.tea_text}>
                            {tea?.description}
                        </div>
                        <div className={styles.tea_composition}>
                            <h2>Состав:</h2>
                            <p>{tea?.ingredients?.join(', ')}</p>
                        </div>
                        <div className={styles.tea_about}>
                            <div className={styles.tea_about__item}>
                                <h3>Страна</h3>
                                <span>{tea?.country_name}</span>
                            </div>
                            <div className={styles.tea_about__item}>
                                <h3>Вид</h3>
                                <span>{tea?.type_name}</span>
                            </div>
                             <div className={styles.tea_about__item}>
                                <h3>Вкус</h3>
                                <span>{tea?.tastes?.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.tea_price__block}>
                        <button className={styles.like_btn}></button>
                        <div>
                            <span className={styles.tea_price}>{tea?.price}</span>
                            <p>~ 14 чашек</p>
                        </div>
                        
                        <div className={styles.price_delivery}>
                            <p>Доставим сегодня</p>
                        </div>
                        <button className={styles.cart_btn}><span>в корзину</span></button>
                    </div>
                </div>
             </div>
        </main>
    )
}

export default ProductPage