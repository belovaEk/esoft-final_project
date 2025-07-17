import postgres from 'postgres';
import { configureDatabase } from '../../config/database';

const sql = postgres(configureDatabase);

export default sql;