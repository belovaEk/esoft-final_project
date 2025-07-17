import 'dotenv/config';

type envExample = {

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    SESSION_SECRET: string;
    GOOGLE_CALLBACK_URL: string;

    PORT: number;
    FRONTHOST: string;

    /// бд

    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
}

export function ensureEnv() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET 
        || !process.env.SESSION_SECRET || !process.env.GOOGLE_CALLBACK_URL 
        || !process.env.PORT || !process.env.FRONTHOST 
        || !process.env.DATABASE_HOST || !process.env.DATABASE_PORT || !process.env.DATABASE_NAME || !process.env.DATABASE_USERNAME || !process.env.DATABASE_PASSWORD) {
        throw new Error('Missing required environment variables');
    };
}



