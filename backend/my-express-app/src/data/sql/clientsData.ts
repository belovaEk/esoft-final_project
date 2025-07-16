import sql from "./db";


export async function getClient(id: number){
    const client = await sql 
    `SELECT * from client where id = ${id}`
    return client
}

export async function postClient(name: string, email: string): Promise<number> {
    let query = sql
    `insert into client (name, email) values (${name}, ${email}) RETURNING id` 
    const newId = await query
    return newId[0].id;
}



export async function patchClient(
    client_id: number,
    name?: string | null,
    email?: string | null,
    is_mailing?: boolean | undefined
) {
    if (name === undefined && email === undefined && is_mailing === undefined) {
        throw new Error("Должно присутсвтовать хотя бы одно поле для изменения");
    }


    let baseQuery = sql `UPDATE client SET`
    const params = []

    if (name !== undefined && name !== null) {
        params.push(sql `name = ${name}`);
    }
    if (email !== undefined && email !== null) {
        params.push( sql `email = ${email}`);
    }
    if (is_mailing !== undefined) {
        params.push( sql `is_mailing = ${is_mailing}`);
    }

    const queryString = sql `${baseQuery} ${params.join(', ')} where id = ${client_id}` 
    console.log(queryString)
    return await queryString;
}

export async function deleteClient(client_id: number) {
    let query = sql
    `delete from client
     where id = ${client_id}`
    return await query
}