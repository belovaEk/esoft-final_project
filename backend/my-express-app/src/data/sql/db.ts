import postgres from 'postgres';
import 'dotenv/config';


if (!process.env.HOST || !process.env.PORTDB || !process.env.DATABASE || !process.env.DB_USERNAME || !process.env.PASSWORD) {
    throw new Error('Missing required environment variables');
}

const sql = postgres({
  host: process.env.HOST,   
  port: Number(process.env.PORTDB),            
  database: process.env.DATABASE,   
  username: process.env.DB_USERNAME, 
  password: process.env.PASSWORD,
  
  // Дополнительные настройки:
  idle_timeout: 20,      // Закрывать неиспользуемые соединения через 20s
  max_lifetime: 60 * 30, // Максимальное время жизни соединения (30 минут)
});


export default sql;