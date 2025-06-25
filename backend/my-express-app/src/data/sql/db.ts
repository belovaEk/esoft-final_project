import postgres from 'postgres';


const sql = postgres({
  host: 'localhost',   
  port: 5432,            
  database: 'TeaTime',   
  username: 'postgres', 
  password: 'postgres',
  
  // Дополнительные настройки:
  idle_timeout: 20,      // Закрывать неиспользуемые соединения через 20s
  max_lifetime: 60 * 30, // Максимальное время жизни соединения (30 минут)
});

export default sql;