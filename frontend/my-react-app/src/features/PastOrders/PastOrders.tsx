import styles from './PastOrders.module.scss'
import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function PastOrders(){
    return(
        <main>
            <div className={styles.container}>
                <nav className={styles.shopping_navigate}>
                    <ul>
                        <li><NavLink
                        to={ROUTES.orders} end className={({ isActive }) => 
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }>Заказы</NavLink></li>
                        <li> <NavLink to={ROUTES.purchases} className={({ isActive }) => 
                                    isActive ? `${styles.link} ${styles.active}` : styles.link
                                }>Купленные ранее</NavLink></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </main>
    )
}

export default PastOrders