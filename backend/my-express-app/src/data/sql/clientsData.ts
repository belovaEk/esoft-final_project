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

    const updates: string[] = [];
    const params: any[] = [];

    if (name !== undefined && name !== null) {
        updates.push(`name = $${updates.length + 1}`);
        params.push(name);
    }
    if (email !== undefined && email !== null) {
        updates.push(`email = $${updates.length + 1}`);
        params.push(email);
    }
    if (is_mailing !== undefined) {
        updates.push(`is_mailing = $${updates.length + 1}`);
        params.push(is_mailing);
    }

    const queryString = `UPDATE client SET ${updates.join(', ')} WHERE id = $${updates.length + 1}`;
    params.push(client_id);

    return await sql.unsafe(queryString, params);
}

export async function deleteClient(client_id: number) {
    let query = sql
    `delete from client
     where id = ${client_id}`
    return await query
}