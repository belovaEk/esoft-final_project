import sql from "./db";


export async function getCart(clientId: number) {
    let query = sql
    `select c.id as cartItem_id, t.id, t.name, t.description, t.price, c.amount
    from  cart c 
    join tea t on c.tea_id = t.id
    where c.client_id = ${clientId}
    ORDER BY id ASC`
    
    return await query
}


export async function patchCart(cartitem_id: number, newAmount: number) {
    let query = sql
    `update cart
    set amount = ${newAmount}
    where id = ${cartitem_id}`
    return await query
}

export async function postCart(client_id: number, tea_id: number) {
    let query = sql
    `insert into cart (client_id, tea_id)
        values (${client_id}, ${tea_id});`
    return await query
}


interface DeleteCartItemOptions {
    clientId : number;
    teaId: number;
}

export async function deleteCartItem(options: DeleteCartItemOptions) {
    let query = sql
    `delete from cart
     where client_id = ${options.clientId} and tea_id=${options.teaId}`
    return await query
}

