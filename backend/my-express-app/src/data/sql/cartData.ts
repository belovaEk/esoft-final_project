import sql from "./db";


export async function getCart(clientId: number) {
    let query = sql
    `select c.id as cartItem_id, t.id, t.name, t.description, t.price, c.amount, c.total_price
    from  carts c 
    join teas t on c.tea_id = t.id
    where c.client_id = ${clientId}`
    return await query
}


export async function postCart(cartitem_id: number, newAmount: number) {
    let query = sql
    `update carts
    set amount = ${newAmount}
    where id = ${cartitem_id}`
    return await query
}

export async function deleteCartItem(cartitem_id: number) {
    let query = sql
    `delete from carts
     where id = ${cartitem_id}`
    return await query
}