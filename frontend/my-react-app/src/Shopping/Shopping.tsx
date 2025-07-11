import styles from './Shopping.module.scss'
import { NavLink, Outlet } from 'react-router-dom';

function Shopping(){
    return(
        <main>
            <div className={styles.container}>
                <nav className={styles.shopping_navigate}>
                    <ul>
                        <li><NavLink to="orders" className={({ isActive }) => 
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }>Заказы</NavLink></li>
                        <li> <NavLink to="purchases" className={({ isActive }) => 
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }>Купленные ранее</NavLink></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </main>
    )
}

export default Shopping