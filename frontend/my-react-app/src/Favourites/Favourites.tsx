import styles from './Favourites.module.scss'

import ProductCart from '../ProductCart/ProductCart'


import { useState, useEffect } from 'react';
import type { Tea } from '../interface/teaItem';
import { fetchGet } from '../subFuncs';
import { useNavigate } from 'react-router-dom';

import { AuthProposal, checkAuthStatus } from '../Authorization/Authorization';

function Favourites(){

    const [favouritesItems, setFavouritesItem] = useState([] as Tea[]);

    const [authStatus, setAuthStatus] = useState(false)

    const navigate = useNavigate()

    const fetchFavouriteItems = async () => {
        const clientStatus = await checkAuthStatus()
        if (clientStatus) {
            const data = await fetchGet(`favourites/`);
            setFavouritesItem(data)
            console.log(data)
            setAuthStatus(true)
        }
        else{
            setAuthStatus(false)
        }
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
                {authStatus && (
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
                               authStatus={true}
                               img_name={item.img_name}
                               /> 
                            ))
                            ) : (
                                <div className={styles.conteinerNoItems}>
                                    <a 
                                    className={styles.linkToCatalog}
                                    onClick={() => navigate('/catalog')} >Исследуйте мир чая!</a>
                                </div>
                          
                        )}
                </div>
                )}
                {!authStatus && (
                    <AuthProposal />
                    
                )}
            </div>
        </main>
    )
}

export default Favourites