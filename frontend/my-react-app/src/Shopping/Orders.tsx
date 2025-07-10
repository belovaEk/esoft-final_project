import styles from './Shopping.module.scss'

import { useEffect, useState } from 'react';

import { fetchGet } from '../subFuncs';




function Orders(){

    const [orders, setOrders] = useState([] as OrderProps[])

    const getOrders = async() => {
        const ordersData = await fetchGet(`orders/`)
        setOrders(ordersData)
    }

    useEffect(() => {
        getOrders()
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
    tea_id: number;
    tea_name: string;
    isCart: boolean;
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

import { useNavigate } from 'react-router-dom'
import { postInCart } from '../Cart/cartFuncs';
function Order({pretty_id, date, status_name, items} : OrderProps){

    const navigate = useNavigate()
    const statusClass = statusStyles[status_name as keyof typeof statusStyles] || '';

    async function repeatOrder(items: OrderItemProps[]) {
        try {
            const itemsToAdd = items.filter(item => !item.isCart);
        

            const addToCartPromises = itemsToAdd.map(item => 
                postInCart(item.tea_id)
            );
            
            await Promise.all(addToCartPromises);
            
            navigate('/cart');
        } catch(error) {
            console.error('Ошибка при добавлении товаров в корзину:', error);
        }
    }

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
                         <div className={styles.order_item}>
                            <img className={styles.order_img} src={`/tea/${item.tea_name}.png`} alt="" onClick={()=> navigate(`/catalog/${item.tea_id}`)}/>
                            <span>{item.tea_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}