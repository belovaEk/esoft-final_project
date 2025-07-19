import styles from './Favourites.module.scss'
import ProductCart from '../../shared/components/ProductCart/ProductCart';

import AuthProposal from '../../shared/components/auth/AuthProposal';
import { ROUTES } from '../../constants/routes';
import { useFavourites } from './hooks/useFavourites';

function Favourites(){

    const {
        favouritesItems,
        authStatus,
        navigate,
        deleteFavouriteItem
    } = useFavourites();


    return(
        <>
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
                                    onClick={() => navigate(ROUTES.catalog)} >Исследуйте мир чая!</a>
                                </div>
                          
                        )}
                </div>
                )}
                {!authStatus && (
                    <AuthProposal />
                    
                )}
            </div>
        </>
    )
}

export default Favourites