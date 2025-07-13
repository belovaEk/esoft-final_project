
import styles from './Articles.module.scss'

export function Shops() {

    
    return(
        <>
         <script src="https://api-maps.yandex.ru/v3/?apikey=YOUR_API_KEY&lang=ru_RU"></script>
        <main className={styles.container}>
            <h1>Физические магазины</h1>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ada39e0469c5d2dcf9cf3c3ad3a4f639312cad2ffeff7455e2fee8a2f714f2796&amp;source=constructor" width="500" height="400" ></iframe>
        </main>
         
        </>
    )
}