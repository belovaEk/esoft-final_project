import 'dotenv/config';

type envExample = {

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SESSION_SECRET: string;
    GOOGLE_CALLBACK_URL: string;

    PORT: number;
    FRONTHOST: string;

    /// бд

    HOST: string;
    PORTDB: number;
    DATABASE: string;
    DB_USERNAME: string;
    PASSWORD: string;
}

export function ensureEnv() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET 
        || !process.env.SESSION_SECRET || !process.env.GOOGLE_CALLBACK_URL 
        || !process.env.PORT || !process.env.FRONTHOST 
        || !process.env.HOST || !process.env.PORTDB || !process.env.DATABASE || !process.env.DB_USERNAME || !process.env.PASSWORD) {
        throw new Error('Missing required environment variables');
    };
}



