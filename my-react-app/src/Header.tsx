import styles from '/src/assets/styles/Header.module.scss'

import { useNavigate } from 'react-router-dom'

function Header(){
    const navigate = useNavigate()

    return(
        <header className={styles.container}>
            <div>
                <h1>TeaTime</h1>
            </div>
            <nav>
                <ul>
                    <li onClick={() => navigate('/')}>Главная</li>
                    <li onClick={() => navigate('/catalog')}>Каталог</li>
                    <li onClick={() => navigate('/favourites')}><img src="/ico/heart.png" alt="избранное" /></li>
                    <li onClick={() => navigate('/')}><img src="/ico/cart.svg" alt="корзина" /></li>
                    <li onClick={() => navigate('/account')}><img src="/ico/user.svg" alt="личный кабинет" /></li>
                </ul>

            </nav>
        </header>
    )
}

export default Header