import sql from "./db";


export async function getFavourites(clientId: number) {
    let query = sql
    `select f.id as favouriteitem_id, t.id, t.name, t.description, t.price,  ty.name AS type_name,
    case when cart.tea_id is not null then true else false end as isCart
    from  favourite f 
    join tea t on f.tea_id = t.id
    join type ty on t.type_id = ty.id
    left join cart on f.tea_id = cart.tea_id and cart.client_id = ${clientId}
    where f.client_id = ${clientId}`
    return await query
}


export async function getFavouriteCount(clientId: number) {
    let query = sql
    `select count(*) 
    from favourite
    where client_id = ${clientId}`
    return await query
}


export async function postFavouriteItem(client_id: number, tea_id: number) {
    let query = sql
    `insert into favourite (client_id, tea_id)
    values
    (${client_id}, ${tea_id})`
    return await query
}



interface DeleteFavouriteItemOptions {
    clientId : number;
    teaId: number;
}

export async function deleteFavouriteItem(options: DeleteFavouriteItemOptions) {
    let query = sql
    `delete from favourite
     where client_id = ${options.clientId} and tea_id=${options.teaId}`
    return await query
}

