import { query } from "express-validator";
import sql from "./db";


interface FederatedCredential {
    id: number;
    user_id: number;
    provider: string;
    subject: string;
    created_at: Date;
}


export async function getFederatedCredentials(issuer: string, profileId: string){
     try {
        const query = sql`
            SELECT * 
            FROM federated_credentials 
            WHERE provider = ${issuer} 
            AND subject = ${profileId}
        `;
        const result = await query;
        return result[0]; 
    } catch (error) {
        console.error('Error fetching federated credentials:', error);
        throw error;
    }
}

export async function getUser(id: number){
    const user = await sql 
    `SELECT id from client where id = ${id}`
    return user[0]
}

export async function createFederatedCredentials(client_id: number, provider: string, subject: string) {
    let query = sql 
    ` INSERT INTO federated_credentials (client_id, provider, subject)
      VALUES (${client_id}, ${provider}, ${subject})`
    return await query
}