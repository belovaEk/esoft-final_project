import { clientId } from '../subFuncs'

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



    const [sortOptions, setSortOptions] = useState<{
        sortBy?: 'popular' | 'price';
        direction: 'ASC' | 'DESC';
    }> ({direction: 'DESC'})

    const [filterOptions, setFilterOptions] = useState<{
        typeIds?: number[];
        countryIds?: number[];
        ingredientIds?: number[];
        tasteIds?: number[];
    }> ({})

    const [priceFilter, setPriceFilter] = useState<string | null>(null);

    interface PriceRange {
        min?: number;
        max?: number;
        label: string;
    }

    const priceRanges: PriceRange[] = [
        { label: "До 250 Р", max: 250 },
        { label: "От 250 Р до 500 Р", min: 250, max: 500 },
        { label: "От 500 Р до 1000 Р", min: 500, max: 1000 },
        { label: "От 1000 Р до 5000 Р", min: 1000, max: 5000 },
        { label: "От 5000 Р до 10000 Р", min: 5000, max: 10000 },
        { label: "От 10000 Р", min: 10000 }
    ];

    const fetchTeas = async (reset = false) => {
        try {
            const params = new URLSearchParams();

            params.append('clientId', String(clientId))
            
            if (sortOptions.sortBy) {
                params.append('sortBy', sortOptions.sortBy);
                params.append('direction', sortOptions.direction);  
            }

             if (!reset) {
                if (filterOptions?.typeIds?.length) {
                    params.append('typeIds', filterOptions.typeIds.join(','));
                }

                if (filterOptions?.countryIds?.length) {
                    params.append('countryIds', filterOptions.countryIds.join(','));
                }

                if(filterOptions?.ingredientIds?.length) {
                    params.append('ingredientIds', filterOptions.ingredientIds.join(','))
                }

                 if(filterOptions?.tasteIds?.length) {
                    params.append('tasteIds', filterOptions.tasteIds.join(','))
                }

                if (priceFilter) {
                    const range = priceRanges.find(r => r.label === priceFilter);
                    if (range) {
                        if (range.min !== undefined) params.append('minPrice', range.min.toString());
                        if (range.max !== undefined) params.append('maxPrice', range.max.toString());
                    }
                }
            }

            const data = await fetchGet(`teas?${params.toString()}`);
            setTeas(data);
            
            console.log(params.toString())
            console.log(teas)
        } catch (error) {
            console.error('Ошибка загрузки чаев:', error);
        }

    };

    const handleSort = (sortBy: 'popular' | 'price') => {
        const newDirection = sortOptions.sortBy === sortBy 
            ? sortOptions.direction === 'ASC' ? 'DESC' : 'ASC'
            : 'DESC';
        
        setSortOptions({ sortBy, direction: newDirection });
        fetchTeas();
    };

    const toggleFilter = (type: 'typeIds' | 'countryIds' | 'ingredientIds' | 'tasteIds', id: number) => {
        setFilterOptions(prev => {
            const currentIds = prev[type] || [];
            const newIds = currentIds.includes(id)
                ? currentIds.filter(item => item !== id) 
                : [...currentIds, id];
            
            return { ...prev, [type]: newIds };
        });
    };

    const resetFilter = () => {
        setFilterOptions({});
        setPriceFilter(null);
    }

    useEffect(() => {
        
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
    }, [sortOptions]);


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
                                            <li key={type.id} className={styles.filters__item_li}>
                                                <input type="checkbox" id={`type-${type.id}`}
                                                    onChange={() => toggleFilter('typeIds', type.id)}
                                                    checked={filterOptions.typeIds?.includes(type.id) || false}/>
                                                <label htmlFor={`type-${type.id}`}>{type.name}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Цена</summary>
                                    <ul>
                                        {priceRanges.map((range, index) => (
                                            <li key={index} className={styles.filters__item_li}>
                                                <input
                                                    type="checkbox"
                                                    id={`price-${index}`}
                                                    checked={priceFilter === range.label}
                                                    onChange={() => setPriceFilter(priceFilter === range.label ? null : range.label)}
                                                />
                                                <label htmlFor={`price-${index}`}>{range.label}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Страна/Регион</summary>
                                    <ul>
                                        {countries.map(country =>(
                                            <li key={country.id} className={styles.filters__item_li}>
                                                <input type="checkbox" id={`country-${country.id}`}
                                                    onChange={() => toggleFilter('countryIds', country.id)}
                                                    checked={filterOptions.countryIds?.includes(country.id) || false} />
                                                <label htmlFor={`country-${country.id}`}>{country.name}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                             <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Инредиенты</summary>
                                    <ul>
                                        {ingredients.map(ingredient =>(
                                            <li key={ingredient.id} className={styles.filters__item_li}>
                                                <input type="checkbox" id={`ingredient-${ingredient.id}`}
                                                    onChange={()=> toggleFilter('ingredientIds', ingredient.id)}
                                                    checked={filterOptions.ingredientIds?.includes(ingredient.id) || false}/>
                                                <label htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
                                            </li>
                                        ))} 
                                    </ul>
                                </details>
                            </div>
                            <div className={styles.filters__item}>
                                <details>
                                    <summary className={styles.filters__item_name}>Вкус</summary>
                                    <ul>
                                        {tastes.map(taste =>(
                                            <li key={taste.id} className={styles.filters__item_li}>
                                                <input type="checkbox" id={`taste-${taste.id}`}
                                                onChange={()=> toggleFilter('tasteIds', taste.id)}
                                                checked={filterOptions.tasteIds?.includes(taste.id) || false}/>
                                                <label htmlFor={`taste-${taste.id}`}>{taste.name}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                        </div>
                        <button className={[styles.filters__btn, styles.btn_show].join(' ')} onClick={() => fetchTeas()}>ПОКАЗАТЬ</button>
                        <button className={styles.filters__btn}
                            onClick={()=> {resetFilter(); fetchTeas(true);}}
                            disabled={!filterOptions.typeIds?.length && !filterOptions.countryIds?.length  && !filterOptions.tasteIds?.length  && !filterOptions.ingredientIds?.length && !priceFilter}
                        >
                            СБРОСИТЬ ФИЛЬТРЫ
                        </button>
                    </div>
                </div>
                 <div className={styles.content}>
                    <div className={styles.sort_container}>
                        <h3>Сортировка:</h3>
                        <ul>
                            <li className={sortOptions.sortBy === 'popular' ? (sortOptions.direction === 'ASC' ? styles.active_sortASC : styles.active_sortDESC): ''} onClick={() => handleSort('popular')}>популярные
                            </li>
                            {/* <li className={styles.sort_rating}>высокий рейтинг</li> */}
                            <li className={sortOptions.sortBy === 'price' ? (sortOptions.direction === 'ASC' ? styles.active_sortASC : styles.active_sortDESC): ''}  onClick={() => handleSort('price')}>цена</li>
                        </ul>
                    </div>

                    <div className={styles.catalog_container}>
                        
                        {teas?.length > 0 ? (
                            teas.map(tea => (
                               <ProductCart
                               key={tea.id}
                               id={Number(tea.id)}
                               name={tea.name}
                               type_name={tea.type_name}
                               description={tea.description}
                               price={tea.price}
                               isFav={tea.isfav}
                               isCart={tea.iscart}
                               /> 
                            ))
                            ) : (
                            <div>Активно ищем...</div>
                        )}

                    

                    </div>
                 </div>
            </div>
        </main>
    )
}

export default Catalog