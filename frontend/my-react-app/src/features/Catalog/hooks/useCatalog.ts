import { useState, useEffect, useMemo } from "react"
import type { productCartT } from "../../../shared/types/productCart";
import type { filterItemT } from "../types/filter";
import { itemsPerPage } from "../constants/catalog";
import { checkAuthStatus } from "../../../shared/services/authService";
import { fetchTeas, fetchFilterOptions } from "../services/catalogService";
import type { priceRangeT } from "../types/filter";




export const useCatalog = () => {


    
    const [teas, setTeas] = useState<productCartT[]>([]); 
    const [countries, setCountries] = useState<filterItemT[]>([]);
    const [types, setTypes] = useState<filterItemT[]>([]);
    const [ingredients, setIngredients] = useState<filterItemT[]>([]);
    const [tastes, setTastes] = useState<filterItemT[]>([]);

    const [authModal, setAuthModal] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

    const [currentTeas, setCurrentTeas] = useState<productCartT[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrenPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    
    const [searchQuery, setSearchQuery] = useState('');

    function paginatedItems(teas: productCartT[]): void{
        const endOffset = itemOffset + itemsPerPage;
        const newPageCount = Math.ceil(teas.length / itemsPerPage);
        const newCurrentPage = Math.floor(itemOffset/itemsPerPage) + 1;
        
        setCurrentTeas(teas.slice(itemOffset, endOffset));
        setPageCount(newPageCount);
        setCurrenPage(newCurrentPage);
    }

    const visiblePages = useMemo((): number[] => {
        const start = Math.max(1, currentPage - 2);
        setStartPage(start);
    
        const end = Math.min(pageCount, currentPage + 2);
        setEndPage(end);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [currentPage, pageCount]);

    const handlePageClickNext = (): void => {
            setItemOffset(prev => prev + itemsPerPage)
            window.scrollTo(0, 0);

    }
    const handlePageClickBack = (): void => {
        setItemOffset(prev => prev - itemsPerPage)
        window.scrollTo(0, 0);
    }


    const handlePageClickNum = (num: number): void => {
        setItemOffset((num - 1) * itemsPerPage)
        window.scrollTo(0, 0);
    }

    function changeAuthModal(): void {
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

    const priceRanges: priceRangeT[] = [
        { label: "До 250 Р", min: 0, max: 250 },
        { label: "От 250 Р до 500 Р", min: 250, max: 500 },
        { label: "От 500 Р до 1000 Р", min: 500, max: 1000 },
        { label: "От 1000 Р", min: 1000 },
    ];

    const getTeas = async (reset = false): Promise<void> => {
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

            const data = await fetchTeas(params.toString())
            setTeas(data);
            setItemOffset(0);
        } catch (error) {
            console.error('Ошибка загрузки чаев:', error);
        }

    };

    const handleSearch = (query: string): void => {
        setSearchQuery(query);
    };

    const handleSort = (sortBy: 'popular' | 'price'): void => {
        const newDirection = sortOptions.sortBy === sortBy 
            ? sortOptions.direction === 'ASC' ? 'DESC' : 'ASC'
            : 'DESC';
        
        setSortOptions({ sortBy, direction: newDirection });
        
    };

    const toggleFilter = (type: 'typeIds' | 'countryIds' | 'ingredientIds' | 'tasteIds', id: number): void => {
        setFilterOptions(prev => {
            const currentIds = prev[type] || [];
            const newIds = currentIds.includes(id)
                ? currentIds.filter(item => item !== id) 
                : [...currentIds, id];
            
            return { ...prev, [type]: newIds };
        });
    };

    const resetFilter = (): void => {
        setFilterOptions({});
        setPriceFilter(null);
        setSearchQuery('');
        setItemOffset(0);
    }

    useEffect(() => {
        
        const fetchFilterItems = async (items: string, setFun: Function) => {
            try {
                const data = await fetchFilterOptions(items);
                setFun(data);
            } catch (error) {
                console.error(`Ошибка загрузки ${items}`, error);
            }
        };

        getTeas();
        fetchFilterItems('countries', setCountries);
        fetchFilterItems('types', setTypes);
        fetchFilterItems('ingredients', setIngredients);
        fetchFilterItems('tastes', setTastes);
       
    }, [sortOptions, searchQuery]);

    useEffect(() => {
        paginatedItems(teas);
    }, [teas, itemOffset]); 


    return {
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
        setSortOptions,
        setFilterOptions,
        setPriceFilter,
        priceRanges,
        handleSearch,
        handleSort,
        toggleFilter,
        resetFilter,
        setAuthModal,
        getTeas,
        searchQuery,
        pageCount,
        
    }

}