import styles from './OrderItem.module.scss'
import type { OrdersProps } from '../../types/pastOrder';

import { statusStyles } from '../../constants/status';

import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../constants/routes';
import { useOrderItem } from '../../hooks/useOrderItems';

function OrderItem({pretty_id, date, status_name, items} : OrdersProps){

    const navigate = useNavigate()
    const statusClass = statusStyles[status_name as keyof typeof statusStyles] || '';

    const {
        repeatOrder
    } = useOrderItem()
    

    return(
        <article>
            <div className={styles.order_container}>
                <div>
                    <h2>Заказ от {date.toString().slice(0, 10)}</h2>
                    <span>{pretty_id}</span>
                    <div className={styles.order_status__content}>
                        <div>Статус:</div>
                        <div className={`${styles.order_status} ${styles[statusClass]}`}>{status_name}</div>
                    </div> 
                    <button onClick={()=>repeatOrder(items)}>Повторить</button>               
                </div>
                <div className={styles.order_items}>
                    {items.map(item => (
                         <div className={styles.order_item} key={item.tea_id}>
                            <img className={styles.order_img} src={`/tea/${item.tea_img_name}.png`} alt="" onClick={()=> navigate(`${ROUTES.catalog}/${item.tea_id}`)}/>
                            <span>{item.tea_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

export default OrderItem