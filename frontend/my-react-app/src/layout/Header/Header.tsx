import styles from './Header.module.scss'

import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

function Header(){
    const navigate = useNavigate()

    return(
        <header className={styles.container}>
            <div onClick={() => navigate('/')}>
                <h1>TeaTime</h1>
            </div>
            <nav>
                <ul>
                    <li onClick={() => navigate(ROUTES.main)}>Главная</li>
                    <li onClick={() => navigate(ROUTES.catalog)}>Каталог</li>
                    <li onClick={() => navigate(ROUTES.favourites)}><img src="/ico/heart.png" alt="избранное" /></li>
                    <li onClick={() => navigate(ROUTES.cart)}><img src="/ico/cart.svg" alt="корзина" /></li>
                    <li onClick={() => navigate(ROUTES.account)}><img src="/ico/user.svg" alt="личный кабинет" /></li>
                </ul>

            </nav>
        </header>
    )
}

export default Header