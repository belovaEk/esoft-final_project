import styles from './Favourites.module.scss'
import ProductCart from '../Catalog/ProductCart'

function Purchases(){
    return (
        <section>
             <div className={styles.container}>
                <h1>Купленные ранее</h1>
                <div  className={styles.content}>
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                    <ProductCart />
                </div>
            </div>
        </section>
    )
}

export default Purchases