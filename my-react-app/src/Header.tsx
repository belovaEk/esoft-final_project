
import styles from '/src/assets/styles/Header.module.scss'


function Header(){
    return(
        <header className={styles.container}>
            <div>
                <h1>TeaTime</h1>
            </div>
            <nav>
                    <ul>
                        <li>Главная</li>
                        <li>Каталог</li>
                        <li><img src="/ico/heart.png" alt="" /></li>
                        <li><img src="/ico/cart.svg" alt="корзина" /></li>
                        <li><img src="/ico/user.svg" alt="личный кабинет" /></li>
                    </ul>

            </nav>
        </header>
    )
}

export default Header