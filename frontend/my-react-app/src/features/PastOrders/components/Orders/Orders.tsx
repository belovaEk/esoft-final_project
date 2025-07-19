import AuthProposal from '../../../../shared/components/auth/AuthProposal';

import { useOrders } from '../../hooks/useOrders';

import OrderItem from './OrderItem';

function Orders(){

    const  {
        orders,
        authStatus,
    } = useOrders()

    return(
        <section>
            {authStatus && (
                <div>
                {orders?.map(order => (
                    <OrderItem 
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

