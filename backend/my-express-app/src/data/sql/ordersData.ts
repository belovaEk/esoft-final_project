import sql from "./db";


export async function getOrders(clientId: number) {
    let query = sql
    `SELECT 
    o.id, o.pretty_id, o.date, o.total_price,
    status.name as status_name,
    JSON_AGG(JSON_BUILD_OBJECT(
        'item_id', i.id,
        'tea_id', i.tea_id,
		'tea_name', t.name

    )) as items
    FROM "order" o
    JOIN order_item i ON o.id = i.order_id
    JOIN status ON o.status_id = status.id
    JOIN tea t on i.tea_id = t.id
    WHERE client_id = ${clientId}
    GROUP BY o.id, o.date, o.total_price, status.name`
    return await query
}

export async function getprevPurchased(clientId: number) {
    let query = sql 
    `SELECT DISTINCT ON (o_i.tea_id)
	o_i.tea_id as id,
	t.name, t.price, t.description, 
	country.name as country_name,
	type.name AS type_name,
	CASE WHEN fav.tea_id IS NOT NULL THEN true ELSE false END as isFav,
    CASE WHEN cart.tea_id IS NOT NULL THEN true ELSE false END as isCart
	
    from order_item o_i

    join "order" o on o_i.order_id = o.id
    join tea t on o_i.tea_id = t.id
    JOIN country ON t.country_id = country.id
    JOIN type ON t.type_id = type.id
    LEFT JOIN favourite fav ON t.id = fav.tea_id AND fav.client_id = ${clientId}
    LEFT JOIN cart ON t.id = cart.tea_id AND cart.client_id = ${clientId}
    where o.client_id = ${clientId}`

    return await query
}