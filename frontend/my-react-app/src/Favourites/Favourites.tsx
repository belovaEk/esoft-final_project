import styles from './Favourites.module.scss'

import ProductCart from '../Catalog/ProductCart'


import { useState, useEffect } from 'react';
import type { Tea } from '../interface/teaItem';
import { fetchGet } from '../subFuncs';

function Favourites(){

    const [favouritesItems, setFavouritesItem] = useState([] as Tea[]);
    const fetchFavouriteItems = async () => {
        const data = await fetchGet(`favourites/`);
        setFavouritesItem(data)
    }

    useEffect(()=> {
        fetchFavouriteItems()
    }, [])

    
    const deleteFavouriteItem = (id: number) => {
        setFavouritesItem(prev => prev.filter(item => item.id !== id))
    }

    return(
        <main>
            <div className={styles.container}>
                <h1>Избранное</h1>
                <div  className={styles.content}>
                     {favouritesItems?.length > 0 ? (
                            favouritesItems.map(item => (
                               <ProductCart
                               key={item.id}
                               id={Number(item.id)}
                               name={item.name}
                               type_name={item.type_name}
                               description={item.description}
                               price={item.price}
                               isFav={true}
                               isCart={item.iscart}
                               onFavouriteChange={deleteFavouriteItem}
                               /> 
                            ))
                            ) : (
                            <div>Исследуйте мир чая!</div>
                        )}
                </div>
            </div>
        </main>
    )
}

export default Favourites