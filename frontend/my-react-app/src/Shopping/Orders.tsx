import { clientId } from '../subFuncs'
import styles from './Shopping.module.scss'

import { useEffect, useState } from 'react';

import { fetchGet } from '../subFuncs';




function Orders(){

    const [orders, setOrders] = useState([] as OrderProps[])

    const getOrders = async(clientId: number) => {
        const ordersData = await fetchGet(`orders/${clientId}`)
        setOrders(ordersData)
    }

    useEffect(() => {
        getOrders(clientId)
    }, [])

    return(
        <section>
            <div className={styles.orders_content}>
                {orders.map(order => (
                    <Order 
                    key={order.pretty_id}
                    pretty_id={order.pretty_id}
                    date={order.date}
                    status_name={order.status_name}
                    items={order.items}
                    />
                ))}
            </div>
            
        </section>
    )
}

export default Orders

type OrderItemProps = {
    item_id: number;
    tea_id: number;
    tea_name: string;
}


interface OrderProps {
    pretty_id: string;
    date: Date;
    status_name: string;
    items: OrderItemProps[]
}


const statusStyles = {
    'Создан': 'created',
    'Отправлен': 'sent',
    'Доставлен': 'delivery',
    'Получен': 'received',   
}


function Order({pretty_id, date, status_name, items} : OrderProps){

    const statusClass = statusStyles[status_name as keyof typeof statusStyles] || '';

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
                    <button>Повторить</button>               
                </div>
                <div className={styles.order_items}>
                    {items.map(item => (
                         <div className={styles.order_item}>
                            <img className={styles.order_img} src={`/tea/${item.tea_name}.png`} alt="" />
                            <span>{item.tea_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}