
import styles from './Articles.module.scss'

function Supplier(){
    return (
        <main>
            <div className={styles.container}>
                <h1>Поставщикам</h1>
                <div className={styles.ContactCity_container}>
                    <p>Хотите предложить нам товар? Напишите на <a href="mailto:buy@chay.info">buy@chay.info</a></p>
                </div>
            </div>
        </main>
    )
}

export default Supplier