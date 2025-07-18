
import styles from './Articles.module.scss'

function Shops() {
 
    return(
        <>
         <script src="https://api-maps.yandex.ru/v3/?apikey=32787f4b-9ed0-4195-97d2-e352ea94bf45&lang=ru_RU"></script>
        <main className={styles.container}>
            <h1>Физические магазины</h1>
            <div className={styles.map_conteiner}>
                <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3Ada39e0469c5d2dcf9cf3c3ad3a4f639312cad2ffeff7455e2fee8a2f714f2796&amp;source=constructor" width="1000" height="500"></iframe>
            </div>
               
        </main>
         
        </>
    )
}

export default Shops