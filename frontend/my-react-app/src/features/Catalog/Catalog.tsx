import styles from './Catalog.module.scss'

import ProductCart from '../../shared/components/ProductCart/ProductCart'
import AuthorizationModal from '../../shared/components/auth/AuthModal';

import SearchInput from '../../shared/components/SearchInput/SearchInput';
import { useCatalog } from './hooks/useCatalog';
import { itemsPerPage } from './constants/catalog';

function Catalog(){

    const  {
        teas,
        countries,
        types,
        ingredients,
        tastes,
        authModal,
        authStatus,
        currentTeas,
        startPage,
        endPage,
        visiblePages,
        filterOptions,
        priceFilter,
        sortOptions,
        itemOffset,
        currentPage,
        handlePageClickNext,
        handlePageClickBack,
        handlePageClickNum,
        changeAuthModal,
        setPriceFilter,
        priceRanges,
        handleSearch,
        handleSort,
        toggleFilter,
        resetFilter,
        setAuthModal,
        getTeas,
        searchQuery,
        pageCount
    } = useCatalog();


    return (
        <div className={styles.main}>
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
                        <button className={[styles.filters__btn, styles.btn_show].join(' ')} onClick={() => getTeas()}>ПОКАЗАТЬ</button>
                        <button className={styles.filters__btn}
                            onClick={()=> {resetFilter(); getTeas(true);}}
                            disabled={!filterOptions.typeIds?.length && !filterOptions.countryIds?.length  && !filterOptions.tasteIds?.length  && !filterOptions.ingredientIds?.length && !priceFilter && !searchQuery}
                        >
                            СБРОСИТЬ ФИЛЬТРЫ
                        </button>
                    </div>
                </div>
                 <div className={currentTeas?.length === 0 ? `${styles.NoTeas} ${styles.content}` :styles.content}>
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
                            <div className={styles.NoTeas}>Ничего не найдено</div>
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
        </div>
    )
}

export default Catalog