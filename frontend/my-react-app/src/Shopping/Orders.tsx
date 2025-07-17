import styles from './Shopping.module.scss'

import { useEffect, useState } from 'react';

import { fetchGet } from '../subFuncs';

import { AuthProposal, checkAuthStatus } from '../Authorization/Authorization';


function Orders(){

    const [orders, setOrders] = useState([] as OrderProps[])

    const [authStatus, setAuthStatus] = useState(false);

    const getOrders = async() => {
        const clientStatus = await checkAuthStatus();
        setAuthStatus(clientStatus)
        if(clientStatus) {
            const ordersData = await fetchGet(`orders/`)
            setOrders(ordersData)
        }
        
    }

    useEffect(() => {
        getOrders()
    }, [])

    return(
        <section>
            {authStatus && (
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
            )}
            {!authStatus && (
                <AuthProposal />
            )}
            
        </section>
    )
}

export default Orders

type OrderItemProps = {
    tea_id: number;
    tea_name: string;
    tea_img_name: string;
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
import { ROUTES } from '../constants/routes';
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
            
            navigate(ROUTES.cart);
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
                            <img className={styles.order_img} src={`/tea/${item.tea_img_name}.png`} alt="" onClick={()=> navigate(`${ROUTES.catalog}/${item.tea_id}`)}/>
                            <span>{item.tea_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}