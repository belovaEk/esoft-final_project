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
    is_mailing?: boolean | undefined
) {
    if (name === undefined  && is_mailing === undefined) {
        throw new Error("Должно присутсвтовать хотя бы одно поле для изменения");
    }

    if (name !== undefined && name !== null) {
        let query = sql `UPDATE client SET name = ${name} where id = ${client_id}`;
        return await query
    }

    if (is_mailing !== undefined) {
        let query = sql `UPDATE client SET is_mailing = ${is_mailing} where id = ${client_id}`;
        return await query
    }
}

export async function deleteClient(client_id: number) {
    let query = sql
    `delete from client
     where id = ${client_id}`
    return await query
}