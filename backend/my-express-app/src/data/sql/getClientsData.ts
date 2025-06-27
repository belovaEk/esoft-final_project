import sql from "./db";


export async function getClient(id: number){
    const client = await sql 
    `SELECT * from clients where id = 1`
    return client
}