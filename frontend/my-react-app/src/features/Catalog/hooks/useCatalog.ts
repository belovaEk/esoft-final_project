import { useState, useEffect, useMemo } from "react"
import type { Tea } from "../../../interface/teaItem";
import type { filterItem } from "../types/filter";
import { itemsPerPage } from "../constants/catalog";
import { checkAuthStatus } from "../../../shared/services/authService";
import { fetchTeas, fetchFilterOptions } from "../services/catalogService";
import type { PriceRange } from "../types/filter";




export const useCatalog = () => {


    
const [teas, setTeas] = useState([] as Tea[]); 
    const [countries, setCountries] = useState([] as filterItem[]);
    const [types, setTypes] = useState([] as filterItem[]);
    const [ingredients, setIngredients] = useState([] as filterItem[]);
    const [tastes, setTastes] = useState([] as filterItem[]);

    const [authModal, setAuthModal] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);

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

    const priceRanges: PriceRange[] = [
        { label: "До 250 Р", min: 0, max: 250 },
        { label: "От 250 Р до 500 Р", min: 250, max: 500 },
        { label: "От 500 Р до 1000 Р", min: 500, max: 1000 },
        { label: "От 1000 Р", min: 1000 },
    ];

    const getTeas = async (reset = false) => {
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
            setTeas(data as Tea[]);
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