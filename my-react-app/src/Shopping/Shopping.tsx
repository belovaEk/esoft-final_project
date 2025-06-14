import styles from '/src/assets/styles/Shopping.module.scss'
import { NavLink, Outlet } from 'react-router-dom';

function Shopping(){
    return(
        <main>
            <div className={styles.container}>
                <nav className={styles.shopping_navigate}>
                    <ul>
                        <li><NavLink to="orders" className={styles.link}>Заказы</NavLink></li>
                        <li> <NavLink to="purchases" className={styles.link}>Покупки</NavLink></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </main>
    )
}

export default Shopping