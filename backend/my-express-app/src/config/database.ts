import 'dotenv/config';

export const configureDatabase = {
  host: process.env.DATABASE_HOST,   
  port: Number(process.env.DATABASE_PORT),            
  database: process.env.DATABASE_NAME,   
  username: process.env.DATABASE_USERNAME, 
  password: process.env.DATABASE_PASSWORD,
  
  // Дополнительные настройки:
  idle_timeout: 20,      // Закрывать неиспользуемые соединения через 20s
  max_lifetime: 60 * 30, // Максимальное время жизни соединения (30 минут)
}