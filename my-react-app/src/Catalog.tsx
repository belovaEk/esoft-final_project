import styles from '/src/assets/styles/Catalog.module.scss'

function Catalog(){
    return (
        <main>
            <div className={styles.container}>
                <div className={styles.filters}>
                    <div className={styles.filters_inner}>
                        <div className={styles.filters__group}>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Вид</summary>
                                    <ul>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" id='type'/><label htmlFor="type">чай</label></li>

                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Цена</summary>
                                    <ul>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">До 250 Р</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">От 250 Р до 500 Р</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">От 500 Р до 1000 Р</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">От 1000 Р до 5000 Р</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">От 5000 Р до 10000 Р</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">От 10000 Р</label></li>
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Страна/Регион</summary>
                                    <ul>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                        <li  className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Бразилия</label></li>
                                    </ul>
                                </details>
                            </div>
                             <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Инредиенты</summary>
                                    <ul>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Абрикос</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Ананас</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Банан</label></li>
                                           
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Вкус</summary>
                                    <ul>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Древесный</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Дымный</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Землитсый</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Морской</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Ореховый</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Пряный</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Сладкий</label></li>
                                        <li className={styles.filters__item_li}><input type="checkbox" /><label htmlFor="">Ягодный</label></li>
                                    </ul>
                                </details>
                            </div>
                        </div>
                        <button className={[styles.filters__btn, styles.btn_show].join(' ')}>ПОКАЗАТЬ</button>
                        <button className={styles.filters__btn}>СБРОСИТЬ ФИЛЬТРЫ</button>
                    </div>
                </div>
                 <div className={styles.content}>
                    <div className={styles.sort_container}>
                        <h3>Сортировка:</h3>
                        <ul>
                            <li>популярные</li>
                            <li>высокий рейтинг</li>
                            <li>цена</li>
                        </ul>
                    </div>

                    <div className={styles.catalog_container}>
                        <div>карточка</div>
                        <div>карточка</div>

                        <div>карточка</div>
                        <div>карточка</div>
                        <div>карточка</div>

                    </div>
                 </div>
            </div>
        </main>
    )
}

export default Catalog