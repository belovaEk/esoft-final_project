import styles from './Favourites.module.scss'

import ProductCart from '../Catalog/ProductCart'

function Favourites(){
    return(
        <main>
            <div className={styles.container}>
                <h1>Избранное</h1>
                <div  className={styles.content}>
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                </div>
            </div>
        </main>
    )
}

export default Favourites