import sql from "./db";


export async function getClient(id: number){
    const client = await sql 
    `SELECT * from client where id = ${id}`
    return client
}

export async function patchClient(
    client_id: number,
    name?: string | null,
    email?: string | null
) {
    if (name === undefined && email === undefined) {
        throw new Error("Должно присутсвтовать хотя бы одно поле (name or email)");
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