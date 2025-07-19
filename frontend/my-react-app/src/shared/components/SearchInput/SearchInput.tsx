import { useState } from 'react'
import styles from './SearchInput.module.scss'



type SearchInputProps = {
    onSearch: (query: string) => void;
}

function SearchInput({onSearch} : SearchInputProps) {

    const [searchQuery, setSearchQuery] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    const handleSearch = () => {
        setHasFocus(false)
        onSearch(searchQuery);
    };

    const handleReset = () => {
        setSearchQuery('')
        onSearch('')
    };


    const handleKeyPress = (e: React.KeyboardEvent) => {
        
        if (e.key === 'Enter') {    
            handleSearch();
        }
    };



    return (
        <>
        <input
        type="text"
        className={styles.input}
        placeholder='Введите название чая...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setHasFocus(true)}
        onKeyUp={handleKeyPress}
        />
        {(hasFocus || !searchQuery) && (
            <button
            className={styles.search_btn}
            onClick={handleSearch}
            ></button>
        )}
        

        {!hasFocus && searchQuery && (
            <button
            className={`${styles.search_btn} ${styles.cross}`}
            onClick={handleReset}
            ></button>
        )}
        
        </>
        
    )
}

export default SearchInput