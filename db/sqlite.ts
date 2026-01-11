import { Platform } from 'react-native';
let SQLite: any = {};
if (Platform.OS !== 'web') {
  SQLite = require('expo-sqlite');
}

const DB_NAME = 'musika.db';
const db = Platform.OS !== 'web' ? SQLite.openDatabase(DB_NAME) : null;

export function initDb() {
  if (Platform.OS === 'web') return;
  db.transaction(tx => {
    // Categories
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );`
    );
    // Products
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER,
        buying_price REAL NOT NULL,
        selling_price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image_path TEXT,
        date_added TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );`
    );
    // Sales
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        selling_price REAL NOT NULL,
        date TEXT NOT NULL,
        profit REAL NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`
    );
  });
}

export default db;
