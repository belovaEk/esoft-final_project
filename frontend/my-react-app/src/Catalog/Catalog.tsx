import styles from './Catalog.module.scss'

import ProductCart from './ProductCart'

import { fetchGet } from '../subFuncs'
import { useEffect, useState } from 'react';

import type { Tea } from '../interface/teaItem';
import type { filterItem } from '../interface/filterItems';

function Catalog(){

    const [teas, setTeas] = useState([] as Tea[]); 
    const [countries, setCountries] = useState([] as filterItem[]);
    const [types, setTypes] = useState([] as filterItem[]);
    const [ingredients, setIngredients] = useState([] as filterItem[]);
    const [tastes, setTastes] = useState([] as filterItem[]);

    const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

    const toggleSortDirection = () => {
        setSortDirection(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    };

    async function setPopularTeas() {
        try {
            const data = await fetchGet(`teas/popular?direction=${sortDirection}`);
            setTeas(data);
            toggleSortDirection();
        } catch (error) {
            console.error('Ошибка сортировки:', error);
        }
    }

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const data = await fetchGet('teas');
                setTeas(data);
            } catch (error) {
                console.error(`Ошибка загрузки чаев...`, error);
            }
        };
        
        const fetchFilterItems = async (items: string, setFun: Function) => {
            try {
                const data = await fetchGet(`filter/${items}`);
                setFun(data);
            } catch (error) {
                console.error(`Ошибка загрузки ${items}`, error);
            }
        };

        fetchTeas();
        fetchFilterItems('countries', setCountries);
        fetchFilterItems('types', setTypes);
        fetchFilterItems('ingredients', setIngredients);
        fetchFilterItems('tastes', setTastes);


    }, []);

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
                                        {types.map(type =>(
                                            <li key={type.id} className={styles.filters__item_li}><input type="checkbox" id={`${type.id}`}/><label htmlFor="">{type.name}</label></li>
                                        ))}
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
                                        {countries.map(country =>(
                                            <li key={country.id} className={styles.filters__item_li}><input type="checkbox" id={`${country.id}`}/><label htmlFor="">{country.name}</label></li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                             <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Инредиенты</summary>
                                    <ul>
                                        {ingredients.map(ingredient =>(
                                            <li key={ingredient.id} className={styles.filters__item_li}><input type="checkbox" id={`${ingredient.id}`}/><label htmlFor="">{ingredient.name}</label></li>
                                        ))} 
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Вкус</summary>
                                    <ul>
                                        {tastes.map(taste =>(
                                            <li key={taste.id} className={styles.filters__item_li}><input type="checkbox" id={`${taste.id}`}/><label htmlFor="">{taste.name}</label></li>
                                        ))}
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
                            <li className={styles.sort_popular} onClick={setPopularTeas}>популярные</li>
                            {/* <li className={styles.sort_rating}>высокий рейтинг</li> */}
                            <li className={styles.sort_price}>цена</li>
                        </ul>
                    </div>

                    <div className={styles.catalog_container}>
                        
                        {teas?.length > 0 ? (
                            teas.map(tea => (
                               <ProductCart
                               key={tea.id}
                               name={tea.name}
                               type={tea.type}
                               description={tea.description}
                               price={tea.price}
                               /> 
                            ))
                            ) : (
                            <div>Загрузка чаёв...</div>
                        )}

                    

                    </div>
                 </div>
            </div>
        </main>
    )
}

export default Catalog