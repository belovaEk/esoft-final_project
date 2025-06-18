import fs from 'fs/promises';
import path from 'path';
import type { TeaType } from '../models/tea.model';

const DB_PATH = path.join(__dirname, '../data', 'db_Tea.json');
let teaProducts: TeaType[] = [];

export async function loadData(): Promise<void> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        teaProducts = JSON.parse(data);
    } catch (err) {
        teaProducts = [];
        await saveData();
        console.error('Ошибка загрузки данных:', err);
    }
}

export async function saveData(): Promise<void> {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(teaProducts, null, 2));
    } catch (err) {
        console.error('Ошибка сохранения данных:', err);
        throw err;
    }
}

export function getTeaProducts(): TeaType[] {
    return teaProducts;
}