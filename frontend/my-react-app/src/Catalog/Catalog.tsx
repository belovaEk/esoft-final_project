import styles from './Catalog.module.scss'

import ProductCart from '../ProductCart/ProductCart'

import { fetchGet } from '../subFuncs'
import { useEffect, useMemo, useState } from 'react';

import type { Tea } from '../interface/teaItem';
import type { filterItem } from '../interface/filterItems';

import { checkAuthStatus } from '../Authorization/Authorization';
import AuthorizationModal from '../Authorization/Authorization';

import SearchInput from '../SearchInput/SearchInput';


function Catalog(){

    const [teas, setTeas] = useState([] as Tea[]); 
    const [countries, setCountries] = useState([] as filterItem[]);
    const [types, setTypes] = useState([] as filterItem[]);
    const [ingredients, setIngredients] = useState([] as filterItem[]);
    const [tastes, setTastes] = useState([] as filterItem[]);

    const [authModal, setAuthModal] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

    const itemsPerPage = 6;
    const [currentTeas, setCurrentTeas] = useState([] as Tea[]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrenPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    
    const [searchQuery, setSearchQuery] = useState('');


    function paginatedItems(teas: Tea[]){
        const endOffset = itemOffset + itemsPerPage;
        const newPageCount = Math.ceil(teas.length / itemsPerPage);
        const newCurrentPage = Math.floor(itemOffset/itemsPerPage) + 1;
        
        setCurrentTeas(teas.slice(itemOffset, endOffset));
        setPageCount(newPageCount);
        setCurrenPage(newCurrentPage);

    }

    const visiblePages = useMemo(() => {
        const start = Math.max(1, currentPage - 2);
        setStartPage(start);
    
        const end = Math.min(pageCount, currentPage + 2);
        setEndPage(end);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [currentPage, pageCount]);

    const handlePageClickNext = () => {
            setItemOffset(prev => prev + itemsPerPage)
            window.scrollTo(0, 0);

    }
    const handlePageClickBack = () => {
        setItemOffset(prev => prev - itemsPerPage)
        window.scrollTo(0, 0);
    }


    const handlePageClickNum = (num: number) => {
        setItemOffset((num - 1) * itemsPerPage)
        window.scrollTo(0, 0);
    }

    function changeAuthModal() {
        setAuthModal(prev => !prev)
    }

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
        { label: "До 250 Р", min: 0, max: 250 },
        { label: "От 250 Р до 500 Р", min: 250, max: 500 },
        { label: "От 500 Р до 1000 Р", min: 500, max: 1000 },
        { label: "От 1000 Р", min: 1000 },
    ];

    const fetchTeas = async (reset = false) => {
        const clientStatus = await checkAuthStatus()
        setAuthStatus(clientStatus)
        try {
            const params = new URLSearchParams();
            
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

                if (searchQuery) {
                    params.append('search', searchQuery);
                }
            }

            const data = await fetchGet(`teas?${params.toString()}`);
            setTeas(data);
            setItemOffset(0);
        } catch (error) {
            console.error('Ошибка загрузки чаев:', error);
        }

    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
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
        setSearchQuery('');
        setItemOffset(0);
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
       
    }, [sortOptions, searchQuery]);

    useEffect(() => {
        paginatedItems(teas);
    }, [teas, itemOffset]); 




    return (
        <main className={styles.main}>
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
                            disabled={!filterOptions.typeIds?.length && !filterOptions.countryIds?.length  && !filterOptions.tasteIds?.length  && !filterOptions.ingredientIds?.length && !priceFilter && !searchQuery}
                        >
                            СБРОСИТЬ ФИЛЬТРЫ
                        </button>
                    </div>
                </div>
                 <div className={styles.content}>
                    <SearchInput 
                    onSearch={handleSearch}
                    />
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
                        
                        {currentTeas?.length > 0 ? (
                            currentTeas.map(tea => (
                               <ProductCart
                                key={tea.id}
                                id={Number(tea.id)}
                                name={tea.name}
                                type_name={tea.type_name}
                                description={tea.description}
                                price={tea.price}
                                isFav={tea.isfav}
                                isCart={tea.iscart}
                                authStatus={authStatus}
                                authModal={changeAuthModal}
                                img_name={tea.img_name}
                               /> 
                               
                            ))
                            ) : (
                            <div>Ничего не найдено</div>
                        )}

                    

                    </div>

                    <div className={styles.pag_container}>
                        <button
                            className={itemOffset === 0 ? styles.pagDis_btn : styles.pag_btn}
                            onClick={handlePageClickBack}
                            disabled={itemOffset === 0}
                        >Назад</button>
                        {startPage > 1 && <span>...</span>}
                        {visiblePages.map(item => (
                        <div
                        key={item}
                        className={currentPage === item ? styles.pag_btnActive : styles.pag_btn}
                        onClick={()=> handlePageClickNum(item)}>{item}</div> 
                        ))}
                        {endPage < pageCount && <span>...</span>}
                        <button
                        className={itemOffset + itemsPerPage >= teas.length ? styles.pagDis_btn : styles.pag_btn}
                            onClick={handlePageClickNext}
                            disabled={itemOffset + itemsPerPage >= teas.length}
                        >Дальше</button>
                    </div>
                 </div>
            </div>
            {authModal && (
                <AuthorizationModal 
                closeFun={() => setAuthModal(false)}
                />
            )}
        </main>
    )
}

export default Catalog